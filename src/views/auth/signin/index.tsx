import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "../../../utils/initialize";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResolverSchema } from "../../../utils/validations";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../../components/input";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme();

export default function SignInSide() {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(ResolverSchema.login),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit = (data: { email: string; password: string }) => {
    try {
      logInWithEmailAndPassword(
        data?.["email"] as string,
        data?.["password"] as string
      );
    } catch (error: any) {
      handleClick();
      setMsg(error?.message ?? "");
      console.log(error, "error");
    }
  };
  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setMsg(err?.message ?? "");
      console.error(err);
      handleClick();
    }
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setMsg("");
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={msg}
          action={action}
        />
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            backgroundColor: "#0066cc",
            backgroundSize: "cover",
            backgroundPosition: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            width={"30%"}
            xs={false}
            className="loginwelcome"
            height={"25rem"}
            style={{ background: "#3399ff" }}
          >
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              display={"flex"}
              height={"100%"}
            >
              <Box>
                <Typography
                  component="h1"
                  textAlign={"center"}
                  color="white"
                  variant="h4"
                >
                  Welcome{" "}
                </Typography>
                <Typography component="h1" color="white" variant="h6">
                  to online help center!
                </Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography component="p" color="white">
                  Secure and reliable for users
                </Typography>
                <Typography component="p" color="white">
                  Even your grandma can use it
                </Typography>
                <Typography component="p" color="white">
                  Works 15% faster than others
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            // width={"40%"}
            // style={{ minHeight: "25rem" }}
            height={"25rem"}
            item
            className="loginform"
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form>
                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <FormInputText
                    name="email"
                    control={control}
                    label="Enter Email"
                  />
                  <FormInputText
                    name="password"
                    control={control}
                    label="Enter Password"
                  />
                  <Button
                    style={{ width: "16rem" }}
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    sx={{ m: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
