import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { registerUser, loginUser, logoutUser, resetPassword } from '../../firebaseService';
import { UserContext } from '../../context/UserContext';

const LoginRegister = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/my-account');
    }
  }, [user, navigate]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(loginData.email, loginData.password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage
      navigate('/my-account'); // Navigate to the my account page
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please check your email and password.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(registerData.email, registerData.password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage
      navigate('/my-account');
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      setMessage('Password reset email sent. Please check your email.');
    } catch (error) {
      setMessage('Failed to send password reset email. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("user"); // Remove user data from localStorage
      navigate('/login-register');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Purrly Baby Login"
        description="Log In Purrly Baby to shop online."
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Login Register", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  {user ? (
                    <div className="logout-container">
                      <button onClick={handleLogout} className="logout-button">
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      {isResettingPassword ? (
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleResetPasswordSubmit}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={resetEmail}
                                onChange={handleResetEmailChange}
                                required
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Reset Password</span>
                                </button>
                              </div>
                              <div className="text-center">
                                <Link to="#" onClick={() => setIsResettingPassword(false)}>Back to Login</Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <Tab.Container defaultActiveKey="login">
                          <Nav variant="pills" className="login-register-tab-list">
                            <Nav.Item>
                              <Nav.Link eventKey="login">
                                <h4>Login</h4>
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="register">
                                <h4>Register</h4>
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Tab.Content>
                            <Tab.Pane eventKey="login">
                              <div className="login-form-container">
                                <div className="login-register-form">
                                  <form onSubmit={handleLoginSubmit}>
                                    <input
                                      type="email"
                                      name="email"
                                      placeholder="Email"
                                      value={loginData.email}
                                      onChange={handleLoginChange}
                                      required
                                    />
                                    <input
                                      type="password"
                                      name="password"
                                      placeholder="Password"
                                      value={loginData.password}
                                      onChange={handleLoginChange}
                                      required
                                    />
                                    <div className="button-box">
                                      <div className="login-toggle-btn">
                                        <input type="checkbox" />
                                        <label className="ml-10">Remember me</label>
                                        <Link to="#" onClick={() => setIsResettingPassword(true)}>Forgot Password?</Link>
                                      </div>
                                      <button type="submit">
                                        <span>Login</span>
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="register">
                              <div className="login-form-container">
                                <div className="login-register-form">
                                  <form onSubmit={handleRegisterSubmit}>
                                    <input
                                      type="email"
                                      name="email"
                                      placeholder="Email"
                                      value={registerData.email}
                                      onChange={handleRegisterChange}
                                      required
                                    />
                                    <input
                                      type="password"
                                      name="password"
                                      placeholder="Password"
                                      value={registerData.password}
                                      onChange={handleRegisterChange}
                                      required
                                    />
                                    <div className="button-box">
                                      <button type="submit">
                                        <span>Register</span>
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      )}
                    </>
                  )}
                  {message && <p className="message">{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
