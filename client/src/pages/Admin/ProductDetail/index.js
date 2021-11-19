import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchProductById, updateProduct } from '../../../api'
import { Formik, FieldArray } from 'formik'
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

function ProductDetail() {
  const { product_id } = useParams()
  const { isLoading, isError, data, error } = useQuery(
    ['admin:product', product_id],
    () => fetchProductById(product_id)
  )
  if (isLoading) {
    return <div>Loading..</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
  const handleSubmit = async (values, bag) => {
    message.loading({ content: 'Updating...', key: 'product_update' })

    try {
      await updateProduct(values, product_id)
      message.success({
        content: `'${values.title}' successfully updated.`,
        key: 'product_update',
        duration: 2,
      })
    } catch (e) {
      message.error(`'${values.title}' does not updated.`)
    }
  }
  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Edit: {data.title}
      </Typography>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
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
                      error={errors.title}
                      helperText={errors.title}
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
                      error={errors.description}
                      helperText={errors.description}
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
                      error={errors.price}
                      helperText={errors.price}
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
                    Update
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

export default ProductDetail
