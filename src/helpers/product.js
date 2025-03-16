// src/helpers/product.js

// get products
export const getProducts = (products = [], category, type, limit) => {
  // Ensure the products parameter is an array
  if (!Array.isArray(products)) {
    console.log('Products is not an array:', products);
    return [];
  }

  // Filter products based on the specified category
  const filteredProducts = products.filter(product => {
    return category ? product.category.includes(category) : true;
  });



  // Limit the number of products returned
  const limitedProducts = filteredProducts.slice(0, limit ? limit : filteredProducts.length);

  // Return the final list of filtered and limited products
  return limitedProducts;
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product) => {
  let productInCart = cartItems.find(single => single.id === product.id);
  return productInCart ? productInCart.quantity : 0;
};

// updated cartItemStock function to handle undefined or null values
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    const variation = item.variation && item.variation.find(single => single.color === color);
    if (variation) {
      const sizeVariation = variation.size && variation.size.find(single => single.name === size);
      return sizeVariation ? sizeVariation.stock : 0;
    }
    return 0;
  }
};

// get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        product => product.category && product.category.includes(sortValue)
      );
    }
    if (sortType === "tag") {
      return products.filter(
        product => product.tag && product.tag.includes(sortValue)
      );
    }
    if (sortType === "color") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.some(single => single.color === sortValue)
      );
    }
    if (sortType === "size") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.some(single =>
            single.size && single.size.some(size => size.name === sortValue)
          )
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => b.price - a.price);
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => a.price - b.price);
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = array => {
  return array.filter((v, i, self) => self.indexOf(v) === i);
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.forEach((product) => {
      if (product.category && Array.isArray(product.category)) {
        product.category.forEach((single) => {
          productCategories.push(single);
        });
      } else if (product.category && typeof product.category === 'string') {
        productCategories.push(product.category);
      }
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = products => {
  let productTags = [];
  products &&
    products.forEach(product => {
      product.tag &&
        product.tag.forEach(single => {
          productTags.push(single);
        });
    });
  return getIndividualItemArray(productTags);
};

// get individual colors
export const getIndividualColors = products => {
  let productColors = [];
  products &&
    products.forEach(product => {
      product.variation &&
        product.variation.forEach(single => {
          productColors.push(single.color);
        });
    });
  return getIndividualItemArray(productColors);
};

// get individual sizes
export const getProductsIndividualSizes = products => {
  let productSizes = [];
  products &&
    products.forEach(product => {
      product.variation &&
        product.variation.forEach(single => {
          single.size.forEach(size => {
            productSizes.push(size.name);
          });
        });
    });
  return getIndividualItemArray(productSizes);
};

// get product individual sizes
export const getIndividualSizes = product => {
  let productSizes = [];
  product.variation &&
    product.variation.forEach(singleVariation => {
      singleVariation.size &&
        singleVariation.size.forEach(singleSize => {
          productSizes.push(singleSize.name);
        });
    });
  return getIndividualItemArray(productSizes);
};

export const setActiveSort = e => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
