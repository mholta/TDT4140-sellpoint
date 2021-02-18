import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required.'),
  lastName: yup
  .string()
  .required('Last name is required.'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phoneNumber: yup
    .number()
    .required('Phone number is required.'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const RegisterForm = () => {
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
      console.log(data);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
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
          label="Password"
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
