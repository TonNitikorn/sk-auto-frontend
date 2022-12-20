import React, { useState, useEffect } from "react";
import Layout from '../theme/Layout'
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import Image from 'next/image';
import kbank from "../assets/kbank.png";
import scbL from "../assets/scbL.png";
import trueL from "../assets/trueL.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function deposit() {
  const [open, setOpen] = useState(false);

  const handleTooltipOpen = () => {
    setOpen(true);
  };



  return (
    <Layout page="deposit">
      <Box sx={{ m: 3, mt: 10 , mb: 10}}>
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
                  <Image src={scbL} alt="scb" width="100%" height="100%" />
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
        {/* <Box
          sx={{
            borderRadius: 3,
            bgcolor: '#78BEFF',
            border: "2px solid #41A3E3",
            py: "20px"
          }}
        >
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={5}>
              <Box sx={{ mt: 1, ml: 5 }}>
                <Image src={scbL} alt="scb" />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ color: 'white', mb: '2px', mt: 1 }}>SCB (ไทยพาณิชย์)</Typography>
              <Typography sx={{ color: 'white', mb: '2px' }}>095-2-78718-8</Typography>
              <Typography sx={{ color: 'white' }}>ผู้ใช้ ผู้ใช้</Typography>
            </Grid>
          </Grid>
        </Box> */}

        <Typography variant="h6" sx={{ fontWeight: 'bold', my: 3 }}>เติมเครดิต</Typography>

        <Box sx={{ my: 3 }}>
          <Box
            sx={{
              borderRadius: 4,
              bgcolor: '#fff',
              border: "2px solid #41A3E3",
              py: "30px"
            }}
          >
            <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={3}>
                <Box sx={{ ml: 4 }}>
                  <Image src={scbL} alt="kbank" width="100%" height="100%" />
                </Box>
              </Grid>
              <Grid item xs={7} >
                <Typography sx={{ color: '#0B5FAD', fontSize: '14px', pl: 3 }}>KBANK (กสิกรไทย)</Typography>
                <Typography sx={{ color: '#0B5FAD', fontSize: '14px', pl: 3 }}>095-2-78718-8</Typography>
                <Typography sx={{ color: '#0B5FAD', fontSize: '12px', pl: 3 }}>ผู้ใช้ ผู้ใช้</Typography>
              </Grid>
              <Grid item xs={2} >
                <IconButton onClick={handleTooltipOpen}>
                  <CopyToClipboard text={"bank_number"}>
                    <ContentCopyIcon color="black" />
                  </CopyToClipboard>
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              borderRadius: 4,
              bgcolor: '#fff',
              border: "2px solid #41A3E3",
              py: "30px",
              mt:3
            }}
          >
            <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={3}>
                <Box sx={{ ml: 4 }}>
                  <Image src={scbL} alt="kbank" width="100%" height="100%" />
                </Box>
              </Grid>
              <Grid item xs={7} >
                <Typography sx={{ color: '#0B5FAD', fontSize: '14px', pl: 3 }}>KBANK (กสิกรไทย)</Typography>
                <Typography sx={{ color: '#0B5FAD', fontSize: '14px', pl: 3 }}>095-2-78718-8</Typography>
                <Typography sx={{ color: '#0B5FAD', fontSize: '12px', pl: 3 }}>ผู้ใช้ ผู้ใช้</Typography>
              </Grid>
              <Grid item xs={2} >
                <IconButton onClick={handleTooltipOpen}>
                  <CopyToClipboard text={"bank_number"}>
                    <ContentCopyIcon color="black" />
                  </CopyToClipboard>
                </IconButton>
              </Grid>
            </Grid>
          </Box>

        </Box>
        <Typography sx={{ my: 3, fontSize: '12px' }}>โปรดใช้บัญชี กสิกรไทย 095-2-78718-8 โอนมาเท่านั้น</Typography>

      </Box>



    </Layout>
  )
}

export default deposit