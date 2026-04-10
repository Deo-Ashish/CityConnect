import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import Page from "./page";

import Explore from "../pages/Explore";
import Business from "../pages/Business";
import AddBusiness from "../pages/AddBusiness";
import Category from "../pages/Category";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "business/:id",
        element: <Business />,
      },
      {
        path: "add-business",
        element: <AddBusiness />,
      },
      {
        path: "category/:name",
        element: <Category />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;