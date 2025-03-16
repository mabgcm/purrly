import { Suspense, lazy, useEffect, useState, useContext } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { UserProvider, UserContext } from './context/UserContext';
import AdminRoute from "../src/context/AdminRoute";

// Home pages
const HomeValentinesDay = lazy(() => import("./pages/home/HomeValentinesDay"));
const ProductManager = lazy(() => import("./admin/ProductManager"));
const Welcome = lazy(() => import("./admin/Welcome"));  // Import the Welcome component
const Sidebar = lazy(() => import("./admin/Sidebar"));  // Correct path for Sidebar

// Shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() => import("./pages/shop/ShopGridRightSidebar"));
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// Product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() => import("./pages/shop-product/ProductTabLeft"));
const ProductTabRight = lazy(() => import("./pages/shop-product/ProductTabRight"));
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() => import("./pages/shop-product/ProductFixedImage"));

// Blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() => import("./pages/blog/BlogDetailsStandard"));

// Other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const SearchResult = lazy(() => import("./pages/other/SearchResult"));

const RefundPolicy = lazy(() => import("./pages/other/RefundPolicy"));
const BuyingProcess = lazy(() => import("./pages/other/BuyingProcess"));
const Shipping = lazy(() => import("./pages/other/Shipping"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const AdminLayout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('');
  const resetEditing = () => { };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveSection={setActiveSection} resetEditing={resetEditing} />
      <div className="container-fluid">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop>
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Analytics />
            <Routes>
              <Route path={process.env.PUBLIC_URL + "/"} element={<HomeValentinesDay />} />
              <Route path={process.env.PUBLIC_URL + "/dash"} element={<AdminRoute><AdminLayout><Welcome /></AdminLayout></AdminRoute>} />
              <Route path={process.env.PUBLIC_URL + "/products"} element={<AdminRoute><AdminLayout><ProductManager /></AdminLayout></AdminRoute>} />
              <Route path={process.env.PUBLIC_URL + "/orders"} element={<AdminRoute><AdminLayout><ProductManager /></AdminLayout></AdminRoute>} />  {/* Add this line */}
              <Route path={process.env.PUBLIC_URL + "/customers"} element={<AdminRoute><AdminLayout><ProductManager /></AdminLayout></AdminRoute>} /> {/* Add this line */}

              {/* Shop pages */}
              <Route path={process.env.PUBLIC_URL + "/shop-grid-standard"} element={<ShopGridStandard />} />
              <Route path={process.env.PUBLIC_URL + "/shop-grid-filter"} element={<ShopGridFilter />} />
              <Route path={process.env.PUBLIC_URL + "/shop-grid-two-column"} element={<ShopGridTwoColumn />} />
              <Route path={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"} element={<ShopGridNoSidebar />} />
              <Route path={process.env.PUBLIC_URL + "/shop-grid-full-width"} element={<ShopGridFullWidth />} />
              <Route path={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"} element={<ShopGridRightSidebar />} />
              <Route path={process.env.PUBLIC_URL + "/shop-list-standard"} element={<ShopListStandard />} />
              <Route path={process.env.PUBLIC_URL + "/shop-list-full-width"} element={<ShopListFullWidth />} />
              <Route path={process.env.PUBLIC_URL + "/shop-list-two-column"} element={<ShopListTwoColumn />} />

              {/* Shop product pages */}
              <Route path={process.env.PUBLIC_URL + "/product/:id"} element={<Product />} />
              <Route path={process.env.PUBLIC_URL + "/product-tab-left/:id"} element={<ProductTabLeft />} />
              <Route path={process.env.PUBLIC_URL + "/product-tab-right/:id"} element={<ProductTabRight />} />
              <Route path={process.env.PUBLIC_URL + "/product-sticky/:id"} element={<ProductSticky />} />
              <Route path={process.env.PUBLIC_URL + "/product-slider/:id"} element={<ProductSlider />} />
              <Route path={process.env.PUBLIC_URL + "/product-fixed-image/:id"} element={<ProductFixedImage />} />

              {/* Blog pages */}
              <Route path={process.env.PUBLIC_URL + "/blog-standard"} element={<BlogStandard />} />
              <Route path={process.env.PUBLIC_URL + "/blog-no-sidebar"} element={<BlogNoSidebar />} />
              <Route path={process.env.PUBLIC_URL + "/blog-right-sidebar"} element={<BlogRightSidebar />} />
              <Route path={process.env.PUBLIC_URL + "/blog-details-standard"} element={<BlogDetailsStandard />} />

              {/* Other pages */}
              <Route path={process.env.PUBLIC_URL + "/about"} element={<About />} />
              <Route path={process.env.PUBLIC_URL + "/contact"} element={<Contact />} />
              <Route path={process.env.PUBLIC_URL + "/my-account"} element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
              <Route path={process.env.PUBLIC_URL + "/login-register"} element={<LoginRegister />} />

              <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />
              <Route path={process.env.PUBLIC_URL + "/wishlist"} element={<Wishlist />} />
              <Route path={process.env.PUBLIC_URL + "/compare"} element={<Compare />} />
              <Route path={process.env.PUBLIC_URL + "/checkout"} element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path={process.env.PUBLIC_URL + "/search"} element={<SearchResult />} />
              <Route path={process.env.PUBLIC_URL + "/refund"} element={<RefundPolicy />} />
              <Route path={process.env.PUBLIC_URL + "/buying"} element={<BuyingProcess />} />
              <Route path={process.env.PUBLIC_URL + "/shipping"} element={<Shipping />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
    </UserProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login-register" />;
};

export default App;
