import React, { useState, useEffect } from "react";
import Layout from '../theme/Layout'
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import Image from 'next/image';
import kbank from "../assets/kbank.png";
import scbL from "../assets/scbL.png";
import trueL from "../assets/trueL.png";

function CardBank_Rank() {
  return (
    <>

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

      <Card sx={{
        mt: 1,
        borderRadius: 1,
        bgcolor: '#47B8AD',
        // border: "2px solid #41A3E3"
      }}>
        <Grid container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ py: 1 }}
        >
          <Grid item xs={4}>
            <Box sx={{ ml: 2, mt: 1 }}>
              <Image src={scbL} alt="scb" />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ color: 'white' }}>The VIP</Typography>
            <Typography sx={{ color: 'white', ml: 2 }}>500 pts</Typography>
            <Typography sx={{ color: 'white', fontSize: '8px' }}>450 pts จะหมดอายุใช้งาน</Typography>

          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CardBank_Rank