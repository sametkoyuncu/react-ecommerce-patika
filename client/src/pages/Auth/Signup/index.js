import { useState } from 'react'
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
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import SaveIcon from '@mui/icons-material/Save'

function Signup() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
    showPasswordConfirm: false,
  })

  const handleSubmit = () => {
    setValues({ ...values })
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

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

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        style={{ margin: 10 }}
      >
        <Box
          component="form"
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
            value={values.email}
            onChange={handleChange('email')}
            label="E-Mail"
            variant="outlined"
            color="secondary"
            style={{ minWidth: 300 }}
          />
          <br />
          <FormControl
            variant="outlined"
            color="secondary"
            style={{ minWidth: 300 }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
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
          >
            <InputLabel htmlFor="outlined-adornment-passwordConfirm">
              Password Confirm
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-passwordConfirm"
              type={values.showPasswordConfirm ? 'text' : 'password'}
              value={values.passwordConfirm}
              onChange={handleChange('passwordConfirm')}
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
            onClick={handleSubmit}
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<SaveIcon />}
            disabled={
              values.email === '' ||
              values.password === '' ||
              values.passwordConfirm === ''
            }
          >
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}

export default Signup
