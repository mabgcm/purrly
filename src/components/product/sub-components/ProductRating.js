
import React from "react";
import PropTypes from "prop-types";

const ProductRating = ({ ratingValue }) => {
  const fullStars = Math.floor(ratingValue);
  const halfStar = ratingValue % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="rating" style={{ fontSize: 20 }}>
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="fa fa-star" style={{ marginRight: 5 }} />
      ))}
      {halfStar && <i className="fa fa-star-half-o" />}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="fa fa-star-o" style={{ marginRight: 5 }} />
      ))}
    </div>
  );
};

ProductRating.propTypes = {
  ratingValue: PropTypes.number.isRequired
};

export default ProductRating;
