import { useFormik } from "formik";

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
  });

  const submitHandler = (e) => {
    console.log("submit");
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
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
