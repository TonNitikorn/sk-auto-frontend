import React, { useState, useEffect } from "react";
import Layout from '../theme/Layout'
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Paper
} from "@mui/material";
import scbL from "../assets/scbL.png";
import Image from "next/image";


function history() {
  const [price, setPrice] = useState(0)
  return (
    <Layout page="history">
      <Box sx={{ m: 3, mt: 10, mb: 10 }}>
        <Card sx={{
          mt: 1,
          borderRadius: 3,
          bgcolor: '#78BEFF',
          border: "2px solid #41A3E3"

        }}>
          <CardContent>
            <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={5}>
                <Box sx={{ mt: 1, ml: 3 }}>
                  <Image src={scbL} alt="scb" />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography sx={{ color: 'white', mb: '2px', mt: 1 }}>SCB (ไทยพาณิชย์)</Typography>
                <Typography sx={{ color: 'white', mb: '2px' }}>095-2-78718-8</Typography>
                <Typography sx={{ color: 'white' }}>ผู้ใช้ ผู้ใช้</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Typography sx={{ fontWeight: 'bold', mt: 3 }}>ประวัติรายการย้อนหลัง</Typography>

        <Paper sx={{ mt: 1, borderRadius: 5 }}>
          <Grid container justifyContent="space-between" sx={{ p: 2, bgcolor: '#F1F1F1', borderRadius: "20px 20px 0px 0px" }}>
            <Typography>เติมเครดิต</Typography>
            <Typography sx={{ color: "green", fontWeight: "bold" }}>
              +{Intl.NumberFormat("THB").format(10000)}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ bgcolor: "#D9D9D9", p: 1, borderRadius: "0px 0px 20px 20px" }}
          >
            22 ก.ย. | 07:47
          </Grid>
        </Paper>

        <Paper sx={{ mt: 2, borderRadius: 5 }}>
          <Grid container justifyContent="space-between" sx={{ p: 2, bgcolor: '#F1F1F1', borderRadius: "20px 20px 0px 0px" }}>
            <Typography>เติมเครดิต</Typography>
            <Typography sx={{ color: "green", fontWeight: "bold" }}>
              +{Intl.NumberFormat("THB").format(5000)}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ bgcolor: "#D9D9D9", p: 1, borderRadius: "0px 0px 20px 20px" }}
          >
            21 ก.ย. | 08:30
          </Grid>
        </Paper>
        <Paper sx={{ mt: 2, borderRadius: 5 }}>
          <Grid container justifyContent="space-between" sx={{ p: 2, bgcolor: '#F1F1F1', borderRadius: "20px 20px 0px 0px" }}>
            <Typography>ถอนเครดิต</Typography>
            <Typography sx={{ color: "#D2042D", fontWeight: "bold" }}>
              - {Intl.NumberFormat("THB").format(3000)}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ bgcolor: "#D9D9D9", p: 1, borderRadius: "0px 0px 20px 20px" }}
          >
            20 ก.ย. | 11:53
          </Grid>
        </Paper>

        <Paper sx={{ mt: 2, borderRadius: 5 }}>
          <Grid container justifyContent="space-between" sx={{ p: 2, bgcolor: '#F1F1F1', borderRadius: "20px 20px 0px 0px" }}>
            <Typography>ถอนเครดิต</Typography>
            <Typography sx={{ color: "#D2042D", fontWeight: "bold" }}>
              - {Intl.NumberFormat("THB").format(3000)}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ bgcolor: "#D9D9D9", p: 1, borderRadius: "0px 0px 20px 20px" }}
          >
            20 ก.ย. | 11:53
          </Grid>
        </Paper>
        <Paper sx={{ mt: 2, borderRadius: 5 }}>
          <Grid container justifyContent="space-between" sx={{ p: 2, bgcolor: '#F1F1F1', borderRadius: "20px 20px 0px 0px" }}>
            <Typography>ถอนเครดิต</Typography>
            <Typography sx={{ color: "#D2042D", fontWeight: "bold" }}>
              - {Intl.NumberFormat("THB").format(3000)}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ bgcolor: "#D9D9D9", p: 1, borderRadius: "0px 0px 20px 20px" }}
          >
            20 ก.ย. | 11:53
          </Grid>
        </Paper>
        <Paper sx={{ mt: 2, borderRadius: 5 }}>
          <Grid container justifyContent="space-between" sx={{ p: 2, bgcolor: '#F1F1F1', borderRadius: "20px 20px 0px 0px" }}>
            <Typography>ถอนเครดิต</Typography>
            <Typography sx={{ color: "#D2042D", fontWeight: "bold" }}>
              - {Intl.NumberFormat("THB").format(3000)}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ bgcolor: "#D9D9D9", p: 1, borderRadius: "0px 0px 20px 20px" }}
          >
            20 ก.ย. | 11:53
          </Grid>
        </Paper>


      </Box>
    </Layout>
  )
}

export default history