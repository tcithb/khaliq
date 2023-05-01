import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  query,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../../../utils/initialize";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { useAuthListener } from "../../../../../routes";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
export type IUser = {
  id: string;
  uid: string;
  firstname: string;
  middlename: string;
  lastname: string;
  name: string;
  email: string;
};
export default function Users() {
  const navigate = useNavigate();
  const { user } = useAuthListener();
  const [loading, setloading] = React.useState<boolean>(false);
  const [data, setdata] = React.useState<IUser[]>([]);
  const fetchUsers = async () => {
    setloading(true);
    try {
      const q = query(collection(db, "users"));
      onSnapshot(q, (querySnapshot) => {
        setdata(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              uid: doc.data().uid,
              firstname: doc.data().firstname,
              middlename: doc.data().middlename,
              lastname: doc.data().lastname,
              name: doc.data().name,
              email: doc.data().email,
            };
          })
        );
      });
      setloading(false);
    } catch (err) {
      console.error(err);
      setloading(false);
      alert("An error occured while fetching user data");
    }
  };
  React.useEffect(() => {
    fetchUsers();
  }, []);
  const editUser = (id: string) => navigate(`/dashboard/edituser/${id}`);

  const deleteUser = async (id: string, uid?: string) => {
    const userDocRef = doc(db, "users", id);
    if (uid === user?.uid) {
      alert("Access Denied");
      return;
    } else {
      try {
        const res = await deleteDoc(userDocRef);
        console.log(res, "res");
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Users List
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRowsLoader rowsNum={5} />
          ) : data?.length ? (
            data?.map((row: IUser) => (
              <TableRow
                key={row.id}
                onClick={(e) => {
                  preventDefault(e);
                  // navigate(`/dashboard/edituser/${row.id}`);
                }}
              >
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.middlename || "-"}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editUser(row?.id)}>
                    <EditRounded />
                  </IconButton>
                  <IconButton onClick={() => deleteUser(row?.id, row?.uid)}>
                    <DeleteRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <Typography>No records found</Typography>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
const TableRowsLoader = ({ rowsNum }: any): JSX.Element[] => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ));
};
