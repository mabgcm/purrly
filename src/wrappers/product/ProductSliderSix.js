import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Swiper, { SwiperSlide } from '../../components/swiper';
import { getProducts } from '../../helpers/product';
import SectionTitle from '../../components/section-title/SectionTitle';
import ProductGridSingleTwelve from '../../components/product/ProductGridSingleTwelve';
import { fetchProducts } from '../../store/slices/product-slice';

const settings = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
};

const ProductSliderSix = ({ spaceBottomClass, spaceTopClass, category }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const prods = getProducts(products, category, null, 6);

  return (
    <div className={clsx('related-product-area', spaceBottomClass, spaceTopClass)}>
      <div className="container">
        <SectionTitle
          titleText="Featured Products"
          subtitleText="Choose Your Favorite Product"
          subtitleColorClass="grey"
          positionClass="text-center"
          spaceClass="mb-55"
          borderClass="no-border"
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : prods.length ? (
          <Swiper options={settings}>
            {prods.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductGridSingleTwelve
                  product={product}
                  currency={currency}
                  cartItem={cartItems.find((cartItem) => cartItem.id === product.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

ProductSliderSix.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductSliderSix;
