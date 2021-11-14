import { Link } from 'react-router-dom'
//contexts
import { useCart } from '../../contexts/CartContext'
//mui
import { Alert, Container, Avatar, Button, Box } from '@mui/material'
//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

function Cart() {
  const { items, removeFromCart } = useCart()
  const total = items.reduce((acc, item) => (acc += item.price), 0)
  return (
    <div>
      {items.length < 1 && (
        <Container style={{ marginTop: 20 }}>
          <Alert severity="warning">You have not any item in your cart.</Alert>
        </Container>
      )}
      {items.length > 0 && (
        <Box p={5}>
          <ul style={{ listStyleType: 'decimal' }}>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: 20 }}>
                <Link to={`/product/${item._id}`}>
                  {item.title} - {item.price} TL
                  <Avatar
                    variant="square"
                    alt={item.title}
                    src={item.photos[0]}
                    sx={{ width: 56, height: 56 }}
                  />
                </Link>
                <Button
                  onClick={() => removeFromCart(item)}
                  variant="contained"
                  color="warning"
                  startIcon={<ShoppingCartIcon />}
                  style={{ marginRight: 5 }}
                  disableElevation
                >
                  Remove from Cart
                </Button>
              </li>
            ))}
          </ul>
          <Box ml={3} mt={10}>
            Total:{total} TL
          </Box>
        </Box>
      )}
    </div>
  )
}

export default Cart
