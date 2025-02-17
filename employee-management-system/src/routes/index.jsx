import Login from "../pages/Login";
import About from "../pages/About/About";
import User from "../pages/User/User";
import Role from "../pages/RoleCreation/Role";
import RoleCreateUpdate from "../pages/RoleCreation/RoleCreateUpdate";
import { Projects } from "../pages/Projects/Projects";

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
  {
    exact: true,
    path: "/createUpdate",
    component: <RoleCreateUpdate />,
  },
  {
    exact: true,
    path: "/createUpdate/:roleId",
    component: <RoleCreateUpdate />,
  },
  {
    exact: true,
    path: "/projects",
    component: <Projects />,
  },
];

export default routes;
