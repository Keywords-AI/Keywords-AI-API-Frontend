import React, { useEffect } from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { NavigationLayout } from "src/layouts/NavigationLayout/NavigationLayout";
import { getUser } from "src/store/actions/userAction";
import "src/styles/index.css";
import { Playground } from "./pages/PlatformPages";
import { NotFound } from "src/pages/AuthPages/NotFound/NotFound";
import LogIn from "src/pages/AuthPages/LogIn/LogIn";
import { SignUp } from "src/pages/AuthPages/SignUp/SignUp";
import { FullScreenLayout } from "./layouts/FullScreenLayout";
import { Unauthenticated } from "./pages/AuthPages/Unauthenticated";
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  getUser,
};

const Routes = ({ getUser, user }) => {
  useEffect(() => {
    getUser();
  }, []);

  const isUserLoggedIn = user && user.email?.length > 0;

  const routes = [
    {
      path: "/platform",
      element: isUserLoggedIn ? <NavigationLayout /> : <Navigate to="/login" />,
      children: [{ path: "playground", element: <Playground /> }],
    },
    {
      path: "/",
      element: !isUserLoggedIn ? (
        <FullScreenLayout />
      ) : (
        <Navigate to="/platform/playground" />
      ),
      children: [
        { path: "login", element: <LogIn /> },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "unauthenticated",
          element: <Unauthenticated />,
        },
        { path: "/", element: <Navigate to="/unauthenticated" /> },
      ],
    },
    {
      path: "*",
      element: <FullScreenLayout />,
      children: [{ path: "*", element: <NotFound /> }],
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
