import Login from "../pages/Login";
import About from "../pages/About/About";
import User from "../pages/User/User";
import Role from "../pages/RoleCreation/Role";
import RoleCreateUpdate from "../pages/RoleCreation/RoleCreateUpdate";
import Page from "../pages/Page/Page";
import Projects from "../pages/Projects/Projects";
import ProjectCreateUpdate from "../pages/Projects/ProjectCreateUpdate";
import Epic from "../pages/Epic/Epic";
import EpicCreateUpdate from "../pages/Epic/EpicCreateUpdate";
import SprintCreateUpdate from "../pages/Sprint/SprintCreateUpdate";
import Sprint from "../pages/Sprint/Sprint";
import { comment } from "postcss";
import { Component } from "react";
import SubTaskCreateUpdate from "../pages/SubTask/SubTaskCreateUpdate";

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
  {
    exact: true,
    path: "/pages",
    component: <Page />,
  },
  {
    exact: true,
    path: "/createUpdateProject",
    component: <ProjectCreateUpdate />,
  },
  {
    exact: true,
    path: "/createUpdateProject/:projectId",
    component: <ProjectCreateUpdate />,
  },
  {
    exact: true,
    path: "/epics",
    component: <Epic />,
  },
  {
    exact: true,
    path: "/createUpdateEpic",
    component: <EpicCreateUpdate />,
  },
  {
    exact: true,
    path: "/sprintCreateUpdate",
    component: <SprintCreateUpdate />,
  },
  {
    exact: true,
    path: "/sprintCreateUpdate/:sprintId",
    component: <SprintCreateUpdate />,
  },
  {
    exact: true,
    path: "/sprint",
    component: <Sprint />,
  },
  {
    exact: true,
    path: "/subTaskCreateUpdate/:taskId",
    component: <SubTaskCreateUpdate />,
  },
  // {
  //   exact: true,
  //   path: "/createUpdateEpic/:epicId",
  //   component: <EpicCreateUpdate />,
  // },
];

export default routes;
