import React, { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <Box width={"100vw"}>
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    </Box>
  );
}
