import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({roles, children }) => {
    const loginReducer = useSelector((state) => state.loginReducer);
  
    if (!loginReducer.loggedIn || !loginReducer.user.roles) {
        return <Navigate to="/login" />
    }

    if (loginReducer.user.roles.length === 0 || !roles.find(role => role === loginReducer.user.roles[0].roleName)) {
        return <Navigate to="/profile" />
    }

    return children;    
 };

export default ProtectedRoute;
