import React, { Fragment, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path as necessary
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useDispatch, useSelector } from "react-redux";
import { addReviewToProduct } from "../../store/slices/product-slice"; // Ensure this import is correct
import { updateProductReviews } from "../../firebaseService"; // Ensure this import is correct
import ProductSliderSix from "../../wrappers/product/ProductSliderSix";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${id}`);
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() };
          console.log("Fetched product data:", productData);
          // Ensure category is always an array
          if (productData.category && !Array.isArray(productData.category)) {
            productData.category = [productData.category];
          }
          setProduct(productData);
        } else {
          console.error("No such product!");
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (products.length > 0) {
      const updatedProduct = products.find((p) => p.id === id);
      if (updatedProduct) {
        setProduct(updatedProduct);
      }
    }
  }, [products, id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      user: "Current User", // Replace with actual user
      comment: review,
      rating: rating,
    };
    // Dispatch action to add review to the product in the state
    dispatch(addReviewToProduct({ productId: id, review: newReview }));
    // Update product reviews in the backend
    await updateProductReviews(id, newReview);

    // Clear the form
    setReview("");
    setRating(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log("Product to be rendered:", product);

  // Calculate the average rating
  const totalRatings = product.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
  const averageRating = totalRatings > 0 ? totalRatings / product.reviews.length : 0;

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="invisible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        {/* product description with image */}
        {product.images && product.images.length > 0 ? (
          <ProductImageDescription
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            product={product}
            averageRating={averageRating} // Pass the average rating here
          />
        ) : (
          <div>No images available for this product.</div>
        )}

        {/* product description tab */}
        {product.description ? (
          <ProductDescriptionTab
            spaceBottomClass="pb-90"
            product={product} // Pass the product object here
          />
        ) : (
          <div>No description available for this product.</div>
        )}

        {/* related product slider */}
        {/* <ProductSliderSix
          category="fashion"
          spaceBottomClass="pb-100"
          spaceTopClass="pt-100"
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
