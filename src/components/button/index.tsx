import { Button as Btn, ButtonProps } from "@mui/material";

export default function Buttons({ children, ...ButtonProps }: ButtonProps) {
  return <Btn {...ButtonProps}>{children}</Btn>;
}
