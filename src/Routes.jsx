import React, { useEffect, lazy, Suspense } from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { NavigationLayout } from "src/layouts/NavigationLayout/NavigationLayout";
import { getUser, isLoggedIn } from "src/store/actions";
import "src/components/styles/index.css";
// import Playground from "./pages/PlatformPages/Playground/Playground";
const Playground = lazy(() =>
  import("./pages/PlatformPages/Playground/Playground")
);
const Chatbot = lazy(() => import("/src/pages/PlatformPages/Chatbot/Chatbot"));
import { NotFound } from "src/pages/AuthPages/NotFound/NotFound";
import LogIn from "src/pages/AuthPages/LogIn/LogIn";
import { SignUp } from "src/pages/AuthPages/SignUp/SignUp";
import { FullScreenLayout } from "./layouts/FullScreenLayout";
import { Unauthenticated } from "./pages/AuthPages/Unauthenticated";
import LeftNavigationLayout from "./layouts/LeftNavigationLayout";
import { settingChildren } from "./pages/PlatformPages/SettingPages/SettingPages";

import { documentationChildren } from "./pages/PlatformPages/DocumentationPages/DocumentationPages";
import { qaChildren } from "./pages/PlatformPages/QaPages/QaPages";

import { ForgotPassword } from "./pages/AuthPages/ForgotPassword";
import { ResetPassword } from "./pages/AuthPages/ResetPassword";
import { Unauthorized } from "./pages/AuthPages/Unauthorized";
import StreamingTextTest from "./pages/PlatformPages/TestPage/TestPage";
import { OnBoard } from "./pages/AuthPages/OnBoard/OnBoard";
import { getCSRF } from "./authentication/Authentication";

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

  const isUserLoggedIn = isLoggedIn(user);
  // const isUserLoggedIn = true;
  const routes = [
    {
      path: "/platform",
      element: isUserLoggedIn ? <NavigationLayout /> : <Navigate to="/login" />,
      children: [
        { path: "playground", element: <Playground /> },
        { path: "chatbot", element: <Chatbot /> },
        {
          path: "setting",
          element: <LeftNavigationLayout sectionName={"setting"} />,
          children: settingChildren,
        },
        // {
        //   path: "doc",
        //   element: <LeftNavigationLayout sectionName={"documentation"} />,
        //   children: documentationChildren,
        // },
        {
          path: "qa-wall",
          element: <LeftNavigationLayout sectionName={"qa-wall"} />,
          children: qaChildren,
        },
        {
          path: "test",
          element: <StreamingTextTest />,
        },
      ],
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
        { path: "/", element: <Unauthenticated /> },
        { path: "onboard", element: <OnBoard /> },
      ],
    },
    {
      path: "*",
      element: <FullScreenLayout />,
      children: [{ path: "*", element: <NotFound /> }],
    },
  ];

  const element = useRoutes(routes);

  return <Suspense fallback={<div></div>}>{element}</Suspense>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
