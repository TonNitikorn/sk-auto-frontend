import React, { useState, useEffect } from "react";
import Layout from '../theme/Layout'
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField
} from "@mui/material";
import scbL from "../assets/scbL.png";
import Image from "next/image";


function withdraw() {
  const [price, setPrice] = useState(0)
  return (
    <Layout page="withdraw">
      <Box sx={{ m: 5 }}>
        <Card sx={{
          display: { xs: "block", md: "none" },
          borderRadius: 3, background: "linear-gradient(#7BBDFA, #62AEF4, #0072B1 )"
        }}>
          <CardContent>
            <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={5}>
                <Box sx={{ mt: 1, ml: 2 }}>
                  <Image src={scbL} alt="scb" />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography sx={{ color: 'white' }}>SCB (ไทยพาณิชย์)</Typography>
                <Typography sx={{ color: 'white' }}>095-2-78718-8</Typography>
                <Typography sx={{ color: 'white' }}>ผู้ใช้ ผู้ใช้</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>ถอนเครดิต</Typography>
        <Typography sx={{ fontSize: '12px' }}>เลือกจำนวนเครดิต</Typography>

        <Grid container spacing={2} sx={{mt:2}}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(100)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              >
                100
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(200)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              >
                200
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(300)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              >
                300
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(500)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              >
                500
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(1000)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              >
                1000
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setPrice(2000)}
              sx={{ p: 1, bgcolor: "#fff" }}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              >
                2000
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(5000)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              >
                5000
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(10000)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              >
                10000
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 4 }}>
          ระบุจำนวนที่ต้องการถอน
        </Typography>
        <TextField
          name="code"
          type="number"
          fullWidth
          value={price || ""}
          size="medium"
          sx={{ bgcolor: "#fff", borderRadius: 2, fontWeight: "bold" }}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
        />
        <Typography sx={{ color: "#aaa", mt: 1, mb: 2, fontSize: "12px" }}>
        ถอนไม่มีขั้นต่ำ
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => handelwithdraw()}
          sx={{
            mt: 5,
            bgcolor: "#41A3E3",
            color: 'white'
          }}
        >
          ถอนเงิน
          
        </Button>
      </Box>
    </Layout>
  )
}

export default withdraw