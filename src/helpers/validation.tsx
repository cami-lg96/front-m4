import * as Yup from "yup";


export const validateLogin = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
      .required("Password is required"),
  });

  
export const validateRegister = Yup.object({
    name: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string()
      .min(5, "Address must be at least 5 characters long")
      .required("Address is required"),
    phone: Yup.string()
      .matches(
        /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        "Phone number is not valid"
      )
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });
  