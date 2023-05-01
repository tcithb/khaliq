import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { authRoute } from "./authroute";
import { privateRoute } from "./privateroute";
import { RouteConst } from "./constants";
import Home from "../components/layout/home";
import { Box, Button, Typography } from "@mui/material";
import { auth } from "../utils/initialize";
import { useState, useEffect } from "react";
import { User } from "@firebase/auth-types";

export function useAuthListener() {
  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem("authUser")
      ? JSON.parse(localStorage.getItem("authUser") || "{}")
      : null
  );

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener?.();
  }, [auth]);

  return { user };
}
const ProtectedRoute = ({ isAuth }: { isAuth?: boolean }) => {
  const { user } = useAuthListener();

  return isAuth ? (
    user ? (
      <Navigate to={RouteConst.user_dashboard} replace />
    ) : (
      <Home />
    )
  ) : !user ? (
    <Navigate to={RouteConst.login} />
  ) : (
    <Home />
  );
};

const ErrorElement = () => {
  const error: any = useRouteError();
  const goBack = () => {
    window.location.href = "/";
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width={"100vw"}
    >
      <Typography variant="h4" component="h4">
        Oops! Something went wrong
      </Typography>
      <br />
      <Typography width={"50vw"} variant="h4" component="h4">
        An error occurred: {error.message}
      </Typography>
      <br />
      <Button variant="contained" onClick={goBack}>
        Go Back
      </Button>
    </Box>
  );
};

export const Routers = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          {
            element: <ProtectedRoute isAuth />, //auth
            children: authRoute,
          },
          {
            element: <ProtectedRoute />, //private
            children: privateRoute,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={RouteConst.user_dashboard} replace />,
  },
]);
