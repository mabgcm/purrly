import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart, decreaseQuantity, deleteFromCart, deleteAllFromCart } from "../../store/slices/cart-slice";

const Cart = () => {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach(cartItem => {
      const finalProductPrice = parseFloat((cartItem.price * currency.currencyRate).toFixed(2));
      const finalDiscountedPrice = cartItem.discountedPrice != null && cartItem.discountedPrice != 0
        ? parseFloat((cartItem.discountedPrice * currency.currencyRate).toFixed(2))
        : null;

      totalPrice += finalDiscountedPrice != null
        ? finalDiscountedPrice * cartItem.quantity
        : finalProductPrice * cartItem.quantity;
    });
    setCartTotalPrice(totalPrice);
  }, [cartItems, currency.currencyRate]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="invisible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      {!isMobile ? (
                        <table>
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Product Name</th>
                              <th>Unit Price</th>
                              <th>Qty</th>
                              <th>Subtotal</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.map((cartItem, key) => {
                              const finalProductPrice = (cartItem.price * currency.currencyRate).toFixed(2);
                              const finalDiscountedPrice = cartItem.discountedPrice != null && cartItem.discountedPrice != 0
                                ? (cartItem.discountedPrice * currency.currencyRate).toFixed(2)
                                : null;

                              return (
                                <tr key={key}>
                                  <td className="product-thumbnail">
                                    <Link
                                      to={process.env.PUBLIC_URL + "/product/" + cartItem.id}
                                    >
                                      <img
                                        className="img-fluid"
                                        src={cartItem.images && cartItem.images[0] ? cartItem.images[0] : 'placeholder-image-url'}
                                        alt=""
                                      />
                                    </Link>
                                  </td>

                                  <td className="product-name">
                                    <Link
                                      to={process.env.PUBLIC_URL + "/product/" + cartItem.id}
                                    >
                                      {cartItem.name}
                                    </Link>
                                    {cartItem.selectedProductColor &&
                                      cartItem.selectedProductSize ? (
                                      <div className="cart-item-variation">
                                        <span>
                                          Color: {cartItem.selectedProductColor}
                                        </span>
                                        <span>
                                          Size: {cartItem.selectedProductSize}
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </td>

                                  <td className="product-price-cart">
                                    {cartItem.discountedPrice != null && cartItem.discountedPrice != 0 ? (
                                      <div className="price-wrapper">
                                        <span className="amount old">
                                          {currency.currencySymbol + finalProductPrice}
                                        </span>
                                        <span className="amount discounted">
                                          {currency.currencySymbol + finalDiscountedPrice}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="amount">
                                        {currency.currencySymbol + finalProductPrice}
                                      </span>
                                    )}
                                  </td>


                                  <td className="product-quantity">
                                    <div className="cart-plus-minus">
                                      <button
                                        className="dec qtybutton"
                                        onClick={() => dispatch(decreaseQuantity(cartItem))}
                                      >
                                        -
                                      </button>
                                      <input
                                        className="cart-plus-minus-box"
                                        type="text"
                                        value={cartItem.quantity}
                                        readOnly
                                      />
                                      <button
                                        className="inc qtybutton"
                                        onClick={() =>
                                          dispatch(addToCart({
                                            ...cartItem,
                                            quantity: 1
                                          }))
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>

                                  <td className="product-subtotal">
                                    {cartItem.discountedPrice != null && cartItem.discountedPrice != 0
                                      ? currency.currencySymbol +
                                      (finalDiscountedPrice * cartItem.quantity).toFixed(2)
                                      : currency.currencySymbol +
                                      (finalProductPrice * cartItem.quantity).toFixed(2)}
                                  </td>

                                  <td className="product-remove">
                                    <button
                                      onClick={() =>
                                        dispatch(deleteFromCart(cartItem.cartItemId))
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <div className="cart-items-responsive">
                          {cartItems.map((cartItem, key) => {
                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              cartItem.discountedPrice * currency.currencyRate
                            ).toFixed(2);

                            return (
                              <div className="cart-item" key={key}>
                                <div className="product-thumbnail">
                                  <Link
                                    to={process.env.PUBLIC_URL + "/product/" + cartItem.id}
                                  >
                                    <img
                                      className="img-fluid"
                                      src={cartItem.images && cartItem.images[0] ? cartItem.images[0] : 'placeholder-image-url'}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="product-details">
                                  <div className="product-name">
                                    <span className="title">Product Name:</span>
                                    <Link
                                      to={process.env.PUBLIC_URL + "/product/" + cartItem.id}
                                    >
                                      {cartItem.name}
                                    </Link>
                                  </div>
                                  {cartItem.selectedProductColor && cartItem.selectedProductSize && (
                                    <div className="cart-item-variation">
                                      <span>Color: {cartItem.selectedProductColor}</span>
                                      <span>Size: {cartItem.selectedProductSize}</span>
                                    </div>
                                  )}
                                  <div className="product-price">
                                    <span className="title">Unit Price:</span>
                                    {cartItem.discountedPrice != null && cartItem.discountedPrice != 0 ? (
                                      <Fragment>
                                        <div>
                                          <span className="amount old" style={{ marginRight: '2px', textDecoration: 'line-through', color: 'grey' }}>
                                            {currency.currencySymbol + finalProductPrice}
                                          </span>
                                          <span className="amount" style={{ marginLeft: '2px' }}>
                                            {currency.currencySymbol + finalDiscountedPrice}
                                          </span>
                                        </div>

                                      </Fragment>
                                    ) : (
                                      <span className="amount">
                                        {currency.currencySymbol + finalProductPrice}
                                      </span>
                                    )}
                                  </div>

                                  <div className="product-quantity">
                                    <span className="title">Qty:</span>
                                    <div className="cart-plus-minus">
                                      <button
                                        className="dec qtybutton"
                                        onClick={() =>
                                          dispatch(decreaseQuantity(cartItem))
                                        }
                                      >
                                        -
                                      </button>
                                      <input
                                        className="cart-plus-minus-box"
                                        type="text"
                                        value={cartItem.quantity}
                                        readOnly
                                      />
                                      <button
                                        className="inc qtybutton"
                                        onClick={() =>
                                          dispatch(addToCart({
                                            ...cartItem,
                                            quantity: 1
                                          }))
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="product-subtotal">
                                    <span className="title">Subtotal:</span>
                                    {cartItem.discountedPrice != null && cartItem.discountedPrice != 0
                                      ? currency.currencySymbol +
                                      (finalDiscountedPrice * cartItem.quantity).toFixed(2)
                                      : currency.currencySymbol +
                                      (finalProductPrice * cartItem.quantity).toFixed(2)}
                                  </div>
                                  <div className="product-remove">
                                    <span className="title">Action:</span>
                                    <button
                                      onClick={() =>
                                        dispatch(deleteFromCart(cartItem.cartItemId))
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>

                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    {/* <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="col-lg-4 col-md-6">
                    {/* <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div> */}
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
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

export default Cart;
