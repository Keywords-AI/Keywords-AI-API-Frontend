import React, { useEffect, lazy, Suspense } from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { NavigationLayout } from "src/layouts/NavigationLayout/NavigationLayout";
import { getUser, isLoggedIn } from "src/store/actions";
import "src/components/styles/index.css";
import { retrieveAccessToken } from "./utilities/authorization";
import { refreshToken } from "src/store/actions";
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
import { qaChildren } from "./pages/PlatformPages/QaPages/QaPages";
import { ForgotPassword } from "./pages/AuthPages/ForgotPassword";
import { ResetPassword } from "./pages/AuthPages/ResetPassword";
import { Unauthorized } from "./pages/AuthPages/Unauthorized";
import { OnboardingPage } from "./pages/AuthPages/Onboarding/OnboardingPage";
import ActivationPage from "./pages/AuthPages/ActivationPage";
import { Dashboard } from "./pages/PlatformPages/Dashboard/Dashboard";
import EmailConfirmation from "./pages/AuthPages/EmailConfirmation";
import { AcceptInvitation } from "./pages/AuthPages/AcceptInvitation";
import { REDIRECT_URI } from "./utilities/navigation";
import { useNavigate } from "react-router-dom";
import { AUTH_ENABLED } from "src/utilities/env";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};


const mapDispatchToProps = {
  getUser,
};

const Routes = ({ getUser, user }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = React.useState(retrieveAccessToken());
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // rotate the token every 10 minutes
      setAuthToken(refreshToken());
    }, 1000 * 10 * 60);
    return () => clearInterval(intervalId);
  }, [authToken]);
  useEffect(() => {
    if (user.id && isLoggedIn(user)) {
      const onOnboradingPage = window.location.pathname.includes("/onboarding");
      if (!user.onboarded && !onOnboradingPage) {
        // navigate to onboarding page if user hasn't onboarded
        navigate("/onboarding");
      }
    }
  }, [user]);
  // comment the 2 lines below to switch between logged in/out states
  const isUserLoggedIn =
  AUTH_ENABLED === "true" ? isLoggedIn(user) : true;

  const routes = [
    {
      path: REDIRECT_URI, // "/platform"
      element: isUserLoggedIn ? <NavigationLayout /> : <Navigate to="/login" />,
      children: [
        { path: "playground", element: <Playground /> },
        { path: "chatbot", element: <Chatbot /> },
        {
          path: "api",
          element: <LeftNavigationLayout sectionName={"setting"} />,
          children: settingChildren,
        },
        {
          path: "qa-wall",
          element: <LeftNavigationLayout sectionName={"qa-wall"} />,
          children: qaChildren,
        },

        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: REDIRECT_URI,
          element: <Navigate to={`${REDIRECT_URI}/dashboard`} />,
        },
      ],
    },
    {
      // Handled Separately to allow special redirection
      path: "/",
      element: <FullScreenLayout />,
      children: [
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        { path: "accept/:code?", element: <AcceptInvitation /> },
        {
          path: "onboarding/:curr_step?",
          element: isUserLoggedIn ? (
            <OnboardingPage /> //If user logged in and is at root, redirect to platform, then platform will redirect to dashboard
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "",
          element: isUserLoggedIn ? (
            <Navigate to={REDIRECT_URI} /> //If user logged in and is at root, redirect to platform, then platform will redirect to dashboard
          ) : (
            <Unauthenticated />
          ),
        },
      ],
    },
    {
      path: "/",
      element: isUserLoggedIn ? (
        <Navigate to={REDIRECT_URI} /> //If user is logged in, redirect to platform
      ) : (
        <FullScreenLayout />
      ),
      children: [

        {
          path: "unauthenticated",
          element: <Unauthenticated />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "forgot-password/reset/confirm/:uid?/:token?",
          element: <ResetPassword />,
        },
        {
          path: "unauthorized",
          element: <Unauthorized />,
        },
        {
          path: "email-confirmation/:email?",
          element: <EmailConfirmation />,
        },
        { path: "activate/:uid?/:token?", element: <ActivationPage /> },
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
