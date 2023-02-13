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
import CardBankRank from "../components/CardBankRank";



function Withdraw() {
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
       <Box sx={{ m: 2, mt: 10 , mb: 20}}>
        <CardBankRank />
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>ถอนเครดิต</Typography>
        <Typography sx={{ fontSize: '12px' }}>เลือกจำนวนเครดิต</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              sx={{ p: 1
              }}
              onClick={() => setPrice(100)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "#41A3E3" }}
              >
                100
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              sx={{ p: 1 }}
              onClick={() => setPrice(200)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "#41A3E3" }}
              >
                200
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(300)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "#41A3E3" }}
              >
                300
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(500)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "#41A3E3" }}
              >
                500
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
             variant="outlined"
             fullWidth
             color="primary"
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(1000)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "#41A3E3" }}
              >
                1000
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
             variant="outlined"
             fullWidth
             color="primary"
              onClick={() => setPrice(2000)}
              sx={{ p: 1, bgcolor: "#fff" }}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "#41A3E3" }}
              >
                2000
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(5000)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "#41A3E3" }}
              >
                5000
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              sx={{ p: 1, bgcolor: "#fff" }}
              onClick={() => setPrice(10000)}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center", color: "#41A3E3" }}
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

export default Withdraw