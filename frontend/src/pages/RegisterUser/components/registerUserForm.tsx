import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { User } from '../../../components/api/types';
import { useHistory } from 'react-router-dom';
import RootRoutes from '../../RootRoutes';

/**
 * Variable holding Yup-object for form validation.
 */
const validationSchema = yup.object({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phoneNumber: yup.number().required('Phone number is required.'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

/**
 * Register new user form.
 *
 * Sends user data with HTTP POST to backend.
 */
const RegisterForm = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      /* Generate valid User object for sending to backend */
      const user: User = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email.toLowerCase(),
        phone_number: data.phoneNumber,
        password: data.password,
      };

      console.log('Submitted form data:', data);

      /* Performing HTTP POST to backend using axios library */
      axios
        .post<User>('http://localhost:8000/user/post/', user)
        /* TODO: Remove response from console */
        .then((response) => console.log('HTTP POST response', response))
        /* If POST was success, redirect to login page */
        .then(() => {
          history.push(RootRoutes.loginUser);
        })
        .catch((error) => {
          console.log(error);
          // TODO: Add custom alert
          alert(
            'Det eksisterer allerede en bruker med epostadresse "' +
              data.email +
              '".\nPrøv å logg inn heller.'
          );
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="Fornavn"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Etternavn"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Epost"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Telefonnummer"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Passord"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Registrer
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;

/*import { Field, Formik } from 'formik';
import React from 'react';
import { InputField } from '../../../components/fields/InputField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

function RegisterForm() {
  const classes = useStyles();

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
        <form className={classes.root} onSubmit={ handleSubmit } >
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
*/
