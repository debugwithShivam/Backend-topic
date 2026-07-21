import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "../component/home";
import About from "../component/About";
import Login from "../component/login";
import ProtectiveRouting from "./ProtectiveRouting";
import Email from "../component/Email";

const Router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/email",
    element: <Email />,
  },
  {
    path: "/",
    element: <ProtectiveRouting />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/about",
            element: <About />,
          },
        ],
      },
    ],
  },
]);

export default Router;
