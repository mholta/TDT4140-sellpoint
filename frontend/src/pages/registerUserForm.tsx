import { Field, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/fields/InputField';

function RegisterForm() {
  return (
    <Formik
      onSubmit={(data) => {
        console.log(data);
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            placeholder="Fornavn"
            component={InputField}
          />
          <Field
            name="lastName"
            placeholder="Etternavn"
            component={InputField}
          />
          <Field
            name="email"
            placeholder="E-postadresse"
            component={InputField}
          />
          <Field
            name="phoneNumber"
            placeholder="Mobilnummer"
            component={InputField}
          />
          <Field
            name="password"
            placeholder="Passord"
            type="password"
            component={InputField}
          />
          <button type="submit">Registrer</button>
        </form>
      )}
    </Formik>
  );
}

export default RegisterForm;
