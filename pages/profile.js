import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Skeleton,
  IconButton,

} from "@mui/material";
import Layout from '../theme/Layout';
import SearchIcon from '@mui/icons-material/Search';
function profile() {
  return (
    <Layout>
      <Box sx={{
        mt: 10, background: "linear-gradient(#fff, #AFECFF )"
      }}>
        <Typography sx={{ p: 10 }}>LOGO</Typography>
      </Box>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center' }}>
        <Grid item xs={6} sx={{ bgcolor: '#62AEF4', color: '#fff' }}>ยอดฝาก <Typography>50,000</Typography></Grid>
        <Grid item xs={6} sx={{ bgcolor: '#A1D2FF', color: '#144069' }}>ยอดถอน <Typography>150,000</Typography></Grid>
      </Grid>


      <Box sx={{ border: '2px solid #41A3E3', borderRadius: 5, m: 4, p: 3 }}>
        <Grid container>
          <Grid item xs={6}>
            ชื่อ
          </Grid>
          <Grid item xs={6}>
            สมหมาย ใจดี
          </Grid>
          <Grid item xs={6} sx={{ mt: 1 }}>
            โทรศัพท์
          </Grid>
          <Grid item xs={6} sx={{ mt: 1 }}>
            0987654321
          </Grid>
          <Grid item xs={6} sx={{ mt: 1 }}>
            ธนาคาร
          </Grid>
          <Grid item xs={6} sx={{ mt: 1 }}>
            scb
          </Grid>
          <Grid item xs={6} sx={{ mt: 1 }}>
            หมายเลขธนาคาร
          </Grid>
          <Grid item xs={6} sx={{ mt: 1 }}>
            1452-52-4521
          </Grid>
        </Grid>
        <Grid container
          direction="row"
          sx={{ textAlign: 'center', mt: 1 }}>
          <SearchIcon sx={{ mt: 1, color: '#41A3E3' }} /><Button variant='text'><Typography sx={{ textDecoration: 'underline' }}>ประวัติการเล่นเกม</Typography></Button>
        </Grid>

      </Box>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={6}>
          <Button
            fullWidth
            variant='contained'
            sx={{ mb: 5 }}
            onClick={() => { }}
          >
            <Typography sx={{ color: 'white' }}>เปลี่ยนรหัสผ่าน</Typography>

          </Button>
        </Grid>
      </Grid>
    </Layout>

  )
}

export default profile
