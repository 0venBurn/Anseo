import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import ErrorPage from "./pages/ErrorPage";
import LandingPage from './LandingPage';
import QuestionPage from './QuestionPage';
import BoroughPage from './BoroughPage';
import WelcomePage from './WelcomePage';
import SubmitPage from './SubmitPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import AboutPage from './AboutPage';
import MapPage from './MapPage';
import TargetPage from './TargetPage';
import AreaPage from './AreaPage';
import ExtraPage from './ExtraPage';
import PasswordPage from './PasswordPage';
import TestPage from './SubmitPageTest';

const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/questions",
        element: <QuestionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/borough",
        element: <BoroughPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/welcome",
        element: <WelcomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/submit",
        element: <SubmitPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/map",
        element: <MapPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/target",
        element: <TargetPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/area",
        element: <AreaPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/extra",
        element: <ExtraPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/password",
        element: <PasswordPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/test",
        element: <TestPage />,
        errorElement: <ErrorPage />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
