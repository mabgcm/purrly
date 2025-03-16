import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const ProductGridSingleTwo = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
  colorClass,
  titlePriceClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const defaultImage = "https://your-app.appspot.com/path/to/default/image.jpg"; // Path to a default fallback image

  if (!product) {
    return null;
  }

  const finalProductPrice = product.price ? (product.price * currency.currencyRate).toFixed(2) : null;
  const finalDiscountedPrice = product.discountedPrice ? (product.discountedPrice * currency.currencyRate).toFixed(2) : null;
  const discountPercentage = product.discountedPrice ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : null;

  // Calculate the average rating
  const totalRatings = product.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
  const averageRating = totalRatings > 0 ? totalRatings / product.reviews.length : 0;

  return (
    <Fragment>
      <div className={clsx("product-wrap-2", spaceBottomClass, colorClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
            {product.images && product.images.length > 0 ? (
              <img
                className="default-img"
                src={product.images[0]}
                alt={product.name}
                onError={(e) => { e.target.src = defaultImage; }} // Fallback to default image on error
              />
            ) : (
              <img
                className="default-img"
                src={product.images[0]}
                alt={product.name}
              />
            )}
            {product.images && product.images.length > 1 && (
              <img
                className="hover-img"
                src={product.images[1]}
                alt={product.name}
                onError={(e) => { e.target.src = defaultImage; }} // Fallback to default image on error
              />
            )}
          </Link>
          {(discountPercentage || product.new) && (
            <div className="product-img-badges">
              {discountPercentage && <span className="pink" style={{ backgroundColor: "#fff", color: "#fa6bff", border: "1px solid #fa6bff" }}>-{discountPercentage}%</span>}
              {product.new && <span className="purple">New</span>}
            </div>
          )}

          <div className="product-action-2">
            {product.affiliateLink ? (
              <a
                href={product.affiliateLink}
                rel="noopener noreferrer"
                target="_blank"
                title="Buy now"
              >
                <i className="fa fa-shopping-cart"></i>
              </a>
            ) : product.variation && product.variation.length >= 1 ? (
              <Link
                to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                title="Select options"
              >
                <i className="fa fa-cog"></i>
              </Link>
            ) : product.stockStatus && product.stockStatus > 0 ? (
              // <button
              //   onClick={() => dispatch(addToCart(product))}
              //   className={
              //     cartItem !== undefined && cartItem.quantity > 0
              //       ? "active"
              //       : ""
              //   }
              //   disabled={cartItem !== undefined && cartItem.quantity > 0}
              //   title={
              //     cartItem !== undefined ? "Added to cart" : "Add to cart"
              //   }
              // >
              //   <i className="fa fa-shopping-cart"></i>
              // </button>
              null
            ) : (
              // <button disabled className="active" title="Out of stock">
              //   <i className="fa fa-shopping-cart"></i>
              // </button>
              null
            )}

            {/* <button onClick={() => setModalShow(true)} title="Quick View">
              <i className="fa fa-eye"></i>
            </button> */}

            {/* <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="fa fa-retweet"></i>
            </button> */}
          </div>
        </div>
        <div className="product-content-2">
          <div
            className={`title-price-wrap-2 ${titlePriceClass ? titlePriceClass : ""
              }`}
          >
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product.name}
              </Link>
            </h3>
            <div className="price-2">
              {finalDiscountedPrice ? (
                <Fragment>
                  <span>
                    {currency.currencySymbol + finalDiscountedPrice}
                  </span>
                  <span className="old">
                    {currency.currencySymbol + finalProductPrice}
                  </span>
                </Fragment>
              ) : (
                <span>{currency.currencySymbol + finalProductPrice} </span>
              )}
            </div>
          </div>
          {/* <div className="pro-wishlist-2">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="fa fa-heart-o" />
            </button>
          </div> */}
        </div>
      </div>
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={finalDiscountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        // wishlistItem={wishlistItem}
        // compareItem={compareItem}
        averageRating={averageRating}
      />
    </Fragment>
  );
};

ProductGridSingleTwo.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({
    currencyRate: PropTypes.number,
    currencySymbol: PropTypes.string,
  }).isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    discountedPrice: PropTypes.number, // Ensure this is part of the product shape
    discount: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    affiliateLink: PropTypes.string,
    variation: PropTypes.arrayOf(PropTypes.string),
    stockStatus: PropTypes.number,
  }),
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
};

export default ProductGridSingleTwo;
