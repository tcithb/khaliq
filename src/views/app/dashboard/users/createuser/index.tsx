import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../../utils/initialize";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../../../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResolverSchema } from "../../../../../utils/validations";
import { ArrowBack } from "@mui/icons-material";

const theme = createTheme();

export default function CreateUser() {
  const param = useParams();
  const navigate = useNavigate();
  const [existingUserData, setExistingUserData] = React.useState({}); //
  const [loading, setloading] = React.useState<boolean>(false);

  const onSubmit = async (data: any) => {
    const { userName, firstName, middleName, lastName, email } = data;
    if (param?.uid) {
      const userDocRef = doc(db, "users", param?.uid);
      try {
        await updateDoc(userDocRef, {
          name: userName,
          firstname: firstName,
          middlename: middleName,
          lastname: lastName,
          email,
        });
        history.back();
      } catch (err) {
        alert(err);
      }
    } else {
      registerWithEmailAndPassword(
        data?.["email"] as string,
        data?.["password"] as string,
        data?.["firstName"] as string,
        data?.["middleName"] as string,
        data?.["lastName"] as string,
        data?.["userName"] as string
      );
    }
  };
  const { handleSubmit, reset, control, setValue } = useForm({
    resolver: yupResolver(
      param?.uid ? ResolverSchema.edituser : ResolverSchema.register
    ),
    defaultValues: {
      email: "",
      userName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const fetchUser = async () => {
    setloading(true);
    try {
      const q = query(collection(db, "users"));
      onSnapshot(q, (querySnapshot) => {
        const usersData: any = querySnapshot?.docs?.find(
          (doc) => doc.id === param.uid
        );
        setExistingUserData(usersData?.data()); // for update user auth if email or password changed
        setValue("email", usersData?.data()?.email ?? "");
        setValue("firstName", usersData?.data()?.firstname ?? "");
        setValue("middleName", usersData?.data()?.middlename ?? "");
        setValue("lastName", usersData?.data()?.lastname ?? "");
        setValue("userName", usersData?.data()?.name ?? "");
        setloading(false);
      });
      setloading(false);
    } catch (err) {
      console.error(err);
      setloading(false);
      alert("An error occured while fetching user data");
    }
  };
  const registerWithEmailAndPassword = async (
    email: string,
    password: string,
    firstname: string,
    middlename: string,
    lastname: string,
    username: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: username,
        firstname,
        middlename,
        lastname,
        authProvider: "local",
        email,
      });
      history.back();
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };
  React.useEffect(() => {
    console.log(param, "param");
    if (param?.uid) {
      fetchUser();
    }
  }, [param?.uid]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{ background: "white", padding: 20, marginTop: 40 }}
        component="main"
        maxWidth="md"
      >
        <CssBaseline />
        <Box
          style={{
            position: "absolute",
            alignSelf: "flex-start",
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBack />
        </Box>
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {param?.uid ? "Edit" : "Create"} User
          </Typography>
          <form>
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <FormInputText
                name="email"
                disabled={param?.uid ? true : false}
                control={control}
                label="Enter Email"
              />
              <FormInputText
                name="userName"
                control={control}
                label="Enter User Name"
              />
              <FormInputText
                name="firstName"
                control={control}
                label="Enter First Name"
              />
              <FormInputText
                name="middleName"
                control={control}
                label="Enter Middle Name"
              />
              <FormInputText
                name="lastName"
                control={control}
                label="Enter Last Name"
              />
              {param?.uid ? null : (
                <FormInputText
                  name="password"
                  control={control}
                  label="Enter Password"
                />
              )}
              {param?.uid ? null : (
                <FormInputText
                  name="confirmPassword"
                  control={control}
                  label="Enter Confirm Password"
                />
              )}
            </Box>
            <Box display={"flex"} justifyContent={"space-around"}>
              <Button
                style={{ width: "8rem" }}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Button
                style={{ width: "8rem" }}
                onClick={(e) => reset()}
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2 }}
              >
                Clear
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
