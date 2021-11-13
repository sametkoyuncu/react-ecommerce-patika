import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material'
//icons
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SaveIcon from '@mui/icons-material/Save'
// others
import validationSchema from './validations.js'
import { useFormik } from 'formik'
import { fetchRegister } from '../../../api.js'
import { useAuth } from '../../../contexts/AuthContext'

function Signup() {
  const navigate = useNavigate()
  //auth context
  const { login } = useAuth()
  // formik events
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        })
        login(registerResponse)
        navigate('/profile')
      } catch (e) {
        bag.setErrors({ general: e.response.data.message })
      }
    },
  })

  // alert message
  useEffect(() => {
    if (formik.errors.general) setOpen(true)
  }, [formik.errors.general])

  // show password events
  const [values, setValues] = useState({
    showPassword: false,
    showPasswordConfirm: false,
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleClickShowPasswordConfirm = () => {
    setValues({
      ...values,
      showPasswordConfirm: !values.showPasswordConfirm,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault()
  }

  // snackbar events
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {formik.errors.general}
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="row"
        justifyContent="center"
        style={{ margin: 10 }}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          textAlign="center"
        >
          <Typography
            variant="h3"
            color="secondary"
            style={{ display: 'inline', marginBottom: 20 }}
          >
            Sign Up
          </Typography>
          <br />
          <br />
          <br />
          <TextField
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            label="E-Mail"
            variant="outlined"
            color="secondary"
            style={{ minWidth: 300 }}
            error={formik.errors.email}
            helperText={formik.errors.email}
          />
          <br />
          <FormControl
            variant="outlined"
            color="secondary"
            style={{ minWidth: 300 }}
            error={formik.touched.password && formik.errors.password}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br />
          <FormControl
            variant="outlined"
            color="secondary"
            style={{ minWidth: 300 }}
            error={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
          >
            <InputLabel htmlFor="outlined-adornment-passwordConfirm">
              Password Confirm
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-passwordConfirm"
              type={values.showPasswordConfirm ? 'text' : 'password'}
              name="passwordConfirm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password Confirm visibility"
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={handleMouseDownPasswordConfirm}
                    edge="end"
                  >
                    {values.showPasswordConfirm ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password Confirm"
            />
          </FormControl>
          <br />
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<SaveIcon />}
            disabled={!formik.isValid}
          >
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}

export default Signup
