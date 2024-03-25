import React, { useEffect, lazy, Suspense } from "react";
import { useRoutes, Navigate, Outlet, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { NavigationLayout } from "src/layouts/NavigationLayout/NavigationLayout";
import {
  getUser,
  isLoggedIn,
  updateUser,
  clearNotifications,
  validateToken,
} from "src/store/actions";
import "src/components/styles/index.css";
import { accessMap, retrieveAccessToken } from "./utilities/authorization";
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
const Dashboard = lazy(() =>
  import("./pages/PlatformPages/Dashboard/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);
import EmailConfirmation from "./pages/AuthPages/EmailConfirmation";
import { AcceptInvitation } from "./pages/AuthPages/AcceptInvitation";
import { REDIRECT_URI } from "./utilities/navigation";
import { useNavigate } from "react-router-dom";
import { AUTH_ENABLED } from "src/env";
import { StartWithPlan } from "./pages/AuthPages/Onboarding/Plans";
import { GetStarted } from "./pages/AuthPages/Onboarding/GetStarted";
const Requests = lazy(() =>
  import("./pages/PlatformPages/Requests/Requests").then((module) => ({
    default: module.Requests,
  }))
);
import { Sentiment } from "./pages/PlatformPages/Sentiment";
import CachePage from "./pages/CachePage/CachePage";
import { Forbidden } from "./pages/AuthPages/NotFound/Forbidden";
import posthog from "posthog-js";
const UsersPage = lazy(() =>
  import("./pages/PlatformPages/UserPage/UsersPage")
);
import DemoWelcome from "./pages/MISC/DemoWelcome";
import { LoadingPage } from "./components/LoadingPage";
import CustomerPage from "./pages/PlatformPages/CustomerPage/CustomerPage";
import ResendActivation from "./pages/AuthPages/ResendActivation";
import { SidebarNavigationLayout } from "./layouts/SidebarNavigationLayout";
import { Dashboard as DB2 } from "./pages/PlatformPages/Dashboard2/Dashboard";
const mapStateToProps = (state) => {
  return {
    user: state.user,
    organization: state.organization,
  };
};

const mapDispatchToProps = {
  getUser,
  clearNotifications,
};

const Routes = ({ getUser, user, organization, clearNotifications }) => {
  const navigate = useNavigate();
  const hasAccess = user.loading ? true : user.is_admin ? true : false;
  const [authToken, setAuthToken] = React.useState(retrieveAccessToken());
  const isUserLoggedIn = AUTH_ENABLED === "true" ? isLoggedIn(user) : true;
  useEffect(() => {
    getUser();
  }, []);
  const location = useLocation();
  useEffect(() => {
    clearNotifications();
    // accessMap(999, location.pathname)
    //   ? console.log("has access")
    //   : console.log("No access");
  }, [location]);

  useEffect(() => {
    const validateLogin = async () => {
      let result = await validateToken();
      if (!result) {
        navigate("/login");
      }
    };
    validateLogin();
    const intervalId = setInterval(() => {
      // rotate the token every 10 minutes
      setAuthToken(refreshToken());
    }, 1000 * 10 * 60);
    return () => clearInterval(intervalId);
  }, [authToken]);

  useEffect(() => {
    // Distinct between org is empty because of loading vs org is empty because user doesn't have org
    if (user.loading) return;

    // if (user.failed || !isLoggedIn(user)) {
    //   window.location.href = "https://keywordsai.co/";
    // }
    const onOnboradingPage = window.location.pathname.includes("/onboarding");

    // if (organization.id) {
    //   // The init state of org is not empty, but the id is null
    //   if (!onOnboradingPage && !organization?.id && !organization?.loading) {
    //     // navigate to onboarding page if user hasn't onboarded
    //     console.log("Tried navigating");
    //     navigate("/onboarding");
    //   }
    // }
    if (!organization?.id && !organization?.loading) {
      // If user doesn't have org, fetching the user will make org null
      // navigate to dashboard if user has onboarded
      navigate("/onboarding");
    }

    if (user.id) {
      posthog.identify(user.id, {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user]);

  // comment the 2 lines below to switch between logged in/out states

  const routes = [
    {
      path: REDIRECT_URI, // "/platform"
      element: isUserLoggedIn ? (
        <SidebarNavigationLayout />
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { path: "requests", element: <Requests /> },
        { path: "playground", element: <Playground /> },
        {
          path: "api",
          element: <LeftNavigationLayout sectionName={"setting"} />,
          children: settingChildren,
        },
        {
          path: "dashboard",
          // element: hasAccess ? <DB2 /> : <Dashboard />,
          element: <Dashboard />,
        },
        {
          path: "dashboard2",
          element: <Dashboard />,
        },
        { path: "users", element: <UsersPage /> },
        {
          path: REDIRECT_URI,
          element: <Navigate to={`${REDIRECT_URI}/dashboard`} />,
        },
      ],
    },
    {
      path: REDIRECT_URI, // "/These pages are only accessible to admin users."
      element: hasAccess ? (
        <SidebarNavigationLayout />
      ) : (
        <Navigate to="/forbidden" />
      ),
      children: [
        { path: "chatbot", element: <Chatbot /> },
        { path: "loading", element: <LoadingPage /> },
        { path: "cache", element: <CachePage /> },
        { path: "customers", element: <CustomerPage /> },
        {
          path: "sentiment",
          element: <Sentiment />,
        },
        {
          path: "qa-wall",
          element: <LeftNavigationLayout sectionName={"qa-wall"} />,
          children: qaChildren,
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
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "forgot-password/reset/confirm/:uid?/:token?",
          element: <ResetPassword />,
        },
        { path: "activate/:uid?/:token?", element: <ActivationPage /> },
        { path: "resend-activation", element: <ResendActivation /> },
        {
          path: "onboarding",
          element: isUserLoggedIn ? (
            <OnboardingPage /> //If user logged in and is at root, redirect to platform, then platform will redirect to dashboard
          ) : (
            <Navigate to="/login" />
          ),
        },
        // {
        //   path: "onboarding/plans",
        //   element: <StartWithPlan />,
        // },
        {
          path: "onboarding/get-started",
          element: <GetStarted />,
        },
        {
          path: "/platform/demo",
          element: <DemoWelcome />,
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
          path: "unauthorized",
          element: <Unauthorized />,
        },
        {
          path: "email-confirmation/:email?",
          element: <EmailConfirmation />,
        },
      ],
    },
    {
      path: "forbidden",
      element: <FullScreenLayout />,
      children: [{ path: "", element: <Forbidden /> }],
    },
    {
      path: "*",
      element: <FullScreenLayout />,
      children: [{ path: "*", element: <NotFound /> }],
    },
  ];

  const element = useRoutes(routes);

  return <Suspense fallback={<LoadingPage />}>{element}</Suspense>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
