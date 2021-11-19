import React from 'react'
import { postProduct } from '../../../api'
import { Formik, FieldArray } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import validationSchema from './validations'
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
} from '@mui/material'
import { message } from 'antd'

function NewProduct() {
  const queryClient = useQueryClient()
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products'),
  })

  const handleSubmit = async (values, bag) => {
    message.loading({ content: 'Adding...', key: 'product_add' })
    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    }
    newProductMutation.mutate(newValues, {
      onSuccess: () =>
        message.success({
          content: `'${values.title}' successfully added.`,
          key: 'product_add',
          duration: 2,
        }),
    })
  }
  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Create a Product
      </Typography>
      <Formik
        initialValues={{
          title: '',
          description: '',
          price: '',
          photos: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Grid
                container
                direction="column"
                alignItems="center"
                sx={{ m: 5, p: 5 }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid item sx={{ marginBottom: 5 }}>
                    <TextField
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      label="Title"
                      variant="outlined"
                      color="secondary"
                      style={{ width: '70vw' }}
                      disabled={isSubmitting}
                      error={touched.title && errors.title}
                      helperText={touched.title && errors.title}
                    />
                  </Grid>
                  <Grid item sx={{ marginBottom: 5 }}>
                    <TextField
                      multiline
                      minRows={4}
                      maxRows={8}
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      label="Description"
                      variant="outlined"
                      color="secondary"
                      style={{ width: '70vw' }}
                      disabled={isSubmitting}
                      error={touched.description && errors.description}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid item sx={{ marginBottom: 5 }}>
                    <TextField
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      label="Price"
                      variant="outlined"
                      color="secondary"
                      style={{ width: '70vw' }}
                      disabled={isSubmitting}
                      error={touched.price && errors.price}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>
                  <Grid item sx={{ marginBottom: 5 }}>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <TextField
                                  name={`photos.${index}`}
                                  value={photo}
                                  label={`Photo ${index + 1}`}
                                  variant="outlined"
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  sx={{ mb: 2, width: '60vw' }}
                                />
                                <Button
                                  variant="outlined"
                                  color="error"
                                  sx={{ ml: 2, mt: 1 }}
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}

                          <Button
                            variant="outlined"
                            color="success"
                            sx={{ width: '60vw' }}
                            size="small"
                            onClick={() => arrayHelpers.push('')}
                          >
                            Add a photo
                          </Button>
                        </div>
                      )}
                    />
                  </Grid>
                  <Divider />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    disableElevation
                  >
                    Save
                  </Button>
                </form>
              </Grid>
            </Box>
          </>
        )}
      </Formik>
    </div>
  )
}

export default NewProduct
