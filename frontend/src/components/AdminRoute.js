import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  //Just An Experiment
  // const {pathname} = useLocation();
  // console.log('private route ',pathname);
  //<Navigate to={pathname ? `/login?redirect=${pathname}` : "/login"} />
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default AdminRoute;

// The useNavigate hook returns a function that
// lets you navigate programmatically, for
// example after a form is submitted. If using replace: true,
// the navigation will replace the current entry in the history
// stack instead of adding a new one.
