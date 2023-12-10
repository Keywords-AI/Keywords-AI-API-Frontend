import React, { useEffect } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { getCSRF } from "src/services/getCSRF";
import { connect } from "react-redux";
import NavigationLayout from "src/layouts/NavigationLayout/NavigationLayout";
import PlatformLayout from "src/layouts/PlatformLayout/PlatformLayout";
import { rootPaths, platformPaths } from "src/routes/index";
import { getUser } from "src/store/actions/userAction";
import PaymentSuccess from "src/pages/PaymentSuccess/PaymentSuccess";
import "src/styles/vanilla/base.css";
import "src/styles/dark/base.scss";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  getUser,
};

const blogPages = [
  {
    path: "blog/:slug",
    element: <div>Blog Post</div>,
  },
];

const Routes = ({ getUser }) => {
  const loginLocation = "/login";
  var loggedIn = localStorage.getItem("access_token") ? true : false;
  React.useEffect(() => {
    getCSRF();
    getUser();
  }, []);

  const routes = useRoutes([
    {
      path: "/success",
      element: <PaymentSuccess />,
    },
    {
      path: "/",
      element: <NavigationLayout />,
      children: rootPaths,
    },
    {
      path: "/platform",
      element: <PlatformLayout />,
      children: platformPaths,
    },
  ]);
  return <div data-theme="light">{routes}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
