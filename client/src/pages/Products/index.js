import Card from '../../components/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useQuery } from 'react-query'
import { fetchProductList } from '../../api.js'

function Products() {
  const { isLoading, error, data } = useQuery('products', fetchProductList)

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <Container>
        <Grid container spacing={2} columns={{ xs: 12, sm: 6, md: 3 }}>
          {data.map((product, key) => (
            <Grid item>
              <Card key={key} product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default Products
