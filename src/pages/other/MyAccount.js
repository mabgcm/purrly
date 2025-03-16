import React, { Fragment, useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getUserInfo, saveUserInfo } from '../../firebaseService';
import { UserContext } from '../../context/UserContext';

const MyAccount = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const accordionRef = useRef(null); // Ref for accordion control
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    fax: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [activeKey, setActiveKey] = useState("0"); // Track the active accordion pane

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (user) {
          const userInfo = await getUserInfo(user.uid);
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [user]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await saveUserInfo(user.uid, userInfo);
        setActiveKey("1"); // Move to the next accordion pane after saving
        accordionRef.current.click(); // Trigger the next accordion pane manually
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  // Define handleAddressContinue for navigating to the cart page
  const handleAddressContinue = () => {
    navigate(process.env.PUBLIC_URL + "/shop-grid-standard");
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="SexyDolls client details"
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>My Account Information</h4>
                            <h5>Your Personal Details</h5>
                          </div>
                          <form onSubmit={handleInfoSubmit}>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input type="text" name="firstName" value={userInfo.firstName} onChange={handleInfoChange} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input type="text" name="lastName" value={userInfo.lastName} onChange={handleInfoChange} />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input type="email" name="email" value={userInfo.email} onChange={handleInfoChange} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input type="text" name="telephone" value={userInfo.telephone} onChange={handleInfoChange} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Fax</label>
                                  <input type="text" name="fax" value={userInfo.fax} onChange={handleInfoChange} />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Address</label>
                                  <input type="text" name="address" value={userInfo.address} onChange={handleInfoChange} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>City</label>
                                  <input type="text" name="city" value={userInfo.city} onChange={handleInfoChange} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>State</label>
                                  <input type="text" name="state" value={userInfo.state} onChange={handleInfoChange} />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Zip Code</label>
                                  <input type="text" name="zipCode" value={userInfo.zipCode} onChange={handleInfoChange} />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" ref={accordionRef}>Save</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Your Shipping Address
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Address Book Entries</h4>
                          </div>
                          <div className="entries-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                <div className="entries-info text-center">
                                  <p>{userInfo.firstName} {userInfo.lastName}</p>
                                  <p>{userInfo.address}</p>
                                  <p>{userInfo.city}</p>
                                  <p>{userInfo.state}</p>
                                  <p>{userInfo.zipCode}</p>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center billing-back-btn">
                                <div className="billing-btn">
                                  <button type="button" onClick={handleAddressContinue}>Continue Shopping</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
