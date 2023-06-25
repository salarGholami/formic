import { useFormik } from "formik";
import { object, ref, string } from "yup";

// 1.mange state
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
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
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input type="text" {...formik.getFieldProps("name")} name="name" />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input type="email" {...formik.getFieldProps("email")} name="email" />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>phone Number</label>
          <input
            type="number"
            {...formik.getFieldProps("phoneNumber")}
            name="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password Confirm</label>
          <input
            type="text"
            {...formik.getFieldProps("passwordConfirm")}
            name="passwordConfirm"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div className="error">{formik.errors.passwordConfirm}</div>
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
