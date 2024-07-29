import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";


const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/surveys", element: <Dashboard /> },
      { path: "/surveys/new", element: <SurveyNew /> },
    ],
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
