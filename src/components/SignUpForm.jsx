import { useFormik } from "formik";

// 1.mange state
const initialValues = { name: "", email: "", password: "" };

// 2.handler submiission
const onSubmit = (values) => console.log(values);

// 3.validate
const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is requierd";
  }

  if (!values.email) {
    errors.email = "Email is requierd";
  }

  if (!values.password) {
    errors.password = "Password is requierd";
  }

  return errors;
};

const SignUpForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
 
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
