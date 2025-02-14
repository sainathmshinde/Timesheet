import Login from "../pages/Login";
import About from "../pages/About/About";
import User from "../pages/User/User";
import Role from "../pages/RoleCreation/Role";

const routes = [
  {
    path: "/",
    exact: true,
    component: <About />,
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
  {
    exact: true,
    path: "/roles",
    component: <Role />,
  },
];

export default routes;
