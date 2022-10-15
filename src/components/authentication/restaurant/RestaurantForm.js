import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios'
import API_URL from 'src/pages/constant1';

// ----------------------------------------------------------------------

export default function RestaurantForm() {
  const navigate = useNavigate();
  
  const RegisterSchema = Yup.object().shape({
    userid: Yup.string().required('First name required'),
    restaurantName: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required(' required'),
    phoneNumber: Yup.string().min(9,'Must be 10 digit').max(11,'Must Be 10 digit').required('required'),
    completAdress:Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required(' required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    ownerName: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required(' required'),
    tinNumber:Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required(' required'),
    latitude:Yup.string().required('required'),
    longitude:Yup.string().required('required')
  });

  const formik = useFormik({
    initialValues: {
      userid: '',
      restaurantName: '',
      phoneNumber: '',
      completAdress: '',
      email:'',
      ownerName:'',
      tinNumber:'',
      latitude:'',
      longitude:''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios.post(`${API_URL}/restaurant/add`,{
        userid:data.userid,
        restaurantName:data.restaurantName,
        phoneNumber:data.phoneNumber,
        completAdress:data.completAdress,
        email:data.email,
        ownerName:data.ownerName,
        tinNumber:data.tinNumber,
        latitude:data.latitude,
        longitude:data.longitude
      }).then((Response)=>{
        if(Response.data.Message==='Error'){
          alert('Server Error')
          window.location.reload()
        }else{
          alert('Data Added Successfully')
          window.location.reload()
        }
      })
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Restaurant Name"
              {...getFieldProps('restaurantName')}
              error={Boolean(touched.restaurantName && errors.restaurantName)}
              helperText={touched.restaurantName && errors.restaurantName}
            />

            <TextField
              fullWidth
              label="Phone Number"
              {...getFieldProps('phoneNumber')}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Stack>
          <TextField
            fullWidth
            autoComplete="userid"
            label="username"
            {...getFieldProps('userid')}
            error={Boolean(touched.userid && errors.userid)}
            helperText={touched.userid && errors.userid}
          />
          <TextField
            fullWidth
            autoComplete="completAdress"
            label="Address"
            {...getFieldProps('completAdress')}
            error={Boolean(touched.completAdress && errors.completAdress)}
            helperText={touched.completAdress && errors.completAdress}
          />
         <TextField
            fullWidth
            autoComplete="ownerName"
            label="owner Name"
            {...getFieldProps('ownerName')}
            error={Boolean(touched.ownerName && errors.ownerName)}
            helperText={touched.ownerName && errors.ownerName}
          />
          <TextField
            fullWidth
            autoComplete="tinNumber"
            label="Tin Number"
            {...getFieldProps('tinNumber')}
            error={Boolean(touched.tinNumber && errors.tinNumber)}
            helperText={touched.tinNumber && errors.tinNumber}
          />
            <TextField
            fullWidth
            autoComplete="latitude"
            label="Latitude"
            {...getFieldProps('latitude')}
            error={Boolean(touched.latitude && errors.latitude)}
            helperText={touched.latitude && errors.latitude}
          />
            <TextField
            fullWidth
            autoComplete="longitude"
            label="Longitude"
            {...getFieldProps('longitude')}
            error={Boolean(touched.longitude && errors.longitude)}
            helperText={touched.longitude && errors.longitude}
          />
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
