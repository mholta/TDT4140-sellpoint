import React, { useState } from 'react';
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
import { CircularProgress, FormControl, InputLabel } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';

/**
 * Variable holding Yup-object for form validation.
 */
const validationSchema = yup.object({
  title: yup.string().required('Produkttittel er påkrevd.'),
  description: yup.string().required('Beskrivelse er påkrevd.'),
});

/**
 * Add new product form.
 *
 * Sends user data with HTTP POST to backend.
 */
const NewProductForm = () => {
  const history = useHistory();
  const userState = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<any | null>(null);
  const [categoryId, setCategoryId] = useState<any | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      /* Generate valid Product object for sending to backend */
      console.log(data, image);

      /* Performing HTTP POST to backend using axios library */
      if (image && categoryId) {
        const product: ProductDb = {
          title: data.title,
          description: data.description,
          image: image,
          ownerId: userState.isLoggedIn ? userState.userData.id : '',
          price: Number(data.price),
          categoryId: categoryId,
        };
        console.log(product);
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
      }
    },
  });

  const handleDropzoneChange = (e: any) => {
    if (e.length > 0) {
      const reader = new FileReader();
      console.log('Hei');
      reader.readAsDataURL(e[0]);
      reader.onload = (event: any) => {
        setImage(event.target?.result);
      };
    }
  };

  const categoryService = GetReqApiService(
    'http://127.0.0.1:8000/category/all/'
  );

  const handleCategoryChange = (e: any) => {
    setCategoryId(e.target.value);
  };

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
        {categoryService.status === LoadStates.LOADING && <CircularProgress />}
        {categoryService.status === LoadStates.LOADED && (
          <FormControl fullWidth>
            <InputLabel id="category">Kategori</InputLabel>
            <Select
              id="category"
              name="category"
              onChange={handleCategoryChange}
            >
              {categoryService.payload.map((category: any) => (
                <MenuItem value={category.id}>{category.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {categoryService.status === LoadStates.ERROR && <div>Error</div>}
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
        <DropzoneArea
          onChange={handleDropzoneChange}
          maxFileSize={5000000}
          showPreviews={true}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Opprett produkt
        </Button>
      </form>{' '}
    </div>
  );
};

export default NewProductForm;
