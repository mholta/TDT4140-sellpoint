import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/user.actions';
import { useHistory } from 'react-router-dom';
import RootRoutes from '../../RootRoutes';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,

    onSubmit: (data) => {
      console.log(data);

      axios
        .post<any>('http://127.0.0.1:8000/user/', {
          email: data.email.toLowerCase(),
          password: data.password,
        })
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
          Logg inn
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

/*
import React from 'react';
import { Field, Form, Formik } from 'formik';
import { InputField } from '../../../components/fields/InputField';




 function LoginForm() {
  return (
    
    <Formik
      onSubmit={(data) => {
        console.log(data);
      }}
      initialValues={{
        email: '',
        password: '',
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit = { handleSubmit } >
          <Field
            name="email"
            placeholder="E-postadresse"
            component={ InputField }
          />
          <Field
            name="password"
            placeholder="Passord"
            type="password"
            component={InputField}
          />
          <button type="submit">Logg inn</button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
*/
