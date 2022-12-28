import React, { useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  AppBar,
  Container,
  Toolbar,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Slide from '@mui/material/Slide';
import { signIn } from "../store/slices/userSlice";
import hostname from "../utils/hostname";
import { useAppDispatch } from "../store/store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false)
  const [categoryType, setCategoryType] = useState('game')
  const [rowData, setRowData] = useState({})
  const [openDialogContact, setOpenDialogContact] = useState(false)
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChangeData = async (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                {/* <Typography sx={{ mt: 1.5, mr: 2, color: "#fff", fontSize: '14px' }}
                  onClick={() => {
                    router.push('auth/register')
                  }}>สมัครสมาชิก</Typography>
                <Typography sx={{ mt: 1.5, mr: 2, color: "#fff", fontSize: '14px' }}
                  onClick={() => {
                    router.push('auth/login')
                  }}>เข้าสู่ระบบ</Typography> */}
                <Button
                  variant="outlined"
                  sx={{
                    bgcolor: '#41A3E3',
                    borderRadius: 5,
                    border: "2px solid #fff",
                    color: '#fff'
                  }}
                  onClick={() => { setOpenDialogContact(true) }}
                >
                  ติดต่อเรา
                </Button>
              </Grid>

            </Grid>

          </Toolbar>
        </Container>
      </AppBar>
      {/* ----- on Mobile ----- */}

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box
          sx={{
            mt: 8.5,
            flexGrow: 1,
            p: 2,
            bgcolor: '#fff',
            borderRadius: 5,
            boxShadow: '2px 2px 5px #C1B9B9',
            border: "1px solid #C1B9B9"
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" sx={{ color: "#41A3E3" }}>เข้าสู่ระบบ</Typography>
          </Grid>
          <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>
            เบอร์โทรศัพท์
          </Typography>
          <TextField
            name="tel"
            type="text"
            value={rowData.tel || ""}
            placeholder="000-000-000"
            fullWidth
            size="small"
            onChange={(e) => handleChangeData(e)}
            variant="outlined"
            sx={{ bgcolor: "white" }}
            inputProps={{ maxLength: 10 }}
          />
          <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>รหัสผ่าน</Typography>
          <div>
            <FormControl fullWidth variant="outlined" size="small">
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                placeholder="password"
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ bgcolor: "white" }}
              />
            </FormControl>
            <Grid
              container
              direction="row-reverse"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Button
                variant="text"
                sx={{ textDecoration: "underline ", color: "#000" }}
              >
                ลืมรหัสผ่าน
              </Button>
            </Grid>
          </div>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 5,
                  border: "2px solid #41A3E3",
                  color: '#41A3E3'
                }}
                onClick={() => router.push(`/auth/register`)}
              >
                สมัครสมาชิก
              </Button></Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#41A3E3',
                  borderRadius: 5,
                  color: '#fff'
                }}
                onClick={async () => {
                  const response = await dispatch(
                    signIn({ tel: rowData.tel, password: values.password })
                  );

                  if (response.meta.requestStatus === "rejected") {
                    alert("Login failed");
                  } else {
                    console.log("else");
                    router.push("/home");
                  }
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Typography sx={{ my: 1, color: "#707070", fontSize: "14px" }}>หรือ</Typography>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#00BB00',
              borderRadius: 5,
              color: '#fff'
            }}

          >
            เข้าสู่ระบบด้วยไลน์
          </Button>



        </Box>

        <Box sx={{ mt: 2, mb: 1 }}>
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
        {/* <Box sx={{ my: 1, }}>
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
        </Box> */}

        <Box sx={{ mt: 2, mb: 8 }}>
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
              <Box
                sx={{
                  m: 1,
                  mt: 8.5,
                  flexGrow: 1,
                  p: 2,
                  bgcolor: '#fff',
                  borderRadius: 5,
                  boxShadow: '2px 2px 5px #C1B9B9',
                  border: "1px solid #C1B9B9"
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h5" sx={{ color: "#41A3E3" }}>เข้าสู่ระบบ</Typography>
                </Grid>
                <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>
                  เบอร์โทรศัพท์
                </Typography>
                <TextField
                  name="tel"
                  type="text"
                  value={rowData.tel || ""}
                  placeholder="000-000-000"
                  fullWidth
                  size="small"
                  onChange={(e) => handleChangeData(e)}
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                  inputProps={{ maxLength: 10 }}
                />
                <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>รหัสผ่าน</Typography>
                <div>
                  <FormControl fullWidth variant="outlined" size="small">
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      placeholder="password"
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{ bgcolor: "white" }}
                    />
                  </FormControl>
                  <Grid
                    container
                    direction="row-reverse"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Button
                      variant="text"
                      sx={{ textDecoration: "underline ", color: "#000" }}
                    >
                      ลืมรหัสผ่าน
                    </Button>
                  </Grid>
                </div>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        bgcolor: '#fff',
                        borderRadius: 5,
                        border: "2px solid #41A3E3",
                        color: '#41A3E3'
                      }}
                      onClick={() => router.push(`/auth/register`)}
                    >
                      สมัครสมาชิก
                    </Button></Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: '#41A3E3',
                        borderRadius: 5,
                        color: '#fff'
                      }}
                      onClick={async () => {
                        const response = await dispatch(
                          signIn({ tel: rowData.tel, password: values.password })
                        );

                        if (response.meta.requestStatus === "rejected") {
                          alert("Login failed");
                        } else {
                          console.log("else");
                          router.push("/home");
                        }
                      }}
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center">
                  <Typography sx={{ my: 1, color: "#707070", fontSize: "14px" }}>หรือ</Typography>
                </Grid>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#00BB00',
                    borderRadius: 5,
                    color: '#fff'
                  }}

                >
                  เข้าสู่ระบบด้วยไลน์
                </Button>
              </Box>
              <Box sx={{ m: 1, mt: 2 }}>
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
              <Box sx={{ m: 1, my: 1 }}>
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

              <Box sx={{ m: 1, mb: 8 }}>
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

      <Dialog
        fullWidth
        maxWidth="md"
        open={openDialogContact}
        onClose={() => setOpenDialogContact(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle >
          ช่องทางการติดต่อ
        </DialogTitle>
        <DialogContent>
          <Button
            variant="outlined"
            sx={{
              bgcolor: '#41A3E3',
              borderRadius: 2,
              border: "2px solid #fff",
              color: '#fff'
            }}
          >
            ติดต่อผ่าน Line
          </Button>
          <Button
            variant="outlined"
            sx={{
              bgcolor: '#41A3E3',
              borderRadius: 2,
              border: "2px solid #fff",
              color: '#fff'
            }}
          >
           ติดต่อผ่าน โทรศัพท์
          </Button>
          <Button
            variant="outlined"
            sx={{
              bgcolor: '#41A3E3',
              borderRadius: 2,
              border: "2px solid #fff",
              color: '#fff'
            }}
          >
            แชทสดกับพนักงาน
          </Button>
        </DialogContent>

      </Dialog>

      <LoadingModal open={loading} />
    </div>
  )
}

export default index
// export default withAuth(index)
