import * as yup from "yup";

const yupValidate = Object.freeze({
  firstName: yup
    .string()
    .required("First Name is required.")
    .matches(
      /^[A-Za-z]+$/,
      "First Name should not contain with number & special Characters."
    ),
  middleName: yup.string(),
  lastName: yup
    .string()
    .required("Last Name is required.")
    .matches(
      /^[A-Za-z]+$/,
      "Last Name should not contain with number & special Characters."
    ),
  // userName: yup
  //     .string()
  //     .max(20)
  //     .matches(
  //         /^[a-zA-Z0-9_.-]*$/,
  //         "UserName should contain with uppercase, lowercase, number & special Characters of dot, underscor & hyphen."
  //     ),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email format"
    ),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(16, "Password is too long - should be 16 chars maximum.")
    .matches(
      /^(?=.*[@$!%*#?&])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/,
      "Password should contain combination of uppercase, lowercase, number & special characters."
    ),
  confirmPassword: yup
    .string()
    .required("Password is required.")
    .oneOf([yup.ref("newPassword"), yup.ref("password")], "Password Mismatch"),
});

const login = yup.object().shape({
  email: yupValidate.email,
  password: yupValidate.password,
});

const register = yup.object().shape({
  firstName: yupValidate.firstName,
  middleName: yupValidate.middleName,
  lastName: yupValidate.lastName,
  // userName: yupValidate.userName,
  email: yupValidate.email,
  password: yupValidate.password,
  confirmPassword: yupValidate.confirmPassword,
});
const edituser = yup.object().shape({
  firstName: yupValidate.firstName,
  middleName: yupValidate.middleName,
  lastName: yupValidate.lastName,
});

export const ResolverSchema = {
  login,
  register,
  edituser,
};

export type ResolverSchemaType = typeof ResolverSchema;
