import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { array, boolean, object, ref, string } from "yup";
import Input from "./common/Input";
import InputRadio from "./common/InputRadio";
import Select from "./common/SelectNationality";
import CheckBox from "./common/CheckBox";
import Terms from "./common/Terms";

// 1.mange state
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  checkBox: [],
  terms: false,
};

// 2.handler submiission
const onSubmit = (values) => {
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

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
  nationality: string().required("select nationality !"),
  checkBox: array()
    .min(1, "at least select one")
    .required("Check Box is required"),
  terms: boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("the terms and conditions must be accepted"),
});

const radioOption = [
  { label: "male", value: "0" },
  { label: "female", value: "1" },
];

const checkBoxOption = [
  { label: "react", value: "react" },
  { label: "vue", value: "vue" },
  { label: "angular", value: "angular" },
];

const selectOption = [
  { label: "select nationality", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
  { label: "France", value: "FAR" },
];

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
        <Input
          formik={formik}
          name="phoneNumber"
          label="phoneNumber"
          type="number"
        />
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
        <InputRadio formik={formik} radioOption={radioOption} name="gender" />

        <Select
          selectOption={selectOption}
          name="nationality"
          formik={formik}
        />

        <CheckBox
          formik={formik}
          checkBoxOption={checkBoxOption}
          name="checkBox"
        />

        <Terms formik={formik} />

        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
