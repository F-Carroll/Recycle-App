import React from "react";
import {withFormik } from "formik";
import * as Yup from "yup";
import options from "../options.json";
import Select from "react-select";

export default function AddLocation() {
  

  const selectoptions = []

  function Capitalize(string) {
    const input = string.toLowerCase();
    const words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  }

  options.optionsList.forEach((option) => {
    selectoptions.push({ value: option, label: Capitalize(option) });
  });

  const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
      locationname: Yup.string()
      .min(3, "Product name is too short")
      .max(100, "Product name is too long")
      .required("Required"),

            select: Yup.array().required('Required').min(1, 'Required').nullable()
    }),
    mapPropsToValues: () => ({
      locationname: "",
      select: null
    }),
    handleSubmit: async (values, { setSubmitting }) => {
   
      const payload = {
        location_name: values.locationname,
        location_materials: values.select.map((select) => {
          return select.value
        })
      };
      try {  
          await fetch("http://localhost:5000/api/locations", {
              method:'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(payload)
          });
          window.location = "/";
      } catch (error) {
          console.error(error.message)
      }  

      setTimeout(() => {
        alert(JSON.stringify(payload, null, 2));
        setSubmitting(false);
      }, 1000);
    },
    displayName: "MyForm"
  });

  const MyForm = (props) => {
    const {
      values,
      touched,
      dirty,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      setFieldValue,
      setFieldTouched,
      isSubmitting
    } = props;
    return (
      <form onSubmit={handleSubmit}>
        <input
          id="locationname"
          type="text"
          placeholder="Enter Location Name"
          value={values.locationname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.locationname && touched.locationname && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.locationname}</div>
        )}

        <MySelect
          value={values.select}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.select}
          touched={touched.select}
        />

{touched.select && errors.select ? errors.select  &&
 <div style={{ color: "red", marginTop: ".5rem" }}>{errors.select}</div>
: '' }
              
                <button
          type="button"
          className="outline"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}
        >
          Reset
        </button>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    );
  };
  
  
  class MySelect extends React.Component {
    handleChange = (value) => {
      this.props.onChange("select", value);
    };
  
    handleBlur = () => {
      this.props.onBlur("select", true);
    };
  
    render() {
      return (
        <div style={{ margin: "1rem 0" }}>
          <label htmlFor="color">Select Recyclable Materials at this Location</label>
          <Select
            id="color"
            options={selectoptions}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
            isMulti
            backspaceRemovesValue
            closeMenuOnSelect={false}
          />
        </div>
      );
    }
  }
  
  const MyEnhancedForm = formikEnhancer(MyForm);
  
  return (
    <>
      <MyEnhancedForm />
    </>
  );
}
