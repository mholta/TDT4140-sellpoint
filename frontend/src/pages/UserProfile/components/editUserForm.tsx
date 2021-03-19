import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { User } from '../../../components/api/types';
import { useHistory } from 'react-router-dom';
import RootRoutes from '../../RootRoutes';
import { setUser } from '../../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import DeleteUser from './deleteUserButton';
import { Box } from '@material-ui/core';

interface EditUserFormProps {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  latitude: number;
  longitude: number;
}

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
  password: yup.string(),
});

/**
 * Register new user form.
 *
 * Sends user data with HTTP POST to backend.
 */
const EditUserForm = ({
  id,
  email,
  firstName,
  lastName,
  phoneNumber,
  latitude,
  longitude,
}: EditUserFormProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      /* Generate user object to send */
      const user: User = {
        id: id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phoneNumber,
        password: data.password,
        latitude: latitude,
        longitude: longitude,
      };

      axios
        .put<any>('http://127.0.0.1:8000/user/', user)
        .then((response) => response.data)
        .then((response) => {
          dispatch(
            setUser({
              isLoggedIn: true,
              userData: {
                id: response.id,
                firstName: response.first_name,
                lastName: response.last_name,
                email: response.email,
                phoneNumber: response.phone_number,
                latitude: response.latitude,
                longitude: response.longitude,
              },
            })
          );
          setTimeout(() => history.push(RootRoutes.userView, 500));
        })
        .catch((error) => {
          alert('Brukernavn eller passord er feil');
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
          label="Nytt passord"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Box mt={1}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Lagre endringer
          </Button>
        </Box>
      </form>

      <DeleteUser id={id} />
    </div>
  );
};

export default EditUserForm;

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
