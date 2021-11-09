import React from 'react'
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

function Card() {
  return (
    <CardMui>
      <CardMedia
        component="img"
        height="140"
        image="https://vetrehberi.com/wp-content/uploads/2018/11/bukalemunlar-chamaeleonidae.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          9 Kasım 2021
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Macbook Pro
        </Typography>
        <Typography variant="body2" color="text.secondary">
          10000 TL
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={22}>
          <IconButton color="secondary" aria-label="add to shopping cart">
            <AddShoppingCartOutlinedIcon />
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
