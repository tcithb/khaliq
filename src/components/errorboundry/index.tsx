import { Box, Button, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
interface IState {
  errorMessage: string;
}

class Layout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: { toString: () => string }) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(
    error: { toString: () => string },
    info: { componentStack: any }
  ) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }

  // A fake logging service.
  logErrorToServices = console.log;
  resetErrorBoundary() {
    window.location.reload();
  }
  render() {
    const { children } = this.props;
    const { errorMessage } = this.state;
    if (errorMessage) {
      return (
        <Box
          justifyContent="center"
          flexDirection="column"
          display="flex"
          width={"100vw"}
          alignItems="center"
        >
          <Typography variant="h4" component="h4">
            Oops! Something went wrong
          </Typography>
          <br />
          <Typography variant="h4" component="h4">
            An error occurred: {errorMessage}
          </Typography>
          <br />
          <Button variant="contained" onClick={this.resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      );
    }
    return children;
  }
}

export default Layout;
