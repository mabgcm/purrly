import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";

const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;

  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item) => {
              const discountedPrice = item.discountedPrice;
              const finalProductPrice = (item.price * currency.currencyRate).toFixed(2);
              const finalDiscountedPrice = discountedPrice != null && discountedPrice != 0
                ? (discountedPrice * currency.currencyRate).toFixed(2)
                : null;

              cartTotalPrice += finalDiscountedPrice != null
                ? finalDiscountedPrice * item.quantity
                : finalProductPrice * item.quantity;

              return (
                <li className="single-shopping-cart" key={item.cartItemId}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                      {item.images && Array.isArray(item.images) && item.images[0] ? (
                        <img
                          alt={item.name}
                          src={item.images[0]}
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          alt="No image available"
                          src={process.env.PUBLIC_URL + "/placeholder.jpg"}
                          className="img-fluid"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                        {item.name}
                      </Link>
                    </h4>
                    <h6>Qty: {item.quantity}</h6>
                    <div className="product-price-cart">
                      {finalDiscountedPrice != null ? (
                        <Fragment>
                          <span className="amount old" style={{ color: 'grey', textDecoration: 'line-through', paddingRight: 5 }}>
                            {currency.currencySymbol + finalProductPrice}
                          </span>
                          <span className="amount">
                            {currency.currencySymbol + finalDiscountedPrice}
                          </span>
                        </Fragment>
                      ) : (
                        <span className="amount">
                          {currency.currencySymbol + finalProductPrice}
                        </span>
                      )}
                    </div>
                    <div className="cart-item-variation">
                      {item.selectedOptions && Object.keys(item.selectedOptions).map((key) => (
                        <div key={key}>
                          <span>{key.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}: {item.selectedOptions[key]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => dispatch(deleteFromCart(item.cartItemId))}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;

