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

// ----------------------------------------------------------------------

export default function foodOrderForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    orderCode: Yup.string().required('First name required'),
    userid: Yup.string().required(' required'),
    foodid: Yup.string().required('required'),
    restaurantid:Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required(' required'),
    deliverCharge: Yup.string().required('required'),
    amount: Yup.string().required(' required'),
    totalAmount:Yup.string().required(' required')
  });

  const formik = useFormik({
    initialValues: {
      orderCode: '',
      userid: '',
      foodid: '',
      restaurantid: '',
      deliveryCharge:'',
      amount:'',
      amount:'',
      totalAmount:''
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
              label="Food Name"
              {...getFieldProps('restaurantid')}
              error={Boolean(touched.foodid && errors.foodid)}
              helperText={touched.foodid && errors.foodid}
            />

            <TextField
              fullWidth
              label="Amount"
              {...getFieldProps('amount')}
              error={Boolean(touched.amount && errors.amount)}
              helperText={touched.amount && errors.amount}
            />
          </Stack>
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
