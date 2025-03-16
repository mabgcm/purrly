import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logoutUser } from "../../../firebaseService"; // Correct import for logoutUser
import { auth } from "../../../firebase"; // Correct import for logoutUser
import { useNavigate } from "react-router-dom";

const MobileNavMenu = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>{t("home")}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>{t("shop")}</Link>
        </li>
        {/* <li>
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>{t("collection")}</Link>
        </li> */}
        {/* <li>
          <Link to={process.env.PUBLIC_URL + "/blog-standard"}>{t("blog")}</Link>
        </li> */}
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>{t("contact_us")}</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>My Account</Link>
            </li>
            <li>
              <Link to="#" onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to={process.env.PUBLIC_URL + "/login-register"}>Login/Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
