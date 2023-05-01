import { Box, Button, Container, Paper } from "@mui/material";
import Users, { IUser } from "../main/userstable";
import { useNavigate } from "react-router-dom";
import { RouteConst } from "../../../../routes/constants";

export default function User() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Button
          style={{ alignSelf: "flex-end" }}
          onClick={() => navigate(RouteConst.createuser)}
        >
          Create User
        </Button>
        <Users />
      </Paper>
    </Container>
  );
}
