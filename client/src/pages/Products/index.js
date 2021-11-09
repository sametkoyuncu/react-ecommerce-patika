import React from 'react'
import Card from '../../components/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

function Products() {
  const _arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div>
      <Container>
        <Grid
          container
          spacing={2}
          columns={{ xs: 12, sm: 6, md: 3 }}
          justifyContent="center"
        >
          {_arr.map(() => (
            <Grid item>
              <Card />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default Products
