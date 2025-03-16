import { Fragment, useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { stripePromise } from '../../stripe';
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getUserInfo, saveUserDetails } from "../../firebaseService";
import { db } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";


const Checkout = () => {
  const [userDetails, setUserDetails] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    telephone: '',
    country: ''
  });

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      console.error("No user found. Redirecting to login page.");
      navigate("/login-register"); // Redirect to login if no user is found
      return;
    }

    const fetchUserDetails = async () => {
      const userInfo = await getUserInfo(user.uid);
      console.log("Fetched User Info:", userInfo);
      setUserDetails(userInfo);
      setFormData({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        address: userInfo.address || '',
        city: userInfo.city || '',
        state: userInfo.state || '',
        zipCode: userInfo.zipCode || '',
        telephone: userInfo.telephone || '',
        country: userInfo.country || ''
      });
    };
    fetchUserDetails();
  }, [user, navigate]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No user found. Cannot place order.");
      return;
    }

    if (!userDetails.address) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.telephone || !formData.country) {
        alert("Please fill in all required fields.");
        return;
      }
      try {
        await saveUserDetails(user.uid, formData);
        setUser({ ...user, ...formData });
        setUserDetails(formData);
      } catch (error) {
        console.error("Error saving user details:", error);
        return;
      }
    }

    try {
      const cartTotalPrice = cartItems.reduce((total, cartItem) => {
        const discountedPrice = cartItem.discountedPrice ? parseFloat(cartItem.discountedPrice) : null;
        const finalPrice = discountedPrice !== null ? discountedPrice : parseFloat(cartItem.price);
        return total + finalPrice * cartItem.quantity;
      }, 0);

      const order = {
        userId: user.uid,
        items: cartItems,
        total: cartTotalPrice,
        createdAt: new Date(),
      };
      await addDoc(collection(db, "orders"), order);

      const session = await axios.post('https://us-central1-dollstore-7ccb0.cloudfunctions.net/createStripeCheckoutSession', {
        items: await Promise.all(cartItems.map(async item => {
          const price = item.discountedPrice ? parseFloat(item.discountedPrice) : parseFloat(item.price);
          const imageRef = ref(storage, item.images[0]);  // Assume images[0] holds the path to the image
          const imageUrl = await getDownloadURL(imageRef);
          console.log('Item Image URL:', imageUrl);  // Log the image URL to ensure it is correct
          return {
            name: item.name,
            quantity: item.quantity,
            price: Number(price).toFixed(2),
            imageUrl: imageUrl  // Include image URL here
          };
        })),
        customerEmail: userDetails.email,
      });

      console.log('Stripe Session:', session);

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.data.id });
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let cartTotalPrice = 0;

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="invisible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Shipping Details</h3>
                    <form>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Company Name</label>
                            <input type="text" name="company" value={formData.company} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-select mb-20">
                            <label>Country</label>
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Street Address</label>
                            <input className="billing-address" placeholder="House number and street name" type="text" name="address" value={formData.address} onChange={handleChange} required />
                            <input placeholder="Apartment, suite, unit etc." type="text" name="apartment" value={formData.apartment} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Town / City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>State / County</label>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Postcode / ZIP</label>
                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Phone</label>
                            <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = cartItem.discountedPrice ? parseFloat(cartItem.discountedPrice) : null;
                              const finalProductPrice = (parseFloat(cartItem.price) * currency.currencyRate).toFixed(2);
                              const finalDiscountedPrice = discountedPrice ? (discountedPrice * currency.currencyRate).toFixed(2) : null;

                              const productSubtotal = discountedPrice !== null ? (discountedPrice * cartItem.quantity) : (parseFloat(cartItem.price) * cartItem.quantity);
                              cartTotalPrice += productSubtotal;

                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                      (finalDiscountedPrice * cartItem.quantity).toFixed(2)
                                      : currency.currencySymbol +
                                      (finalProductPrice * cartItem.quantity).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
