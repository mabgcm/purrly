import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = ({ setActiveSection, resetEditing }) => {
    const navigate = useNavigate();

    const handleNavigation = (section) => {
        setActiveSection(section);
        resetEditing();
        if (section === 'products') navigate('/products');
        if (section === 'orders') navigate('/orders');
        if (section === 'customers') navigate('/customers');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button onClick={() => handleNavigation('products')} className="nav-link btn btn-link">Products</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => handleNavigation('orders')} className="nav-link btn btn-link">Orders</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => handleNavigation('customers')} className="nav-link btn btn-link">Customers</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
