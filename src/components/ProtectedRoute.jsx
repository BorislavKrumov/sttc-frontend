import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({roles, children }) => {
    const loginReducer = useSelector((state) => state.loginReducer);
  
    if (!loginReducer.loggedIn || !loginReducer.user.roles) {
        console.log("Navigating to login")
        return <Navigate to="/login" />
    }

    if (loginReducer.user.roles.length === 0 || !roles.find(role => role === loginReducer.user.roles[0].roleName)) {
        console.log("Navigating to profile")
        return <Navigate to="/profile" />
    }

    console.log("Auth is ok")
    return children;    
 };

export default ProtectedRoute;
