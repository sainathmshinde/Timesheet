import Sidebar from "../components/Sidebar/Sidebar";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import User from "../pages/User/User";

const routes = [
  {
    path: "/",
    exact: true,
    component: <Home />,
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
