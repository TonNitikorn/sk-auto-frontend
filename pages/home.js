import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
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
    //     }, 3000);
    // }, [])
    const images = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
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
                    modules={[FreeMode, Navigation, Thumbs ,Autoplay]}
                    className="mySwiper"
                >
                    {images.map((item) => (
                        <SwiperSlide>
                            <Box sx={{borderRadius:"100px"}}>
                                <Image alt="banner" src={item} width={600} height={350} />
                            </Box>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </Box>

            <LoadingModal open={loading} />
        </Layout >
    )
}

export default withAuth(home)