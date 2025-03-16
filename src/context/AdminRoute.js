import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const AdminRoute = ({ children }) => {
    const { user, userInfo } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login-register" />;
    }

    if (userInfo && userInfo.isAdmin) {
        return children;
    }

    return <Navigate to="/login-register" />;
};

export default AdminRoute;
