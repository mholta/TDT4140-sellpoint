import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { ProductDb } from '../../../components/api/types';
import { useHistory } from 'react-router-dom';
import RootRoutes from '../../RootRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';

/**
 * Variable holding Yup-object for form validation.
 */
const validationSchema = yup.object({
  title: yup.string().required('Produkttittel er påkrevd.'),
  description: yup.string().required('Beskrivelse er påkrevd.'),
  image: yup.string().required('Du må legge til et bilde.'),
});

/**
 * Add new product form.
 *
 * Sends user data with HTTP POST to backend.
 */
const NewProductForm = () => {
  const history = useHistory();
  const userState = useSelector((state: RootState) => state.user);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      /* Generate valid Product object for sending to backend */
      const product: ProductDb = {
        title: data.title,
        description: data.description,
        image: data.image,
        price: 100,
        email: userState.isLoggedIn? userState.userData.email:'',
      };

      console.log('Submitted form data:', data);

      /* Performing HTTP POST to backend using axios library */
      axios
        .post<ProductDb>('http://localhost:8000/product/', product)
        /* TODO: Remove response from console */
        .then((response) => console.log('HTTP POST response', response))
        /* If POST was success, redirect to user profile view */
        .then(() => {
          history.push(RootRoutes.userView);
        })
        .catch((error) => {
          console.error(error);
          // TODO: Add custom alert
          alert('Bilde må være en url.');
        });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Tittel"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          multiline
          id="description"
          name="description"
          label="Beskrivelse"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          fullWidth
          id="image"
          name="image"
          label="Bilde"
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Opprett produkt
        </Button>
      </form>
    </div>
  );
};

export default NewProductForm;

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
