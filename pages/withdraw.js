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
import Swal from "sweetalert2";



function withdraw() {
  const [price, setPrice] = useState(0)

  const handelwithdraw = () => {
    Swal.fire({
      title: "ยืนยันการทำรายการ",
      text: `ท่านต้องการถอนเครดิตจำนวน ${price} ฿`,
      icon: "info",
      showCancelButton: true,
      cancelButtonColor: "#EB001B",
      confirmButtonColor: "#058900",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
    }).then((result) => {
      if (result.isConfirmed) {
        // withdraw();
      }
    });
  };

  return (
    <Layout page="withdraw">
      <Box sx={{ m: 3 }}>
        <Card sx={{
          mt: 1,
          display: { xs: "block", md: "none" },
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
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>ถอนเครดิต</Typography>
        <Typography sx={{ fontSize: '12px' }}>เลือกจำนวนเครดิต</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
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