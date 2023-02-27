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
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import { signOut } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/store";
import hostname from "../utils/hostname";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import rank1 from '../assets/rank-1.png'
import AppsIcon from "@mui/icons-material/Apps";

function Layout({ children, page }) {
  const liff = import('@line/liff')
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState(page);
  const [credit, setCredit] = useState({});
  const [logo, setLogo] = useState([])
  const [profile, setProfile] = useState({})

  const getProfile = async () => {
    try {
      let credit = await axios({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        method: "get",
        url: `${hostname}/user/credit`,
      });

      let profile = await axios({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        method: "get",
        url: `${hostname}/user/profile`,
      });

      setProfile(profile.data);

      setCredit(credit.data);
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

  const getLogo = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `${hostname}/menu/get_web_setting_logo`,
      });

      setLogo(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const MenuProfile = [{
    page: 'profile',
    text: 'โปรไฟล์'
  },
  {
    page: 'logout',
    text: 'ออกจากระบบ'
  }];

  useEffect(() => {
    getProfile()
    getLogo()
  }, [])
  return (
    <div>
      <CssBaseline />
      {/* ------------ on Mobile ------------ */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {/* ----- header ----- */}

        {/* <AppBar position="fixed" elevation={0} sx={{ background: "linear-gradient(#0072B1, #41A3E3)", borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Grid container>
                <Grid item xs={6}>
                  <Box sx={{ pl: 1, mt: "5px" }}>
                    <img src={logo[0]?.img_url} width={40} height={30} />
                  </Box>

                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <Typography sx={{ mt: 0.5, mr: 1, color: "#fff", fontSize: '14px', bgcolor: '#0885CA', borderRadius: "20px", py: 1, px: 2 }}>{Intl.NumberFormat("THB").format(credit)} ฿</Typography>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {MenuProfile.map((item) => (
                        <MenuItem key={item} onClick={() => {
                          console.log('item', item.page)
                          if (item.page === "profile") {
                            handleCloseUserMenu()
                            router.push("/deposit");
                          } else if (item.page === "logout") {
                            // dispatch(signOut());
                            handleCloseUserMenu()
                            localStorage.clear();
                            liff.logout();
                            router.push("/auth/login");
                          }

                        }}>
                          <Typography textAlign="center">{item.text}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Grid>

              </Grid>

            </Toolbar>
          </Container>
        </AppBar> */}

        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
        >
          <Box sx={{ pl: 1, mt: 1 }}>
            <img src={logo[0]?.img_url} width={70} height={45} />
          </Box>
        </Grid>

        <Box sx={{ m: 1, mt: 0 }}>
          <Paper
            sx={{
              // background:
              //   "linear-gradient(to right,#01B843,#00A598,#00A2A4, #009BC5)",
              background: "linear-gradient(#0072B1, #41A3E3)",
              p: 2,
              width: "100%",
            }}
          >
            <Grid container>
              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography sx={{ color: "#fff" }}>User :</Typography>
              </Box>
              <Box sx={{ textAlign: "center", mt: 1, mx: 1 }}>
                <Typography align="center" sx={{ color: "#fff" }}>
                  {profile.tel ? (
                    profile.tel
                  ) : (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", minWidth: "100px" }}
                    />
                  )}
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  {/* <CopyToClipboard text={profile.sb_username}>
                           <ContentCopyIcon color="white" />
                        </CopyToClipboard> */}
                </IconButton>
              </Box>
            </Grid>
            <Typography
              align="start"
              sx={{ color: "#fff", mt: 2, fontSize: "13px" }}
            >
              เงินในวอลเล็ท (บาท)
            </Typography>
            <Grid container justifyContent="space-between">
              {credit !== undefined ? (
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", textAlign: "left" }}
                >
                  {Intl.NumberFormat("THB").format(credit)} ฿{" "}
                </Typography>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", minWidth: "80px" }}
                />
              )}
              <Button
                variant="contained"
                sx={{ bgcolor: "#fff", borderRadius: 50 }}
                size="small"
                onClick={() =>
                  router.push("/rankPoint")}
              >
                <ConfirmationNumberOutlinedIcon
                  sx={{ color: "#00897b", mr: 1 }}
                />
                <Typography sx={{ color: "#000", fontWeight: 100, fontSize: '12px' }}>
                  คูปองของฉัน
                </Typography>
              </Button>
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ m: 1 }}>
          <Paper sx={{ background: "linear-gradient(#0072B1, #41A3E3)", p: 1, width: "100%" }}>
            <Grid container>
              <Grid item sx={{ mt: 1 }}>
                <Image src={rank1} alt="diamond" width={60} height={50} />
              </Grid>
              <Grid item sx={{ ml: 1, mt: 1 }}>
                <Typography sx={{ color: "#fff" }}>
                  Diamond
                </Typography>
                <Typography sx={{ color: "#fff", fontSize: "10px", mt: 1 }}>
                  เติม 1000฿ จะได้ Commander
                </Typography>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ color: "white", bgcolor: "white", mx: 1 }}
              />
              <Grid item sx={{ ml: 1, mt: 1 }}>
                <Grid container>
                  <AppsIcon sx={{ color: "white" }} />
                  <Typography sx={{ mx: 1, color: "white", fontSize: "14px" }}>
                    500 pts
                  </Typography>
                </Grid>
                <Typography sx={{ mt: 1, ml: 1, fontSize: "10px", color: "white" }}>
                  450 pts จะหมดอายุ
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>


        {/* ----- body ----- */}
        <Box sx={{
          // my: 8,
          // backgroundImage: `url('https://cdn.softkingdoms.sgp1.digitaloceanspaces.com/BKSCAN.jpg')`,
          // backgroundPosition: 'center',
          // backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat',
        }}>
          {children}
        </Box>



        {/* ----- footer ----- */}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            sx={{
              background: "linear-gradient(#41A3E3, #0072B1)", borderTopLeftRadius: '30px', borderTopRightRadius: '30px',
              '& .Mui-selected': {
                '& .MuiBottomNavigationAction-label': {
                  color: '#fff'
                },
                '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                  color: '#fff'
                }
              }
            }}
            onChange={() => {
              setValue(value);
            }}
          >
            <BottomNavigationAction label="หน้าหลัก" value="home" icon={<HomeIcon />} onClick={() => router.push("/home")} />
            <BottomNavigationAction label="ฝากเงิน" value="deposit" icon={<PaidIcon />} onClick={() => router.push("/deposit")} />
            <BottomNavigationAction label="ถอนเงิน" value="withdraw" icon={<CurrencyExchangeIcon />} onClick={() => router.push("/withdraw")} />
            <BottomNavigationAction label="ประวัติ" value="history" icon={<ViewListIcon />} onClick={() => router.push("/history")} />
          </BottomNavigation>
        </Paper>

      </Box>


      {/* ------------ on Desktop ------------ */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <AppBar position="fixed" color="primary" elevation={0} sx={{ borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Grid container>
                <Grid item xs={6}>
                  <Box sx={{ pl: 1, mt: "5px" }}>
                    {/* <Image alt="banner" src={logo_angpao_white} width={40} height={30} /> */}
                    <img src={logo[0]?.img_url} width={40} height={30} />
                  </Box>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <Typography sx={{ mt: 0.5, mr: 2, color: "#fff", fontSize: '14px', bgcolor: '#0885CA', borderRadius: "20px", py: 1, px: 2 }}>{Intl.NumberFormat("THB").format(credit)} ฿</Typography>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {MenuProfile.map((item) => (
                        <MenuItem key={item} onClick={() => {
                          console.log('item', item.page)
                          if (item.page === "profile") {
                            handleCloseUserMenu()
                            router.push("/profile");
                          } else if (item.page === "logout") {
                            dispatch(signOut());
                            handleCloseUserMenu()
                            localStorage.clear();
                            router.push("/auth/login");
                          }

                        }}>
                          <Typography textAlign="center">{item.text}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Grid>

              </Grid>

            </Toolbar>
          </Container>
        </AppBar>

        <Grid container >
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Paper elevation={10} sx={{ py: 2 }}>
              {children}
            </Paper>
          </Grid>
          <Grid item xs={3} />
        </Grid>

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            sx={{
              bgcolor: '#41A3E3', borderTopLeftRadius: '30px', borderTopRightRadius: '30px',
              '& .Mui-selected': {
                '& .MuiBottomNavigationAction-label': {
                  color: '#fff'
                },
                '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                  color: '#fff'
                }
              }
            }}
            onChange={() => {
              setValue(value);
            }}
          >
            <BottomNavigationAction label="หน้าหลัก" value="home" icon={<HomeIcon />} onClick={() => router.push("/home")} />
            <BottomNavigationAction label="ฝากเงิน" value="deposit" icon={<PaidIcon />} onClick={() => router.push("/deposit")} />
            <BottomNavigationAction label="ถอนเงิน" value="withdraw" icon={<CurrencyExchangeIcon />} onClick={() => router.push("/withdraw")} />
            <BottomNavigationAction label="ประวัติ" value="history" icon={<ViewListIcon />} onClick={() => router.push("/history")} />
          </BottomNavigation>
        </Paper>
      </Box>

    </div >
  );
}

export default Layout;
