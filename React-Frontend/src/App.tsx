import React from 'react';
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ErrorPage from "./pages/ErrorPage";
import SignedIn from "./pages/SignedIn";
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
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signedin",
        element: <SignedIn />,
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
}

export default App;