import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import ErrorPage from "./pages/ErrorPage";
import LandingPage from './pages/LandingPage';
import WelcomePage from './pages/WelcomePage';
import SubmitPage from './pages/SubmitPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import MapPage from './pages/MapPage';
import BusinessDetails from './pages/BusinessDetails';
import Locality from './pages/Locality';
import TargetAudience from "./pages/TargetAudience";

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
        path: "/welcome",
        element: <WelcomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/business-details",
        element: <BusinessDetails />,
        errorElement: <ErrorPage />
      },
      {
        path: "/locality",
        element: <Locality />,
        errorElement: <ErrorPage />
      },
      {
        path: "/target-audience",
        element: <TargetAudience />,
        errorElement: <ErrorPage />
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
        path: "/submit",
        element: <SubmitPage />,
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
