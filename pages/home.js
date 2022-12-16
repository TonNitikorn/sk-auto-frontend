import React, { useState, useEffect } from 'react'
import { Box, Grid, Button, Typography } from '@mui/material'
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

    return (
        <Layout page="home">
            <Box sx={{ m: 2 }}>
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

                    // navigation={{
                    //     clickable: true
                    // }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {images.map((item) => (
                        <SwiperSlide>
                            <Box >
                                <Image alt="banner" src={item} width={400} height={170} />
                            </Box>
                        </SwiperSlide>

                    ))}
                </Swiper>


            </Box>
            <Box sx={{ mt: 1 }}>
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
                            <Box sx={{ borderRadius: "100px" }}>
                                <Image alt="banner" src={item} width={600} height={350} />
                            </Box>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </Box>

            <Box sx={{ m: 2 }}>
                <Grid container>
                    <Grid item xs={3} container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        // sx={{ bgcolor: 'red' }}
                    >
                        {category.map((item) => (
                            <Button
                                variant="contained"
                                // fullWidth
                                sx={{ mt: 1, bgcolor: "#7CC6F8", height: '65px', width: '80%' }}
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
                    <Grid item xs={9}
                        justifyContent="center"
                        alignItems="flex-start"
                        // sx={{ bgcolor: 'green' }}
                        >

                        {games1.map((item) => (
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