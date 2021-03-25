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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel } from '@material-ui/core';

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
      price: '',
      description: '',
      image: '',
      categoryId: '',
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      /* Generate valid Product object for sending to backend */
      const product: ProductDb = {
        title: data.title,
        description: data.description,
        image: data.image,
        ownerId: userState.isLoggedIn ? userState.userData.id : '',
        price: Number(data.price),
        categoryId: data.categoryId,
      };

      /* Performing HTTP POST to backend using axios library */
      axios
        .post<ProductDb>('http://localhost:8000/product/', product)
        /* TODO: Remove response from console */
        .then((response) => console.log('HTTP POST response', response))
        /* If POST was success, redirect to individual home page */
        .then(() => {
          history.push(RootRoutes.homePage);
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
        <FormControl fullWidth>
          <InputLabel id="category">Kategori</InputLabel>
          <Select id="category" name="category" onChange={formik.handleChange}>
            <MenuItem value={10}>Bil</MenuItem>
            <MenuItem value={20}>Klær</MenuItem>
            <MenuItem value={30}>Hjem</MenuItem>
            <MenuItem value={40}>Hage</MenuItem>
            <MenuItem value={50}>Elektronikk</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="price"
          name="price"
          label="Pris"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          fullWidth
          rows="6"
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
