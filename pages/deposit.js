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
      <Box sx={{ m: 3,display: { xs: "block", md: "none" }, }}>
        <Card sx={{
          mt: 1,
          p:2,
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

        <Typography variant="h6" sx={{ fontWeight: 'bold', my: 3 }}>เติมเครดิต</Typography>
        <Box>
          <Card sx={{
            mt: 1,
            
            borderRadius: 3,
            background: "linear-gradient(#7CC6F8, #1890D9 )"
          }}>
            <CardContent>
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={3}>
                  <Box sx={{ mt: 1, ml: 0 }}>
                    <Image src={kbank} alt="kbank" width="100%" height="100%"/>
                  </Box>
                </Grid>
                <Grid item xs={7} >
                  <Typography sx={{ color: 'white', fontSize: '14px', ml: 2 }}>KBANK (กสิกรไทย)</Typography>
                  <Typography sx={{ color: 'white', fontSize: '14px', ml: 2 }}>095-2-78718-8</Typography>
                  <Typography sx={{ color: 'white', fontSize: '12px', ml: 2 }}>ผู้ใช้ ผู้ใช้</Typography>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={handleTooltipOpen}>
                    <CopyToClipboard text={"bank_number"}>
                      <ContentCopyIcon color="black" />
                    </CopyToClipboard>
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{
            mt: 2,
            borderRadius: 3,
            background: "linear-gradient(#7CC6F8, #1890D9 )"
          }}>
            <CardContent>
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={3}>
                  <Box sx={{ mt: 1, ml: 0 }}>
                    <Image src={scbL} alt="scb"  />
                  </Box>
                </Grid>
                <Grid item xs={7} >
                  <Typography sx={{ color: 'white', fontSize: '14px', ml: 2 }}>SCB (ไทยพาณิชย์)</Typography>
                  <Typography sx={{ color: 'white', fontSize: '14px', ml: 2 }}>095-2-78718-8</Typography>
                  <Typography sx={{ color: 'white', fontSize: '12px', ml: 2 }}>ผู้ใช้ ผู้ใช้</Typography>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={handleTooltipOpen}>
                    <CopyToClipboard text={"bank_number"}>
                      <ContentCopyIcon color="black" />
                    </CopyToClipboard>
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{
            mt: 2,
            borderRadius: 3, 
            background: "linear-gradient(#7CC6F8, #1890D9 )"
          }}>
            <CardContent>
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={3}>
                  <Box sx={{ mt: 1, ml: 0 }}>
                    <Image src={trueL} alt="trueWalltet" width="80%" height="80%"/>
                  </Box>
                </Grid>
                <Grid item xs={7} >
                  <Typography sx={{ color: 'white', fontSize: '14px', ml: 2 }}>SCB (ไทยพาณิชย์)</Typography>
                  <Typography sx={{ color: 'white', fontSize: '14px', ml: 2 }}>095-2-78718-8</Typography>
                  <Typography sx={{ color: 'white', fontSize: '12px', ml: 2 }}>ผู้ใช้ ผู้ใช้</Typography>
                </Grid>
                <Grid item xs={2} >
                  <IconButton onClick={handleTooltipOpen}>
                    <CopyToClipboard text={"bank_number"}>
                      <ContentCopyIcon color="black" />
                    </CopyToClipboard>
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Typography  sx={{ my: 3,fontSize: '12px' }}>โปรดใช้บัญชี กสิกรไทย 095-2-78718-8 โอนมาเท่านั้น</Typography>

      </Box>



    </Layout>
  )
}

export default deposit