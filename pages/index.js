import React, { useState, useEffect } from 'react'
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
import { useAppDispatch } from "../store/store";
import axios from 'axios';
import hostname from '../utils/hostname';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from "sweetalert2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false)
  const [categoryType, setCategoryType] = useState('game')
  const [rowData, setRowData] = useState({})
  const [openDialogContact, setOpenDialogContact] = useState(false)
  const [otp, setOtp] = useState(false)
  const [tabOtp, setTabOtp] = useState(new Array(6).fill(""))
  const [dataOTP, setDataOTP] = useState()
  const [logo, setLogo] = useState([])
  const [banner, setBanner] = useState([])
  const [slide, setSlide] = useState([])
  const [gameType, setGameType] = useState([])
  const [subGameType, setSubGameType] = useState([])
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return false

    setTabOtp([...tabOtp.map((d, idx) => (idx === index) ? element.value : d)])

    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

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

  const getAssets = async () => {
    try {
      setLoading(true)
      let res = await axios({
        method: "get",
        url: `${hostname}/menu/get_web_setting`,
      });
      let resData = res.data
      let banner = resData.filter((item) => item.type === "banner")
      let slide = resData.filter((item) => item.type === "slide")

      setBanner(banner)
      setSlide(slide)
      setLoading(false)
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.data.error.message === "Unauthorized"
    ) {
        dispatch(signOut());
        localStorage.clear();
        router.push("/auth/login");
    }
    }
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

  const getLogo = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `${hostname}/menu/get_web_setting_logo`,
      });

      setLogo(res.data);
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.data.error.message === "Unauthorized"
    ) {
        dispatch(signOut());
        localStorage.clear();
        router.push("/auth/login");
    }
    }
  };

  const getGameType = async () => {
    setLoading(true);
    try {
      let res = await axios({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        method: "get",
        url: `${hostname}/menu/game_menu`,
      });

      let resData = res.data;
      // console.log('resData', resData[0].sub_game_type)
      setGameType(resData)
      setSubGameType(resData[0].sub_game_type)
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.data.error.message === "Unauthorized"
    ) {
        dispatch(signOut());
        localStorage.clear();
        router.push("/auth/login");
    }

    }
  };

  const sendOTP = async () => {
    setLoading(true)

    try {
      let res = await axios({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        method: "post",
        url: `${hostname}/v2/auth/login`,
        data: {
          "tel": rowData.tel
        }
      });

      let resData = res.data

      setDataOTP(resData)
      setOtp(true)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)

      if (
        error.response.data.error.status_code === 401 &&
        error.response.data.error.message === "ไม่มีข้อมูลผู้ใช้งานนี้"
      ) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'ไม่มีข้อมูลผู้ใช้งานนี้',
          showConfirmButton: false,
          timer: 2000
        })
        // router.push("/auth/login")
      }
    }
  }


  useEffect(() => {
    getLogo()
    getAssets()
    getGameType()
  }, [])


  return (
    <div style={{ padding: 0 }}>
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
      </AppBar> */}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Grid item xs={12} > */}
        <Box sx={{ pl: 1, mt: 1 }}>
          <img src={logo[0]?.img_url} width={130} height={40} />
        </Box>
        {/* </Grid> */}
        {/* <Grid container justifyContent="flex-end"
          item xs={6} sx={{ pr: 1 }}>
          <IconButton
            onClick={() => {
              Swal.fire({
                title: "ต้องการออกจากระบบ ?",
                icon: "info",
                showCancelButton: true,
                cancelButtonColor: "#D2042D",
                confirmButtonColor: "#0072B1",
                cancelButtonText: "ยกเลิก",
                confirmButtonText: "ยืนยัน",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(signOut());
                  localStorage.clear();
                  router.push("/auth/login");
                }
              });
            }} >
            <LogoutIcon sx={{ color: "#0072B1", mr: "3px" }} />
          </IconButton>
        </Grid> */}

      </Grid>

      {/* ----- on Mobile ----- */}

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {otp === false ?
          <Box
            sx={{
              mt: 1,
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
            <Typography sx={{ my: 1, color: "#707070", fontSize: "14px" }}>
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

            <Grid container spacing={1} sx={{ mt: 1 }}>
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
                    sendOTP()

                    // setOtp(true)
                    // setOpenDialogOTP(true)
                    // const response = await dispatch(
                    //   signIn({ tel: rowData.tel, password: values.password })
                    // );

                    // if (response.meta.requestStatus === "rejected") {
                    //   alert("Login failed");
                    // } else {
                    //   router.push("/home");
                    // }
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </Grid>
            </Grid>

          </Box>
          :
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
              direction="row"
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                <ArrowBackIosIcon fontSize='small' onClick={() => setOtp(false)} />
              </Grid>
              <Grid item xs={4} container justifyContent="center">
                <Typography variant="h5" sx={{ color: "#41A3E3" }}>เข้าสู่ระบบ</Typography>
              </Grid>
              <Grid item xs={4} />
            </Grid>

            <Grid container
              direction="column"
              sx={{ mt: 1 }}>
              <Typography sx={{ color: "#4B4949", fontSize: "16px" }}>ยืนยันตัวตน OTP</Typography>

              <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>ส่งรหัส 6 หลักไปที่ {rowData.tel}</Typography>
              <Box sx={{ textAlign: 'center', mt: 2, mb: -4 }}>
                {tabOtp.map((data, index) => {
                  return (
                    <input
                      style={{ width: 30, height: 40, marginLeft: '2%', textAlign: 'center', borderRadius: '10px', border: '1px solid #41A3E3' }}
                      type="number"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={e => handleChangeOtp(e.target, index)}
                      onFocus={e => e.target.select()}
                    />
                  )
                })}
              </Box>
              <Typography sx={{ color: "#707070", fontSize: "14px" }}>รหัสอ้างอิง : {dataOTP.refno}</Typography>
            </Grid>
            <Grid container
              direction="row">
              <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>ไม่ได้รับรหัส OTP ? </Typography>
              <Button
                variant="text"
                onClick={() => sendOTP()}
              >
                <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }} >ส่งรหัสอีกครั้ง</Typography>
              </Button>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
            >
              {/* <Grid item xs={4}>
                <ArrowBackIosIcon fontSize='small' onClick={() => setOtp(false)} />
              </Grid> */}
              <Grid item xs={4}>
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
                      signIn({ tel: rowData.tel, token: dataOTP.token, pin: tabOtp[0] + tabOtp[1] + tabOtp[2] + tabOtp[3] + tabOtp[4] + tabOtp[5] })
                    );

                    if (response.meta.requestStatus === "rejected") {
                      alert("Login failed");
                    } else {
                      setTabOtp([...tabOtp.map(data => "")])
                      router.push("/home");
                    }
                  }}
                >
                  ยืนยัน
                </Button>
              </Grid>
              {/* <Grid item xs={4} /> */}
            </Grid>
          </Box>
        }

        {/* <Box sx={{ mt: 2, mb: 1 }}>
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
            {banner.map((item) => (
              <>
                <SwiperSlide>
                  <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                    <img src={item.img_url} width={375} height={140} style={{ borderRadius: '5px' }} />
                  </Box>
                  <Box sx={{ display: { xs: "none", sm: "block", md: "none" }, mt: 1 }}>
                    <img src={item.img_url} width={800} height={180} style={{ borderRadius: '5px' }} />
                  </Box>
                  <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                    <img src={item.img_url} width={715} height={180} style={{ borderRadius: '5px' }} />
                  </Box>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </Box> */}

        <Box sx={{ mt: 2, mb: 8 }}>
          <Grid container spacing={1} sx={{ mt: 1 }} item md={12}>
            <Grid item xs={12} md={6}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item md={3}>
                  <Typography sx={{ color: "#000" }}>โปรโมชัน</Typography>
                </Grid>
                <Grid item md={3}>
                  <Grid container>
                    <Typography sx={{ color: "#000" }}>ดูทั้งหมด</Typography>
                    <ChevronRightIcon sx={{ color: "#000" }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid sx={{ mt: 2 }}>
                <Box >
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
                    {banner.map((item) => (
                      <>
                        <SwiperSlide>
                          <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                            <img src={item.img_url} width={375} height={140} style={{ borderRadius: '5px' }} />
                          </Box>
                          <Box sx={{ display: { xs: "none", sm: "block", md: "none" }, mt: 1 }}>
                            <img src={item.img_url} width={800} height={180} style={{ borderRadius: '5px' }} />
                          </Box>
                          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                            <img src={item.img_url} width={715} height={180} style={{ borderRadius: '5px' }} />
                          </Box>
                        </SwiperSlide>
                      </>
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
                    {slide.map((item) => (
                      <>
                        <SwiperSlide>
                          <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                            <img src={item.img_url} width={120} height={70} style={{ borderRadius: '5px' }} />
                          </Box>
                          <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
                            <img src={item.img_url} width={260} height={100} style={{ borderRadius: '5px' }} />
                          </Box>
                          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                            <img src={item.img_url} width={230} height={90} style={{ borderRadius: '5px' }} />
                          </Box>
                        </SwiperSlide>
                      </>
                    ))}
                  </Swiper>
                </Box>
              </Grid>
            </Grid>


            <Grid item xs={12} md={6}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item md={3}>
                  <Typography sx={{ color: "#000" }}>เกมทดลองเล่น</Typography>
                </Grid>
                <Grid item md={3}>
                  <Grid container>
                    <Typography sx={{ color: "#000" }}>ดูทั้งหมด</Typography>
                    <ChevronRightIcon sx={{ color: "#000" }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid sx={{ mt: 2 }}>
                <Box >
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
                    {banner.map((item) => (
                      <>
                        <SwiperSlide>
                          <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                            <img src={item.img_url} width={375} height={140} style={{ borderRadius: '5px' }} />
                          </Box>
                          <Box sx={{ display: { xs: "none", sm: "block", md: "none" }, mt: 1 }}>
                            <img src={item.img_url} width={800} height={180} style={{ borderRadius: '5px' }} />
                          </Box>
                          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                            <img src={item.img_url} width={715} height={180} style={{ borderRadius: '5px' }} />
                          </Box>
                        </SwiperSlide>
                      </>
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
                    {slide.map((item) => (
                      <>
                        <SwiperSlide>
                          <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                            <img src={item.img_url} width={120} height={70} style={{ borderRadius: '5px' }} />
                          </Box>
                          <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
                            <img src={item.img_url} width={260} height={100} style={{ borderRadius: '5px' }} />
                          </Box>
                          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                            <img src={item.img_url} width={230} height={90} style={{ borderRadius: '5px' }} />
                          </Box>
                        </SwiperSlide>
                      </>
                    ))}
                  </Swiper>
                </Box>
              </Grid>
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
              {otp === false ?
                <Box
                  sx={{
                    mt: 8.5,
                    mx: 1,
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
                  <Typography sx={{ my: 1, color: "#707070", fontSize: "14px" }}>
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

                  <Grid container spacing={1} sx={{ mt: 1 }}>
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
                          sendOTP()

                          // setOtp(true)
                          // setOpenDialogOTP(true)
                          // const response = await dispatch(
                          //   signIn({ tel: rowData.tel, password: values.password })
                          // );

                          // if (response.meta.requestStatus === "rejected") {
                          //   alert("Login failed");
                          // } else {
                          //   router.push("/home");
                          // }
                        }}
                      >
                        เข้าสู่ระบบ
                      </Button>
                    </Grid>
                  </Grid>

                </Box>
                :
                <Box
                  sx={{
                    mt: 8.5,
                    flexGrow: 1,
                    mx: 1,
                    p: 2,
                    bgcolor: '#fff',
                    borderRadius: 5,
                    boxShadow: '2px 2px 5px #C1B9B9',
                    border: "1px solid #C1B9B9"
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Grid item xs={4}>
                      <ArrowBackIosIcon fontSize='small' onClick={() => setOtp(false)} />
                    </Grid>
                    <Grid item xs={4} container justifyContent="center">
                      <Typography variant="h5" sx={{ color: "#41A3E3" }}>เข้าสู่ระบบ</Typography>
                    </Grid>
                    <Grid item xs={4} />
                  </Grid>

                  <Grid container
                    direction="column"
                    sx={{ mt: 1 }}>
                    <Typography sx={{ color: "#4B4949", fontSize: "16px" }}>ยืนยันตัวตน OTP</Typography>

                    <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>ส่งรหัส 6 หลักไปที่ {rowData.tel}</Typography>
                    <Box sx={{ textAlign: 'center', mt: 2, mb: -4 }}>
                      {tabOtp.map((data, index) => {
                        return (
                          <input
                            style={{ width: 30, height: 40, marginLeft: '2%', textAlign: 'center', borderRadius: '10px', border: '1px solid #41A3E3' }}
                            type="number"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={e => handleChangeOtp(e.target, index)}
                            onFocus={e => e.target.select()}
                          />
                        )
                      })}
                    </Box>
                    <Typography sx={{ color: "#707070", fontSize: "14px" }}>รหัสอ้างอิง : {dataOTP.refno}</Typography>
                  </Grid>
                  <Grid container
                    direction="row">
                    <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>ไม่ได้รับรหัส OTP ? </Typography>
                    <Button
                      variant="text"
                      onClick={() => sendOTP()}
                    >
                      <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }} >ส่งรหัสอีกครั้ง</Typography>
                    </Button>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                  >
                    {/* <Grid item xs={4}>
                <ArrowBackIosIcon fontSize='small' onClick={() => setOtp(false)} />
              </Grid> */}
                    <Grid item xs={4}>
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
                            signIn({ tel: rowData.tel, token: dataOTP.token, pin: tabOtp[0] + tabOtp[1] + tabOtp[2] + tabOtp[3] + tabOtp[4] + tabOtp[5] })
                          );

                          if (response.meta.requestStatus === "rejected") {
                            alert("Login failed");
                          } else {
                            setTabOtp([...tabOtp.map(data => "")])
                            router.push("/home");
                          }
                        }}
                      >
                        ยืนยัน
                      </Button>
                    </Grid>
                    {/* <Grid item xs={4} /> */}
                  </Grid>
                </Box>
              }

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
                  {banner.map((item) => (
                    <>
                      <SwiperSlide>
                        <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                          <img src={item.img_url} width={375} height={140} style={{ borderRadius: '5px' }} />
                          {/* <Image alt="banner" src={item} width={'400px'} height={'170px'} /> */}
                        </Box>
                        <Box sx={{ display: { xs: "none", sm: "block", md: "none" }, mt: 1 }}>
                          <img src={item.img_url} width={800} height={180} style={{ borderRadius: '5px' }} />
                          {/* <Image alt="banner" src={item} width={'800%'} height={'330px'} /> */}
                        </Box>
                        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                          <img src={item.img_url} width={715} height={180} style={{ borderRadius: '5px' }} />
                          {/* <Image alt="banner" src={item} width={'800%'} height={350} /> */}
                        </Box>
                      </SwiperSlide>
                    </>
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
                  {slide.map((item) => (
                    <>
                      <SwiperSlide>
                        <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
                          <img src={item.img_url} width={120} height={70} style={{ borderRadius: '5px' }} />
                          {/* <Image alt="banner" src={item} width={600} height={350} /> */}
                        </Box>
                        <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
                          <img src={item.img_url} width={260} height={100} style={{ borderRadius: '5px' }} />
                          {/* <Image alt="banner" src={item} width={350} height={180} /> */}
                        </Box>
                        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                          <img src={item.img_url} width={230} height={90} style={{ borderRadius: '5px' }} />
                          {/* <Image alt="banner" src={item} width={400} height={200} /> */}
                        </Box>
                      </SwiperSlide>
                    </>
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
                      <>
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
                      </>

                    )) : games2.map((item) => (
                      <>
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
                      </>
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

export default withAuth(Index)
