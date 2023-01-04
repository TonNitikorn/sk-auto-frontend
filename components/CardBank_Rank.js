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
import axios from "axios";
import hostname from "../utils/hostname";



function CardBank_Rank(props) {
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    try {
      let res = await axios({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        method: "get",
        url: `${hostname}/user/profile`,
      });

      setProfile(res.data);
      props.setProfileDeposit(res.data)
    } catch (error) {
      console.log(error);
      // if (
      //   error.response.status === 401 &&
      //   error.response.data === "Unauthorized"
      // ) {
      //   dispatch(signOut());
      //   localStorage.clear();
      //   router.push("/auth/login");
      // }
    }
  };

  useEffect(() => {
    getProfile()
  }, [])

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
              <Typography sx={{ color: 'white', mb: '2px', mt: 1 }}>{profile.bank_name}</Typography>
              <Typography sx={{ color: 'white', mb: '2px' }}>{profile.bank_number}</Typography>
              <Typography sx={{ color: 'white' }}>{profile.name}</Typography>
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
            <Typography sx={{ color: 'white' }}>{profile.rank}</Typography>
            <Typography sx={{ color: 'white', ml: 2 }}>{profile.points} pts</Typography>
            <Typography sx={{ color: 'white', fontSize: '8px' }}>{profile.point_affiliate} pts จะหมดอายุใช้งาน</Typography>

          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CardBank_Rank