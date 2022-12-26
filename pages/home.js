import React, { useState, useEffect } from 'react'
import { Box, Grid, Button, Typography, MenuList, MenuItem } from '@mui/material'
import withAuth from '../routes/withAuth'
import Layout from '../theme/Layout'
import LoadingModal from '../theme/LoadingModal'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from 'next/image'

function home() {
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
        <Layout page="home">
            <Box sx={{ m: 1, mt: 8.5 }}>
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
            <Box sx={{ my: 1 ,mx:1 }}>
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
                                    sx={{ mt: 1, bgcolor: "#7CC6F8", height: '80px', width: '90%' }}

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

            <LoadingModal open={loading} />
        </Layout >
    )
}

export default withAuth(home)