import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import moment from 'moment'
import ImageGallery from 'react-image-gallery'
import { fetchProductById } from '../../api.js'
// mui
import { Container, Grid, Typography, Button, IconButton } from '@mui/material'
// icons
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
//contexts
import { useCart } from '../../contexts/CartContext'

function ProductDetail() {
  const { product_id } = useParams()
  const { addToCart, items } = useCart()
  const { isLoading, error, data } = useQuery(['product', product_id], () =>
    fetchProductById(product_id)
  )
  if (isLoading) {
    return 'Loading...'
  }

  if (error) {
    return 'An error has occurred: ' + error.message
  }

  const findCartItem = items.find((item) => item._id === data._id)
  let icon

  if (findCartItem) {
    icon = <ShoppingCartIcon />
  } else {
    icon = <AddShoppingCartOutlinedIcon />
  }

  const images = data.photos.map((url) => ({ original: url, thumbnail: url }))

  return (
    <Container>
      <Grid container spacing={2} columns={{ xs: 12, sm: 6, md: 3 }}>
        <Grid
          item
          xs={6}
          style={{
            backgroundColor: '#eeeeef',
            paddingRight: 16,
            paddingBottom: 16,
          }}
        >
          <ImageGallery items={images} />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h3" color="black" component="div">
            {data.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {moment(data.createdAt).format('DD/MMM/YYYY')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data.description}
          </Typography>
          <br />
          <Typography variant="h5" color="black">
            {data.price} ₺
          </Typography>
          <br />
          <Button
            onClick={() => addToCart(data, findCartItem)}
            variant={findCartItem ? 'contained' : 'outlined'}
            color="warning"
            startIcon={icon}
            style={{ marginRight: 5 }}
            disableElevation
          >
            {findCartItem ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
          <IconButton color="error" aria-label="add to favorites list">
            <FavoriteBorderIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetail
