import { useQuery } from 'react-query'
import { fetchOrders } from '../../../api'
//mui
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function Orders() {
  const { isLoading, isError, data, error } = useQuery(
    'admin:orders',
    fetchOrders
  )

  if (isLoading) {
    return <div>Loading..</div>
  }

  if (isError) {
    return <div>Error {error.message}</div>
  }

  console.log(data)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.user.email}
              </TableCell>
              <TableCell align="right">{order.adress}</TableCell>
              <TableCell align="right">{order.items.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Orders
