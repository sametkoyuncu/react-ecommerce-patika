import { useState } from 'react'
import { Link } from 'react-router-dom'
//contexts
import { useCart } from '../../contexts/CartContext'
//api
import { postOrder } from '../../api.js'
//mui
import {
  Alert,
  Container,
  Avatar,
  Button,
  Box,
  Modal,
  TextField,
  Grid,
} from '@mui/material'
//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PaymentIcon from '@mui/icons-material/Payment'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function Cart() {
  const { items, removeFromCart, emptyCart } = useCart()
  const total = items.reduce((acc, item) => (acc += item.price), 0)

  //modal things
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [address, setAddress] = useState()
  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id)

    const input = {
      address,
      items: JSON.stringify(itemIds),
    }
    await postOrder(input)
    setOpen(false)
    setAddress('')
    emptyCart()
  }
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
          <Box mt={5}>
            <span style={{ marginRight: 10 }}>Total:{total} TL</span>
            <Button
              onClick={handleOpen}
              variant="contained"
              color="secondary"
              startIcon={<PaymentIcon />}
              style={{ marginRight: 5 }}
              disableElevation
            >
              Order
            </Button>
          </Box>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Address"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            style={{ minWidth: 400 }}
          />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            style={{ marginTop: 10 }}
          >
            <Button
              onClick={handleSubmitForm}
              variant="contained"
              color="secondary"
              style={{ marginRight: 5 }}
            >
              Okay
            </Button>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default Cart
