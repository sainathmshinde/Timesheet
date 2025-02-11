import Login from "../pages/Login";
import About from "../pages/About/About";
import User from "../pages/User/User";

const routes = [
  {
    path: "/",
    exact: true,
    // component: <Login />,
  },
  {
    path: "/login",
    exact: true,
    component: <Login />,
  },
  {
    exact: true,
    path: "/about",
    component: <About />,
  },
  {
    exact: true,
    path: "/user",
    component: <User />,
  },
];

export default routes;
