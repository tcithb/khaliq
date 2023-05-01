import { RouteConst } from "./constants";
import { CustomRouteObject } from "./type";
import { lazy } from "react";

const Login = lazy(() => import("../views/auth/signin"));
const Home = lazy(() => import("../views/app/dashboard/main"));

export const authRoute: CustomRouteObject[] = [
  { path: RouteConst.login, element: <Login /> },
  { path: RouteConst.home, element: <Login /> },
];
