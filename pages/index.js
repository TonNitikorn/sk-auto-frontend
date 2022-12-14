import { Typography } from '@mui/material'
import Image from 'next/image'
import withAuth from '../routes/withAuth'
import Layout from '../theme/Layout'


function index() {
  return (
    <>
      home
    </>
  )
}

// export default index
export default withAuth(index)
