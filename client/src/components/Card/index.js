import moment from 'moment'
import { Link } from 'react-router-dom'
import CardMui from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Stack from '@mui/material/Stack'

//selected icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
//contexts
import { useCart } from '../../contexts/CartContext'

function Card({ product }) {
  const { addToCart, items } = useCart()
  const findCartItem = items.find((item) => item._id === product._id)
  let icon

  if (findCartItem) {
    icon = <ShoppingCartIcon />
  } else {
    icon = <AddShoppingCartOutlinedIcon />
  }

  return (
    <CardMui>
      <Link to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={product.photos[0]}
          alt={product.title}
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {moment(product.createdAt).format('DD/MMM/YYYY')}
          </Typography>
          <Typography gutterBottom variant="h5" color="black" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price} ₺
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Stack direction="row" spacing={22}>
          <IconButton
            onClick={() => addToCart(product, findCartItem)}
            color={findCartItem ? 'error' : 'secondary'}
            aria-label="add to shopping cart"
          >
            {icon}
          </IconButton>
          <IconButton color="error" aria-label="add to shopping cart">
            <FavoriteBorderIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </CardMui>
  )
}

export default Card
