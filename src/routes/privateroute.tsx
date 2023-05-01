import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteConst } from "./constants.ts";
import { CustomRouteObject } from "./type.ts";
// import User from 'pages/userTable';
import { UserRoleCode } from "../utils/common/enums/roles";
import Dashboard from "../components/layout/dashboard";
// import MainDashboard from "../views/app/dashboard/main";
// import User from "../views/app/dashboard/users";
// import CreateUser from "../views/app/dashboard/users/createuser";
// import Home from '../../src/assets/Home.svg';
// import Users from '../../src/assets/user.svg';

const MainDashboard = lazy(
  () => import("../views/app/dashboard/main/index.tsx")
);
const CreateUser = lazy(
  () => import("../views/app/dashboard/users/createuser/index.tsx")
);
const User = lazy(() => import("../views/app/dashboard/users/index.tsx"));

export const privateRoute: CustomRouteObject[] = [
  {
    path: RouteConst.user_dashboard,
    element: <Dashboard />,
    showInMenu: true,
    children: [
      { path: RouteConst.user_dashboard, element: <MainDashboard /> },
      {
        path: RouteConst.user,
        element: <User />,
      },
      { path: RouteConst.createuser, element: <CreateUser /> },
      { path: RouteConst.edituser, element: <CreateUser /> },
    ],
    title: "Home",
  },
];
