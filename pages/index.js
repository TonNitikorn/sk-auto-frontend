import React, { useState } from 'react'
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
  AppBar,
  Container,
  Toolbar
} from "@mui/material";
import Image from 'next/image'
import withAuth from '../routes/withAuth'
import Layout from '../theme/Layout'
import LoadingModal from '../theme/LoadingModal'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/router";


function index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [categoryType, setCategoryType] = useState('game')

  // useEffect(() => {
  //     setTimeout(() => {
  //         setLoading(false)
  //     }, 2000);
  // }, [])
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  const category = [
    {
      type: 'game',
      img: 'game',
      category: 'game'
    },
    {
      type: 'poker',
      img: 'game',
      category: 'poker'
    },
    {
      type: 'slot',
      img: 'game',
      category: 'slot',
    },
    {
      type: 'esport',
      img: 'game',
      category: 'esport',
    },
    {
      type: 'casino',
      img: 'game',
      category: 'casino',
    },
    {
      type: 'casino',
      img: 'game',
      category: 'casino',
    },
  ];

  const games1 = [
    {
      type: 'game',
      img: 'game'
    },
    {
      type: 'poker',
      img: 'game'
    },
    {
      type: 'slot',
      img: 'game'
    },
    {
      type: 'esport',
      img: 'game'
    },
    {
      type: 'casino',
      img: 'game'
    },
    {
      type: 'casino',
      img: 'game'
    },
    {
      type: 'game',
      img: 'game'
    },
    {
      type: 'poker',
      img: 'game'
    },
    {
      type: 'slot',
      img: 'game'
    },
    {
      type: 'esport',
      img: 'game'
    },
    {
      type: 'casino',
      img: 'game'
    },
    {
      type: 'casino',
      img: 'game'
    },
  ];

  const games2 = [
    {
      type: 'poker',
      img: 'game'
    },
    {
      type: 'poker',
      img: 'game'
    },
  ];
  return (
    <div style={{ padding: 0 }}>
      <AppBar position="fixed" color="primary" elevation={0} sx={{ borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}>LOGO</Typography>
              </Grid>
              <Grid item xs={6} container justifyContent="flex-end">
                <Typography sx={{ mt: 1.5, mr: 2, color: "#fff", fontSize: '14px' }}
                  onClick={() => {
                    router.push('auth/register')
                  }}>สมัครสมาชิก</Typography>
                <Typography sx={{ mt: 1.5, mr: 2, color: "#fff", fontSize: '14px' }}
                  onClick={() => {
                    router.push('auth/login')
                  }}>เข้าสู่ระบบ</Typography>

                {/* <Box sx={{ flexGrow: 0 }}>
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
                </Box> */}
              </Grid>

            </Grid>

          </Toolbar>
        </Container>
      </AppBar>
      {/* ----- on Mobile ----- */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ m: 2, mt: 8.5, }}>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}

            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {images.map((item) => (
              <SwiperSlide>
                <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                  <Image alt="banner" src={item} width={'400px'} height={'170px'} />
                </Box>
                <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
                  <Image alt="banner" src={item} width={'800%'} height={'330px'} />
                </Box>
                <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                  <Image alt="banner" src={item} width={'800%'} height={350} />
                </Box>
              </SwiperSlide>

            ))}
          </Swiper>
        </Box>
        <Box sx={{ my: 1 }}>
          <Swiper
            loop={true}
            spaceBetween={10}
            slidesPerView={3}
            loopFillGroupWithBlank={true}
            freeMode={true}
            watchSlidesProgress={true}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper"
          >
            {images.map((item) => (
              <SwiperSlide>
                <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                  <Image alt="banner" src={item} width={600} height={350} />
                </Box>
                <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
                  <Image alt="banner" src={item} width={350} height={180} />
                </Box>
                <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                  <Image alt="banner" src={item} width={400} height={200} />
                </Box>
              </SwiperSlide>

            ))}
          </Swiper>
        </Box>

        <Box sx={{ m: 2, mb: 8 }}>
          <Grid container>
            <Grid item xs={3} container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            // sx={{ bgcolor: 'red' }}
            >
              {category.map((item) => (
                <>
                  <Button
                    variant="contained"
                    // fullWidth
                    color='secondary2'
                    sx={{ mt: 1, bgcolor: "#41A3E3", height: '80px', width: '90%' }}

                    onClick={() => {
                      setCategoryType(item.category)
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
                    >
                      {item.type}
                    </Typography>
                  </Button>

                </>
              ))}

            </Grid>
            <Grid item xs={9}
              justifyContent="center"
              alignItems="flex-start"
            // sx={{ bgcolor: 'green' }}
            >
              {categoryType === "game" ? games1.map((item) => (
                <Button
                  variant="contained"
                  // fullWidth
                  sx={{ mt: 1, mr: "2px", bgcolor: "#fff", height: '70px', width: '49%' }}
                // onClick={() => setPrice(100)}
                >
                  <Typography
                    sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
                  >
                    {item.type}
                  </Typography>
                </Button>
              )) : games2.map((item) => (
                <Button
                  variant="contained"
                  // fullWidth
                  sx={{ mt: 1, mr: "2px", bgcolor: "#fff", height: '70px', width: '49%' }}
                // onClick={() => setPrice(100)}
                >
                  <Typography
                    sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
                  >
                    {item.type}
                  </Typography>
                </Button>
              ))}

            </Grid>


          </Grid>

        </Box>
      </Box>

      {/* ----- on Desktop ----- */}

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Grid container >
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Paper elevation={10} v sx={{ py: 2 }}>
              <Box sx={{ m: 2, mt: 8.5 }}>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}

                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {images.map((item) => (
                    <SwiperSlide>
                      <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                        <Image alt="banner" src={item} width={'400px'} height={'170px'} />
                      </Box>
                      <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
                        <Image alt="banner" src={item} width={'800%'} height={'330px'} />
                      </Box>
                      <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                        <Image alt="banner" src={item} width={'800%'} height={350} />
                      </Box>
                    </SwiperSlide>

                  ))}
                </Swiper>
              </Box>
              <Box sx={{ my: 1 }}>
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={3}
                  loopFillGroupWithBlank={true}
                  freeMode={true}
                  watchSlidesProgress={true}
                  autoplay={{
                    delay: 500,
                    disableOnInteraction: false,
                  }}
                  modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                  className="mySwiper"
                >
                  {images.map((item) => (
                    <SwiperSlide>
                      <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                        <Image alt="banner" src={item} width={600} height={350} />
                      </Box>
                      <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
                        <Image alt="banner" src={item} width={350} height={180} />
                      </Box>
                      <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                        <Image alt="banner" src={item} width={400} height={200} />
                      </Box>
                    </SwiperSlide>

                  ))}
                </Swiper>
              </Box>

              <Box sx={{ m: 2, mb: 8 }}>
                <Grid container>
                  <Grid item xs={3} container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  // sx={{ bgcolor: 'red' }}
                  >
                    {category.map((item) => (
                      <>
                        <Button
                          variant="contained"
                          // fullWidth
                          color='secondary2'
                          sx={{ mt: 1, bgcolor: "#41A3E3", height: '80px', width: '90%' }}

                          onClick={() => {
                            setCategoryType(item.category)
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
                          >
                            {item.type}
                          </Typography>
                        </Button>

                      </>
                    ))}

                  </Grid>
                  <Grid item xs={9}
                    justifyContent="center"
                    alignItems="flex-start"
                  // sx={{ bgcolor: 'green' }}
                  >
                    {categoryType === "game" ? games1.map((item) => (
                      <Button
                        variant="contained"
                        // fullWidth
                        sx={{ mt: 1, mr: "2px", bgcolor: "#fff", height: '70px', width: '49%' }}
                      // onClick={() => setPrice(100)}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
                        >
                          {item.type}
                        </Typography>
                      </Button>
                    )) : games2.map((item) => (
                      <Button
                        variant="contained"
                        // fullWidth
                        sx={{ mt: 1, mr: "2px", bgcolor: "#fff", height: '70px', width: '49%' }}
                      // onClick={() => setPrice(100)}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
                        >
                          {item.type}
                        </Typography>
                      </Button>
                    ))}

                  </Grid>


                </Grid>

              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Box>


      <LoadingModal open={loading} />
    </div>
  )
}

export default index
// export default withAuth(index)
