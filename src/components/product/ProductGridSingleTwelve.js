import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Fragment } from "react";


const ProductGridSingleTwelve = ({ product, currency, cartItem, wishlistItem, compareItem }) => {
    const discountedPrice = product.discount
        ? (product.price - (product.price * product.discount) / 100).toFixed(2)
        : null;
    const finalProductPrice = product.price ? (product.price * currency.currencyRate).toFixed(2) : null;
    const finalDiscountedPrice = product.discountedPrice ? (product.discountedPrice * currency.currencyRate).toFixed(2) : null;
    const discountPercentage = product.discountedPrice ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : null;

    return (
        <div className="product-wrap product-wrap-2">
            <div className="product-img">
                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                    <img className="default-img" src={product.images[0]} alt={product.name} />
                    {product.images.length > 1 ? (
                        <img className="hover-img" src={product.images[1]} alt={product.name} />
                    ) : (
                        ""
                    )}
                </Link>
                {product.discount || product.new ? (
                    <div className="product-img-badges">
                        {product.discount ? <span className="pink">-{product.discount}%</span> : ""}
                        {product.new ? <span className="purple">New</span> : ""}
                    </div>
                ) : (
                    ""
                )}
                {/* <div className="product-action-2">
                    <button title="Add to cart">Add to Cart</button>
                </div> */}
            </div>
            <div
                className="product-content-2"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    textAlign: "center"
                }}
            >
                <h3
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#333",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        margin: "10px 0"
                    }}>
                    <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>{product.name}</Link>
                </h3>
                <div
                    className="product-price"
                    style={{
                        fontSize: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        color: "#333"
                    }}
                >
                    {finalDiscountedPrice ? (
                        <Fragment>
                            <span
                                className="discounted-price"
                                style={{
                                    color: "#e74c3c" // Red color for discounted price
                                }}
                            >
                                {currency.currencySymbol + finalDiscountedPrice}
                            </span>
                            <span
                                className="old-price"
                                style={{
                                    color: "#aaa", // Gray color for old price
                                    textDecoration: "line-through"
                                }}
                            >
                                {currency.currencySymbol + finalProductPrice}
                            </span>
                        </Fragment>
                    ) : (
                        <span>{currency.currencySymbol + finalProductPrice} </span>
                    )}
                </div>
            </div>
        </div>
    );
};

ProductGridSingleTwelve.propTypes = {
    product: PropTypes.object.isRequired,
    currency: PropTypes.object.isRequired,
    cartItem: PropTypes.object,
    wishlistItem: PropTypes.object,
    compareItem: PropTypes.object,
};

export default ProductGridSingleTwelve;
