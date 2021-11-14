import React from 'react'
import Card from '../../components/Card'
import { Container, Grid, Button } from '@mui/material'
import { useInfiniteQuery } from 'react-query'
import { fetchProductList } from '../../api.js'

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('products', fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePageExist = lastGroup?.length === 12 //backend'ten 12 adet geliyor

      if (!morePageExist) {
        return
      }

      return allGroups.length + 1
    },
  })

  if (status === 'loading') return 'Loading...'

  if (status === 'error') return 'An error has occurred: ' + error.message

  return (
    <div>
      <Container>
        <Grid container spacing={2} columns={{ xs: 12, sm: 6, md: 3 }}>
          {/* {data.map((product, key) => (
            <Grid item>
              <Card key={key} product={product} />
            </Grid>
          ))} */}
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((product) => (
                <Grid item>
                  <Card key={product._id} product={product} />
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          style={{ margin: 10 }}
        >
          <Button
            color="secondary"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </Button>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </Grid>
      </Container>
    </div>
  )
}

export default Products
