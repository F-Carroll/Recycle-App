import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import options from "../options.json";
import Select from "react-select";

export default function AddItem() {
  const [existingBarcodes, setexistingBarcodes] = useState([]);
  const [existingProducts, setexistingProducts] = useState([]);

  const selectoptions = [];

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

  function handleClose() {
    window.location = "/";
  }

  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");
      const jsonData = await response.json();

      setexistingBarcodes(
        jsonData.map((item) => {
          return item.barcode;
        })
      );
      setexistingProducts(
        jsonData.map((item) => {
          return item.product_name;
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
      productname: Yup.string()
        .min(3, "Product name is too short")
        .max(100, "Product name is too long")
        .notOneOf(existingProducts, "This product already exists")
        .required("Required"),

      barcode: Yup.string()
        .length(13, "Invalid Barcode")
        .notOneOf(existingBarcodes, "This barcode is taken")
        .required("Required"),

      select: Yup.array().required("Required").min(1, "Required").nullable(),
    }),
    mapPropsToValues: () => ({
      productname: "",
      barcode: "",
      select: null,
    }),
    handleSubmit: async (values, { setSubmitting }) => {
      const payload = {
        product_name: values.productname,
        barcode: values.barcode,
        items: values.select.map((select) => {
          return select.value;
        }),
      };
      try {
        await fetch("http://localhost:5000/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        window.location = "/";
      } catch (error) {
        console.error(error.message);
      }

      setTimeout(() => {
        alert('Timed Out');
        setSubmitting(false);
      }, 1000);
    },
    displayName: "MyForm",
  });

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F3F4F6",
      borderRadius: "8px",
      minHeight: "40px",
      cursor: "pointer",
      borderColor: "none",
      borderWidth: "2px",
      width: "100%",
// eslint-disable-next-line
      borderColor: state.isFocused ? null : "#F3F4F6",
// eslint-disable-next-line
      background: state.isFocused ? "white" : "transition #F3F4F6",
      boxShadow: state.isFocused ? null : null,
    }),
  };

  const MyForm = (props) => {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      isSubmitting,
    } = props;
    return (
      <div className="h-screen80 relative">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl p-5 font-semibold">Add Item</h1>
          <button
            className="self-center p-2 mr-6 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={handleClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-5"
        >
          <div className="w-2/3 sm:w-2/5 m-2.5 h-20">
            <label
              className="block uppercase tracking-wide text-primary-black text-xs font-bold mb-1.5"
            >
              Product Name
            </label>
            <input
              className="bg-gray-100 appearance-none border-2 rounded-md w-full border-gray-100 p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
              id="productname"
              type="text"
              autoComplete="off"
              placeholder="Enter Product Name"
              value={values.productname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.productname && touched.productname && (
              <div className="text-red-500 p-1 text-sm">
                {errors.productname}
              </div>
            )}
          </div>

          <div className="w-2/3 sm:w-2/5 m-2.5 h-20">
            <label
              className="block uppercase tracking-wide text-primary-black text-xs font-bold mb-1.5"
            >
              Barcode
            </label>
            <input
              className="bg-gray-100 appearance-none w-full border-2 rounded-md border-gray-100 p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
              id="barcode"
              type="number"
              placeholder="Enter Barcode"
              autoComplete="off"
              value={values.barcode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.barcode && touched.barcode && (
              <div className="text-red-500 p-1 text-sm">{errors.barcode}</div>
            )}
          </div>
          <div className="w-2/3 sm:w-2/5 m-2.5 h-20">
            <label
              className="block uppercase tracking-wide text-primary-black text-xs font-bold mb-1.5"
            >
              Materials
            </label>
            <MySelect
              value={values.select}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.select}
              touched={touched.select}
            />
            {touched.select && errors.select
              ? errors.select && (
                  <div className="text-red-500 p-1 text-sm ">
                    {errors.select}
                  </div>
                )
              : ""}
          </div>
          <div className="w-full absolute bottom-0 text-center">
            <button
              className="transition duration-300  ease-in-out w-2/3 self-center sm:w-2/5 bg-primary-blue p-2 rounded-md text-base font-semibold text-white focus:bg-primary-hoverblue"
              type="submit"
              disabled={isSubmitting}
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
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
        <Select
          id="color"
          placeholder="Select Materials"
          options={selectoptions}
          styles={customStyles}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          isMulti
          backspaceRemovesValue
          closeMenuOnSelect={false}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              neutral0: "#f3f4f6",
              primary: "#d1d5db",
              neutral50: "#9ea6b2",
            },
          })}
        />
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
