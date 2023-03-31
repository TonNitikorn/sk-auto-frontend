import React, { useState, useEffect } from 'react'
import {
    Box, Grid, Button, Typography, MenuList, MenuItem, Dialog,
    IconButton,
    TextField,
    FormControl,
    InputAdornment,
    OutlinedInput,
    Card, Paper, Divider, Skeleton
} from '@mui/material'
import withAuth from '../../routes/withAuth'
import Layout from '../../theme/Layout'
import LoadingModal from '../../theme/LoadingModal'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import DescriptionIcon from '@mui/icons-material/Description';
import Swal from "sweetalert2";
import Image from 'next/image'
import axios from 'axios'
import hostname from '../../utils/hostname'
import rank1 from '../../assets/rank-1.png'
import AppsIcon from "@mui/icons-material/Apps";
import gameIn from "../../assets/gameIn.png";
import gameOut from "../../assets/gameOut.png";
import problam from "../../assets/problam.png";
import event from "../../assets/event.png";
import promotion from "../../assets/promotion.png";
import ban from '../../assets/banner.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Home() {
    const router = useRouter();
    const [rowData, setRowData] = useState({});
    const [loading, setLoading] = useState(false)
    const [banner, setBanner] = useState([])
    const [slide, setSlide] = useState([])
    const [gameType, setGameType] = useState([])
    const [subGameType, setSubGameType] = useState([])
    const [selectGame, setSelectGame] = useState(false)
    const [profile, setProfile] = useState({})
    const [credit, setCredit] = useState({})

    const handleChangeData = async (e) => {
        setRowData({ ...rowData, [e.target.name]: e.target.value });
    };

    const handelAddData = () => {
        if (by === 'line') {
            Swal.fire({
                title: "ยืนยันการทำรายการ",
                text: `ท่านต้องการถอนเครดิตจำนวน`,
                icon: "info",
                showCancelButton: true,
                cancelButtonColor: "#7C7C7C",
                confirmButtonColor: "#41A3E3",
                cancelButtonText: "ตกลง",
                confirmButtonText: "ไปยังข้อมูลส่วนตัว",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push(`/profile?by=${'line'}`)
                }
            });
        }

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

    useEffect(() => {
        getAssets()
        getGameType()
    }, [])

    return (
        <>
            {selectGame === false ?
                <Box>
                    <Box sx={{ display: { xs: "block", sm: 'none', md: "none" }, }}>
                        <Grid container spacing={1} sx={{ p: 1, textAlign: "center" }}>
                            <Grid item xs={6} md={3}>
                                <img src={"https://angpaos.games/wp-content/uploads/2023/03/Playgame-auto.jpg"}
                                    width={172}
                                    height={96}
                                    style={{
                                        borderRadius: '5px',
                                        boxShadow: '2px 2px 5px gray'
                                    }}
                                    onClick={() => {
                                        setSelectGame(true)
                                    }}
                                />
                                <Typography sx={{ fontSize: '14px' }}>
                                    เล่นเกมส์
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <img src={"https://angpaos.games/wp-content/uploads/2023/03/Admin-auto.jpg"}
                                    width={172}
                                    height={96}
                                    style={{
                                        borderRadius: '5px',
                                        boxShadow: '2px 2px 5px gray'
                                    }}
                                    onClick={() => {
                                        setSelectGame(true)
                                    }}
                                />
                                <Typography sx={{ fontSize: '14px' }}>
                                    แจ้งปัญหา
                                </Typography>
                            </Grid>

                        </Grid>
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: 'block', md: "none" }, }}>
                        <Grid container spacing={1} sx={{ p: 1, textAlign: "center" }}>
                            <Grid item xs={6} >
                                <img src={"https://angpaos.games/wp-content/uploads/2023/03/2Playgame-auto.jpg"}
                                    width={'95%'}
                                    height={115}
                                    style={{
                                        borderRadius: '5px',
                                        boxShadow: '2px 2px 5px gray'
                                    }}
                                    onClick={() => {
                                        setSelectGame(true)
                                    }}
                                />
                                <Typography sx={{ fontSize: '14px' }}>
                                    เล่นเกมส์
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <img src={"https://angpaos.games/wp-content/uploads/2023/03/2Admin-auto.jpg"}
                                    width={'95%'}
                                    height={115}
                                    style={{
                                        borderRadius: '5px',
                                        boxShadow: '2px 2px 5px gray'
                                    }}
                                    onClick={() => {
                                        setSelectGame(true)
                                    }}
                                />
                                <Typography sx={{ fontSize: '14px' }}>
                                    แจ้งปัญหา
                                </Typography>
                            </Grid>

                        </Grid>
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: 'none', md: "block" }, }}>
                        <Grid container spacing={1} sx={{ p: 1, textAlign: "center" }}>
                            <Grid item xs={6} >
                                <img src={"https://angpaos.games/wp-content/uploads/2023/03/2Playgame-auto.jpg"}
                                    width={'95%'}
                                    height={126}
                                    style={{
                                        borderRadius: '5px',
                                        boxShadow: '2px 2px 5px gray'
                                    }}
                                    onClick={() => {
                                        setSelectGame(true)
                                    }}
                                />
                                <Typography sx={{ fontSize: '14px' }}>
                                    เล่นเกมส์
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <img src={"https://angpaos.games/wp-content/uploads/2023/03/2Admin-auto.jpg"}
                                    width={'95%'}
                                    height={126}
                                    style={{
                                        borderRadius: '5px',
                                        boxShadow: '2px 2px 5px gray'
                                    }}
                                    onClick={() => {
                                        setSelectGame(true)
                                    }}
                                />
                                <Typography sx={{ fontSize: '14px' }}>
                                    แจ้งปัญหา
                                </Typography>
                            </Grid>

                        </Grid>
                    </Box>
                    <Grid container spacing={1} sx={{ p: 2, mt: 1, mb: 7 }} item md={12}>
                        <Grid item xs={12} md={12}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item md={3}>
                                    <Typography sx={{ color: "#000" }}>โปรโมชัน</Typography>
                                </Grid>
                                <Grid item md={2}>
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
                                                        {/* <Image alt="banner" src={item} width={600} height={350} /> */}
                                                    </Box>
                                                    <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
                                                        <img src={item.img_url} width={260} height={100} style={{ borderRadius: '5px' }} />
                                                        {/* <Image alt="banner" src={item} width={350} height={180} /> */}
                                                    </Box>
                                                    <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                                                        <img src={item.img_url} width={190} height={90} style={{ borderRadius: '5px' }} />
                                                        {/* <Image alt="banner" src={item} width={400} height={200} /> */}
                                                    </Box>
                                                </SwiperSlide>
                                            </>
                                        ))}
                                    </Swiper>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* <Grid item md={6}>
           <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
           >
              <Grid item md={3}>
                 <Typography sx={{ color: "#000" }}>เกม</Typography>
              </Grid>
              <Grid item md={3}>
                 <Grid container>
                    <Typography sx={{ color: "#000" }}>ดูทั้งหมด</Typography>
                    <ChevronRightIcon sx={{ color: "#000" }} />
                 </Grid>
              </Grid>
           </Grid>

           <Grid sx={{ mt: 2, ml: 1 }}>
              <Image src={ban} alt="banner" />
           </Grid>
        </Grid> */}
                    </Grid>
                </Box> :
                <Box>
                    <Grid container sx={{ pl: 2 }}>
                        <ArrowBackIosIcon fontSize='small' sx={{ my: 1 }} onClick={() => setSelectGame(false)} />
                        <Typography sx={{ fontSize: '14px', mt: 1 }} onClick={() => setSelectGame(false)}  >ย้อนกลับ</Typography>
                    </Grid>
                    <Grid container spacing={1} sx={{ p: 1, textAlign: "center" }}>
                        {gameType.map((item) => (
                            <>
                                {/* <Button
                           sx={{ mt: 1, height: '80px', width: '90%', borderRadius: '20px' }}
                           onClick={() => {
                              console.log('item.sub_game_type', item.sub_game_type)
                              setSubGameType(item.sub_game_type)
                           }}
                        >
                           <Box >
                              <img src={item.type_logo} width={80} height={80} style={{ borderRadius: '20px' }} />
                           </Box>
                        </Button> */}
                                <Grid item xs={6} md={3}>
                                    <img src={item.type_logo} width={80} height={80} style={{ borderRadius: '20px' }} />

                                </Grid>


                            </>
                        ))}
                    </Grid>
                </Box>
            }

            <LoadingModal open={loading} />
        </>
    )
}

export default Home