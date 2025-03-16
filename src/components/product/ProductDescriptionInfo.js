import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { getProductCartQuantity } from "../../helpers/product";
import ProductRating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { getOptionImageUrls, initializeSelectedOptions } from "../../admin/optionsConfig";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";

Modal.setAppElement("#root");

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  averageRating,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [quantityCount, setQuantityCount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState(initializeSelectedOptions);
  const [productOptions, setProductOptions] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const productCartQty = getProductCartQuantity(cartItems, product);

  useEffect(() => {
    console.log("Product props in ProductDescriptionInfo:", product);
    console.log("Discounted price:", discountedPrice);
    console.log("Final discounted price:", finalDiscountedPrice);
  }, [product, discountedPrice, finalDiscountedPrice]);

  useEffect(() => {
    const fetchOptions = async () => {
      const optionsWithUrls = await getOptionImageUrls();
      setProductOptions(optionsWithUrls);
    };
    fetchOptions();
  }, []);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [optionName]: value
    }));
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage("");
  };

  const createOrder = async () => {
    if (!user) {
      console.error("User not logged in. Redirecting to login.");
      navigate("/login-register");
      return;
    }

    const order = {
      productId: product.id,
      productName: product.name,
      selectedOptions,
      quantity: quantityCount,
      price: discountedPrice !== null ? finalDiscountedPrice : finalProductPrice,
      currency: currency.currencySymbol,
      orderDate: new Date().toISOString(),
      user: {
        id: user.uid,
        email: user.email
      },
      shipmentStatus: "Pending" // Initial shipment status
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Order ID:", docRef.id);
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )}
      </div>
      <div className="product-details-rating" style={{ color: '#ffa900' }}>
        <ProductRating ratingValue={averageRating} />
      </div>
      <div className="pro-details-list">
        <p>{product.description}</p>
      </div>

      <div className="pro-details-options">
        {Object.keys(productOptions).map(optionName => (
          <div className="pro-details-option" key={optionName}>
            <span>{productOptions[optionName].label}:</span>
            <div className="pro-details-option-content">
              {productOptions[optionName].choices && productOptions[optionName].choices.map(choice => (
                <label
                  key={choice.value}
                  className={`pro-details-option-choice ${selectedOptions[optionName] === choice.value ? 'selected' : ''}`}
                  onClick={() => handleOptionChange(optionName, choice.value)}
                >
                  <img
                    src={choice.image}
                    alt={choice.label}
                    className="option-image"
                    onClick={() => handleImageClick(choice.image)}
                  />
                  <span>{choice.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
            }
            className="dec qtybutton"
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() =>
              setQuantityCount(quantityCount + 1)
            }
            className="inc qtybutton"
          >
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
          <button
            onClick={() => {
              createOrder();
              dispatch(addToCart({
                ...product,
                quantity: quantityCount,
                selectedOptions
              }));
            }}
          >
            {" "}
            Add To Cart{" "}
          </button>
        </div>
        <div className="pro-details-wishlist">

        </div>
        <div className="pro-details-compare">

        </div>
      </div>

      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {Array.isArray(product.category)
              ? product.category.map((single, key) => (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              ))
              : (
                <li>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {product.category}
                  </Link>
                </li>
              )}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => (
              <li key={key}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {single}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//instagram.com">
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="image-modal"
        overlayClassName="image-modal-overlay"
      >
        <button onClick={closeModal} className="close-modal-button"></button>
        <img src={modalImage} alt="Full Size" className="full-size-image" />
      </Modal>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    discountedPrice: PropTypes.number,
    description: PropTypes.string,
    stock: PropTypes.number,
    category: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    tag: PropTypes.arrayOf(PropTypes.string)
  }),
  wishlistItem: PropTypes.shape({})
};

export default ProductDescriptionInfo;
