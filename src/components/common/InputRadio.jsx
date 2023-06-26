import { Fragment } from "react";

const InputRadio = ({ name, formik, radioOption }) => {
  return (
    <div className="formControl">
      {radioOption.map((item) => (
        <Fragment key={item.value}>
          <input
            type="radio"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values.gender === item.value}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </Fragment>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default InputRadio;
