import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { object, ref, string } from "yup";
import Input from "./common/input";

// 1.mange state
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
};

// 2.handler submiission
const onSubmit = (values) => console.log(values);

// 3.validate
const validationSchema = object({
  name: string().required("Name is requierd"),
  email: string().email("invalid Email format").required("Email is requierd"),
  phoneNumber: string()
    .required("phone number is requierd")
    .min(11, "number must have at least 11 characters"),
  password: string()
    .required("Password is requierd")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, "digit")
    .matches(/[a-z]/, "lowercase")
    .matches(/[A-Z]/, "uppercase")
    .matches(/[@]/, "@!@#$%^&*"),
  passwordConfirm: string()
    .required("Password is requierd")
    .oneOf([ref("password")], "Passwords does not match"),
  gender: string().required("Gender is required"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="name" />
        <Input formik={formik} name="email" label="email" type="email" />
        <Input formik={formik} name="phoneNumber" label="phoneNumber" type="number" />
        <Input
          formik={formik}
          name="password"
          label="password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="passwordConfirm"
          type="password"
        />

        <div className="formControl">
          <p>gender :</p>
          <input
            type="radio"
            name="gender"
            id="0"
            value="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0">male</label>

          <input
            type="radio"
            name="gender"
            id="1"
            value="1"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1">female</label>
          {formik.errors.gender && formik.touched.gender && (
            <div className="error">{formik.errors.gender}</div>
          )}
        </div>
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
