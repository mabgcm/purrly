import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductRating from "../../components/product/sub-components/ProductRating";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReviewToProduct } from "../../store/slices/product-slice";
import { updateProductReviews } from "../../firebaseService";

const ProductDescriptionTab = ({ spaceBottomClass, product }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Current user state in ProductDescriptionTab:", user);
  }, [user]);

  if (!product) {
    return null;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.isLoggedIn) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const userName = `${user.firstName} ${user.lastName.charAt(0)}.`;
    const newReview = {
      user: userName,
      comment: review,
      rating: rating,
    };
    console.log("New review to submit:", newReview);
    dispatch(addReviewToProduct({ productId: product.id, review: newReview }));
    await updateProductReviews(product.id, newReview);

    setReview("");
    setRating(5);
  };

  const hasUserReviewed = product.reviews
    ? product.reviews.some(
      (review) => review.user === `${user.firstName} ${user.lastName.charAt(0)}.`
    )
    : false;

  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Technical Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Reviews ({product.reviews ? product.reviews.length : 0})
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <h2>Product Description</h2>
                  {/* <div className='p-1'>
                    <h3>Body Measurement</h3>
                    <img src="../../assets/img/product/bodytype.jpeg" className="w-100 pb-4" alt="body measurement" />
                    <img src="../../assets/img/product/skeleton.jpeg" className="w-100" alt="body structure" />
                  </div>
                  <div className='p-1'>
                    <h3>Body Features</h3>
                    <img src="../../assets/img/product/craftmanship.jpeg" className="w-100 pb-2" alt="body craftmanship" />
                    <img src="../../assets/img/product/texture.jpeg" className="w-100" alt="body texture" />
                  </div>
                </div>
                <div> */}
                  <div className="mt-4">
                    <h3>🌿 Soft, Safe & Hypoallergenic</h3>
                    <p>
                      Made from organic, breathable cotton yarn, this newborn set is gentle on sensitive skin, free from harsh chemicals, and ideal for year-round comfort.
                    </p>
                  </div>
                  <div className="mt-3">
                    <h3>📦 Shipping & Delivery</h3>
                    <p>
                      Our products are carefully handmade and shipped directly from our trusted production partner in Turkey. All orders dispatch within 2-5 business days via UPS Express for fast, safe, and trackable delivery.
                    </p>
                  </div>
                  <div className="mt-3">
                    <h3>Estimated Delivery Times:</h3>
                    <p>
                      🇺🇸 United States: 2-4 business days
                      🇨🇦 Canada: 2-4 business days
                      🇪🇺 Europe: 1-3 business days
                      🇦🇺 Australia & New Zealand: 3-6 business days
                      🌎 Rest of the World: 3-7 business days
                    </p>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {product.description}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                          <div className="single-review" key={index}>
                            <div className="review-img">
                              {/* Add image if needed */}
                            </div>
                            <div className="review-content">
                              <div className="review-top-wrap">
                                <div className="review-left">
                                  <div className="review-name">
                                    <h4>{review.user}</h4>
                                  </div>
                                  <div className="review-rating">
                                    <ProductRating ratingValue={review.rating} />
                                  </div>
                                </div>
                              </div>
                              <div className="review-bottom">
                                <p>{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      {user && user.isLoggedIn && !hasUserReviewed ? (
                        <div className="ratting-form">
                          <form onSubmit={handleReviewSubmit}>
                            <div className="star-box">
                              <span>Your rating:</span>
                              <div className="ratting-star">
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`fa fa-star${i < rating ? "" : "-o"}`}
                                    onClick={() => setRating(i + 1)}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="rating-form-style mb-10">
                                  <input
                                    placeholder="Name"
                                    type="text"
                                    value={user ? `${user.firstName} ${user.lastName.charAt(0)}.` : ""}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="rating-form-style mb-10">
                                  <input
                                    placeholder="Email"
                                    type="email"
                                    value={user ? user.email : ""}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="rating-form-style form-submit">
                                  <textarea
                                    name="Your Review"
                                    placeholder="Message"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                  />
                                  <button type="submit" className="btn btn-warning w-100">Submit</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      ) : user && user.isLoggedIn ? (
                        <p>You have already reviewed this product.</p>
                      ) : (
                        <p>You must buy this product to submit a review.</p>
                      )}
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div >
  );
};

ProductDescriptionTab.propTypes = {
  spaceBottomClass: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string,
        comment: PropTypes.string,
        rating: PropTypes.number,
      })
    ),
  }),
};

export default ProductDescriptionTab;
