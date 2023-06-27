import { Fragment } from "react";

const CheckBox = ({ name, formik, checkBoxOption }) => {
  return (
    <div className="formControl">
      {checkBoxOption.map((item) => (
        <Fragment key={item.value}>
          <input
            type="checkBox"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
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

export default CheckBox;
