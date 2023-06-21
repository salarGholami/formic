import { useFormik } from "formik";

// 1.mange state
const initialValues = { name: "", email: "", password: "" };

// 2.handler submiission
const onSubmit = (values) => console.log(values);

// 3.validate
const validate = (values) => {
  let errors = {};

  if (!values.name) errors.name = "Name is requierd";

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

  console.log(formik.errors);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
          />
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
