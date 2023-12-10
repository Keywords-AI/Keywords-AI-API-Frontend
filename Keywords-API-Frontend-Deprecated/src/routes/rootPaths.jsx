import React from "react";
import Pricing from "src/pages/Pricing/Pricing";
import Signup from "src/pages/Signup/Signup";
import ForgotPWD from "src/pages/ForgotPWD/ForgotPWD";
import PrivacyPolicy from "src/components/Footer/PrivacyPolicy";
import TermsOfUse from "src/components/Footer/TermsOfUse";
import ResetPassword from "src/pages/ResetPassword/ResetPassword";
import Unauthenticated from "src/pages/Unauthenticated/Unauthenticated";
import NotFound from "src/pages/NotFound/NotFound";
import Careers from "src/pages/Careers/Careers";
import Login from "src/pages/Login/Login";
import Landing from "src/pages/Landing/Landing";
import ActivationPage from "src/pages/ActivationPage/ActivationPage";
import ResendActivation from "src/pages/ResendActivation/ResendActivation";
import Blog from "src/pages/BlogPage/Blog";
import { DPA } from "src/components/Footer/DPA";
import AdminShortcuts from "src/pages/AdminShortcuts/AdminShortcuts";


export const rootPaths = [
  {
    path: "",
    element: <Landing />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "admin-shortcuts",
    element: <AdminShortcuts />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "activate/:uid?/:token?",
    element: <ActivationPage />,
  },
  {
    path: "resend-activation-email/:email?",
    element: <ResendActivation />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
  {
    path: "forgot-password/reset/confirm/:uid?/:token?",
    element: <ResetPassword />,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "unauthenticated",
    element: <Unauthenticated />,
  },
  {
    path: "terms-of-use",
    element: <TermsOfUse />,
  },
  {
    path: "dpa",
    element: <DPA />,
  },
  {
    path: "admin",
    element: <div>Admin</div>,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPWD />,
  },
];

