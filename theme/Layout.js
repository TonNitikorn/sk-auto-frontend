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



function Layout({ children, page }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState(page);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const profile = [{
    page: 'profile',
    text: 'โปรไฟล์'
  },
  {
    page: 'logout',
    text: 'ออกจากระบบ'
  }];

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

        <AppBar position="fixed" color="primary" elevation={0} sx={{ borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Grid container>
                <Grid item xs={6}>
                  <Typography sx={{ mt: 1 }}
                    onClick={() => {
                      router.push('home')
                    }}
                  >LOGO</Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <Typography sx={{ mt: 1.5, mr: 2, color: "#fff", fontSize: '14px' }}>300,000.00 ฿</Typography>

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
                      {profile.map((item) => (
                        <MenuItem key={item} onClick={() => {
                          console.log('item', item.page)
                          if (item.page === "profile") {
                            handleCloseUserMenu()
                            router.push("/deposit");
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

        {/* ----- body ----- */}
        <Box sx={{ my: 8 }}>
          {children}
        </Box>

        {/* ----- footer ----- */}
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
                  <Typography sx={{ mt: 1 }} onClick={() => {
                    router.push('home')
                  }}>LOGO</Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <Typography sx={{ mt: 1.5, mr: 2, color: "#fff", fontSize: '14px' }}>300,000.00 ฿</Typography>

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
                      {profile.map((item) => (
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
            <Paper elevation={10} v sx={{ py: 2 }}>
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
