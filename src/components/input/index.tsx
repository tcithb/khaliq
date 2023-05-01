import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputText = ({
  name,
  control,
  disabled,
  label,
}: {
  name: string;
  control: any;
  label: string;
  disabled?: boolean;
  setValue?: any;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          disabled={disabled}
          onChange={onChange}
          value={value}
          type={
            name?.toLocaleLowerCase()?.includes("password")
              ? "password"
              : name === "email"
              ? name
              : "text"
          }
          label={label}
          sx={{ m: 2, width: "16rem" }}
          variant="outlined"
        />
      )}
    />
  );
};
