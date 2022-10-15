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
import { string } from 'prop-types';

// ----------------------------------------------------------------------

export default function FoodForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    restaurantid: Yup.string().required('First name required'),
    foodName: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required(' required'),
    foodImage: Yup.string().min(9,'Must be 10 digit').max(11,'Must Be 10 digit').required('required'),
    description:Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required(' required'),
    price:Yup.string().required('required')
  });

  const formik = useFormik({
    initialValues: {
      restaurantid: '',
      foodName: '',
      foodImage: '',
      description: '',
      price:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
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
              {...getFieldProps('restaurantid')}
              error={Boolean(touched.restaurantid && errors.restaurantid)}
              helperText={touched.restaurantid && errors.restaurantid}
            />

            <TextField
              fullWidth
              label="Food  Name"
              {...getFieldProps('foodName')}
              error={Boolean(touched.foodName && errors.foodName)}
              helperText={touched.foodName && errors.foodName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="foodImage"
            label="Food Image"
            {...getFieldProps('foodImage')}
            error={Boolean(touched.foodImage && errors.foodImage)}
            helperText={touched.foodImage && errors.foodImage}
          />
         <TextField
            fullWidth
            autoComplete="Description"
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
        
        
          />
            <TextField
            fullWidth
            autoComplete="Price"
            label="Price"
            {...getFieldProps('price')}
            error={Boolean(touched.price && errors.price)}
            helperText={touched.price && errors.price}
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
