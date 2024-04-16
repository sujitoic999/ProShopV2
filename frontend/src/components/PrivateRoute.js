import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;

// The useNavigate hook returns a function that
// lets you navigate programmatically, for
// example after a form is submitted. If using replace: true,
// the navigation will replace the current entry in the history
// stack instead of adding a new one.
