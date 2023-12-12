import React, { useEffect } from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { NavigationLayout } from "src/layouts/NavigationLayout/NavigationLayout";
import { getUser } from "src/store/actions/userAction";
import "src/styles/index.css";
import { Playground } from "./pages/PlatformPages";
import Chatbot from "/src/pages/PlatformPages/Chatbot/Chatbot";
import { NotFound } from "src/pages/AuthPages/NotFound/NotFound";
import LogIn from "src/pages/AuthPages/LogIn/LogIn";
import { SignUp } from "src/pages/AuthPages/SignUp/SignUp";
import { FullScreenLayout } from "./layouts/FullScreenLayout";
import { Unauthenticated } from "./pages/AuthPages/Unauthenticated";
<<<<<<< HEAD
import SettingLayout from "./layouts/SettingLayout";
import DocumentationLayout from "./layouts/DocumentationLayout";
import { settingChildren } from "./pages/PlatformPages/SettingPages/SettingPages";
import { documentationChildren } from "./pages/PlatformPages/DocumentationPages/DocumentationPages";
=======
import ApiKeyLayout from "./layouts/ApiKeyLayout";
import { ApiChidren } from "./pages/PlatformPages/APIKeyPages/APIKeyPages";
import { ForgotPassword } from "./pages/AuthPages/ForgotPassword";
import { ResetPassword } from "./pages/AuthPages/ResetPassword";
import { Unauthorized } from "./pages/AuthPages/Unauthorized";
>>>>>>> ef5e4aec19ac1381f89f8ddc542c0302c1dc10e7

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

  // const isUserLoggedIn = user && user.email?.length > 0;
  const isUserLoggedIn = true;

  const routes = [
    {
      path: "/platform",
      element: isUserLoggedIn ? <NavigationLayout /> : <Navigate to="/login" />,
      children: [{ path: "playground", element: <Playground /> },
      { path: "chatbot", element: <Chatbot /> },
      {
        path: "setting", element: <SettingLayout />,
        children: settingChildren
      },
      {
        path: "doc", element: <DocumentationLayout />,
        children: documentationChildren
      },
      ]
    },
    {
      path: "/",
      element: !isUserLoggedIn ? (
        <FullScreenLayout />
      ) : (
        <Navigate to="/platform/playground" />
      ),
      // element: <FullScreenLayout />,
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
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "unauthorized",
          element: <Unauthorized />,
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
