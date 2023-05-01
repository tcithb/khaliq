import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Users from "../users";
import StatusCard from "../../../../components/statuscard";
import { useNavigate } from "react-router-dom";
import { RouteConst } from "../../../../routes/constants";
import { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/initialize";
function DashboardContent() {
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState(0);
  const fetchUsers = async () => {
    try {
      const q = query(collection(db, "users"));
      onSnapshot(q, (querySnapshot) => {
        setUsersCount(querySnapshot.docs?.length);
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <StatusCard
              title={"Total Users"}
              count={usersCount}
              date={"May 02, 2023"}
              buttonTitle="view users"
              onClick={() => navigate(RouteConst.user)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <StatusCard
              title={"Active Users"}
              count={usersCount}
              date={"May 02, 2023"}
              buttonTitle="view users"
              onClick={() => navigate(RouteConst.user)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <StatusCard
              title={"In Active Users"}
              count={usersCount}
              date={"May 02, 2023"}
              buttonTitle="view users"
              onClick={() => navigate(RouteConst.user)}
            />
          </Paper>
        </Grid>
        <Users />
      </Grid>
    </Container>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
