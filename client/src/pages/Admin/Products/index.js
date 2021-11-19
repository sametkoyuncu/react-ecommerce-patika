import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import moment from 'moment'
import { fetchProductList, deleteProduct } from '../../../api'
import { Table, Popconfirm } from 'antd'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

function Products() {
  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery(
    'admin:products',
    fetchProductList
  )

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products'),
  })

  const columns = useMemo(() => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => moment(date).format('DD/MMM/YYYY'),
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteMutation.mutate(record._id)
              }}
              placement="top"
            >
              <a href="#" style={{ marginLeft: 10 }}>
                Delete
              </a>
            </Popconfirm>
          </>
        ),
      },
    ]
  }, [])

  if (isLoading) {
    return <div>Loading..</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Products
      </Typography>
      <Table dataSource={data} columns={columns} rowKey="_id" />;
    </div>
  )
}

export default Products
