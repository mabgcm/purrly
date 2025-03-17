import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import BannerThirtyEight from "../../wrappers/banner/BannerThirtyEight";
import TabProductTwentyTwo from "../../wrappers/product/TabProductTwentyTwo";
import CountDownEight from "../../wrappers/countdown/CountDownEight";
import ProductSliderSix from "../../wrappers/product/ProductSliderSix";
import BrandLogoSliderFive from "../../wrappers/brand-logo/BrandLogoSliderFive";
import BannerThirtySeven from "../../wrappers/banner/BannerThirtySeven";
import HeroSliderThirtySix from "../../wrappers/hero-slider/HeroSliderThirtySix";



const HomeValentinesDay = () => {

  // useLogUser();

  return (
    <Fragment>
      <SEO
        titleTemplate="Organic Newborn Baby Products | Eco-Friendly Essentials"
        description="Discover our collection of organic newborn baby products, crafted with love for your little one’s sensitive skin. Shop sustainable, eco-friendly essentials designed to nurture and protect, naturally. Perfect for a healthy, happy start!"
      />
      <LayoutOne headerTop="invisible">
        {/* hero slider */}
        <HeroSliderThirtySix />
        {/* banner */}
        {/* <BannerThirtyEight spaceBottomClass="pb-70" spaceTopClass="pt-100" /> */}
        {/* tab product */}
        <TabProductTwentyTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" category="fashion" />
        {/* deal counter */}
        <CountDownEight
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          dateTime="December 25, 2024 12:12:00"
          backgroundImage="/assets/img/bg/deal-bg.jpg"
        />
        {/* product slider */}
        <ProductSliderSix
          category="new"
          spaceBottomClass="pb-1000"
          spaceTopClass="pt-100"
        />

        {/* banner */}
        {/* <BannerThirtySeven spaceBottomClass="pb-85" /> */}
        {/* brand logo */}
        {/* <BrandLogoSliderFive
          spaceBottomClass="pb-100"
          spaceTopClass="pt-100" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeValentinesDay;
