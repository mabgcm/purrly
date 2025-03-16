import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product }) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  console.log("Product props in ProductImageDescription:", product);

  if (!product || !product.images || !Array.isArray(product.images) || product.images.length === 0) {
    return <div>No images available for this product.</div>;
  }

  const wishlistItem = wishlistItems.find(item => item.id === product.id);
  const compareItem = compareItems.find(item => item.id === product.id);

  const discountedPrice = product.discountedPrice ? product.discountedPrice : null;
  const finalProductPrice = product.price ? +(product.price * currency.currencyRate).toFixed(2) : null;
  const finalDiscountedPrice = discountedPrice ? +(discountedPrice * currency.currencyRate).toFixed(2) : null;

  console.log("Final product price:", finalProductPrice);
  console.log("Final discounted price:", finalDiscountedPrice);

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed product={product} />
            ) : (
              <ProductImageGallery product={product} />
            )}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    name: PropTypes.string,
    discountedPrice: PropTypes.number
  }),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
