import React, { useEffect, useState } from "react";
import { Formik, Form, Field, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./attentForm.css";
import axios from "axios";
import Modal from "../../Modal/Modal";

const AttendanceForm = () => {
  const [countries, setCountries] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Inscríbete");
  const attendance = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    jobPosition: "",
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .min(2, "¡Demasiado corto!")
      .max(40, "¡Demasiado largo!")
      .required("Requerido"),
    lastName: Yup.string()
      .trim()
      .min(2, "¡Demasiado corto!")
      .max(40, "¡Demasiado largo!")
      .required("Requerido"),
    email: Yup.string().trim().email("¡Email invalido!").required("Requerido"),
    country: Yup.string().trim().required("Requerido"),
    phone: Yup.string()
      .trim()
      .min(10, "¡Demasiado corto!")
      .max(16, "¡Demasiado largo!")
      .required("Requerido"),
    jobPosition: Yup.string()
      .trim()
      .min(5, "¡Demasiado corto!")
      .max(50, "¡Demasiado largo!")
      .required("Requerido"),
  });

  useEffect(() => {
    const getCountry = async () => {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      let orderedCountries = await res.data.map(country => {
        if (
          country.idd.root === undefined &&
          country.idd.suffixes === undefined
        ) {
          return `${country.name.common}`;
        } else {
          return `${country.name.common} ${country.idd.root}${country.idd.suffixes[0]}`;
        }
      });
      setCountries(orderedCountries.sort());
    };
    try {
      getCountry();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlerSubmit = async values => {
    try {
      setMessage("Enviando...");
      const res = await axios.post(
        "https://the8agency.herokuapp.com/attendance",
        values
      );
      if (res.status === 201) {
        setVisible(true);
        setMessage("Inscripto");
      }
    } catch (error) {
      console.log(error);
      setMessage("Intenta más tarde");
    }
  };

  return (
    <div className="container-attent">
      <h3>¡Inscríbete y reserva tu lugar ahora!</h3>
      <Formik
        initialValues={attendance}
        onSubmit={handlerSubmit}
        validationSchema={SignupSchema}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="container-attent-form-box">
              <label>Nombre</label>
              <Field
                className="container-attent-form-box__field"
                type="text"
                name="firstName"
                values={values.firstName}
                onChange={handleChange}
              />
              <ErrorMessage name="firstName">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="container-attent-form-box">
              <label>Apellido</label>
              <Field
                className="container-attent-form-box__field"
                type="text"
                name="lastName"
                values={values.lastName}
                onChange={handleChange}
              />
              <ErrorMessage name="lastName">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="container-attent-form-box">
              <label>Correo electrónico del trabajo</label>
              <Field
                className="container-attent-form-box__field"
                type="email"
                name="email"
                values={values.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="container-attent-form-box">
              <label>País</label>
              <Field
                className="container-attent-form-box__field"
                as="select"
                name="country"
                values={values.country}
                onChange={handleChange}
              >
                <option value=""></option>
                {countries.map((country, index) => {
                  const countryName = country.split(" ");
                  return (
                    <option value={countryName[0]} key={index}>
                      {country}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage name="country">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="container-attent-form-box">
              <label>Número de telefono</label>
              <Field
                className="container-attent-form-box__field"
                type="tel"
                name="phone"
                values={values.phone}
                onChange={handleChange}
              />
              <ErrorMessage name="phone">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="container-attent-form-box">
              <label>Puesto de trabajo</label>
              <Field
                className="container-attent-form-box__field"
                type="text"
                name="jobPosition"
                values={values.jobPosition}
                onChange={handleChange}
              />
              <ErrorMessage name="jobPosition">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
            <button
              className={message === "inscripto" ? "disabled" : null}
              type="submit"
            >
              {message}
            </button>
            <Modal
              visible={visible}
              setVisible={setVisible}
              firstName={values.firstName}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AttendanceForm;
