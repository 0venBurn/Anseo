import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import ErrorPage from "./pages/ErrorPage";
import LandingPage from './LandingPage';
import QuestionPage from './QuestionPage';
import BoroughPage from './BoroughPage';
import WelcomePage from './WelcomePage';
import SubmitPage from './SubmitPage';
import LoginPage from './SignInPage';
import SignUpPage from './SignUpPage';
import AboutPage from './AboutPage';
import MapPage from './MapPage';
import TargetPage from './TargetPage';
import AreaPage from './AreaPage';
import ExtraPage from './ExtraPage';
import PasswordPage from './PasswordPage';
import TestPage from './SubmitPageTest';

import AuthenticationProvider from "./components/AuthenticationProvider";

const AuthLayout = () => (
  <AuthenticationProvider>
    <Outlet />
  </AuthenticationProvider>
);

const router = createBrowserRouter([
  {
    element: <AuthLayout/>,
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
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
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

const App: React.FC = () => {
  return (
    <div className="App">
        <AuthenticationProvider>
          <RouterProvider router={router}/>
        </AuthenticationProvider>
      </div>
  );
};

export default App;