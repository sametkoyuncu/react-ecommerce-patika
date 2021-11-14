import { Button, Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

function Error404() {
  return (
    <Container>
      <Grid container direction="row" justifyContent="center">
        <img
          src="https://i.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.webp"
          alt="not found"
        />
      </Grid>

      <Grid container direction="row" justifyContent="center">
        <Link to="/">
          <Button variant="outlined" color="error">
            Back to Home
          </Button>
        </Link>
      </Grid>
    </Container>
  )
}

export default Error404
