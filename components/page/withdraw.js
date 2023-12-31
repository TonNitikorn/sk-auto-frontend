import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    TextField
} from "@mui/material";
import scbL from "../../assets/scbL.png";
import Image from "next/image";
import Swal from "sweetalert2";
import LoadingModal from '../../theme/LoadingModal'
import axios from "axios";
import { hostname } from "../../utils/hostname";
import { useRouter } from "next/router";
import { signOut } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/store";
import CurrencyInput from 'md-react-currency-input';

function WithdrawComponent(props) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [price, setPrice] = useState(0)
    const [loading, setLoading] = useState(false)


    const getCredit = async () => {
        try {
            let credit = await axios({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                method: "get",
                url: `${hostname}/user/credit`,
            });

            props.setCredit(credit.data)

        } catch (error) {

        }
    }

    const withdraw = async () => {
        setLoading(true)
        try {
            let res = await axios({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                method: "post",
                url: `${hostname}/transaction/withdraw_request`,
                data: {
                    'amount': price
                }
            });

            if (res.data.message === "Success") {
                setLoading(false)
                getCredit()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'สร้างรายการถอนสำเร็จ',
                    showConfirmButton: false,
                    timer: 2000
                })
            }

        } catch (error) {
            console.log(error);
            setLoading(false)
            if (
                error.response.status === 400 &&
                error.response.data.error.message === "เครดิตไม่เพียงพอ"
            ) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'เครดิตไม่เพียงพอ',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            if (
                error.response.status === 401 &&
                error.response.data.error.message === "Unauthorized"
            ) {
                dispatch(signOut());
                localStorage.clear();
                router.push("/auth/login");
            }
        }
    }

    const handelwithdraw = () => {
        if (!price || price === "0") {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'กรุณากรอกจำนวนเงิน',
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            Swal.fire({
                title: "ยืนยันการทำรายการ",
                text: `ท่านต้องการถอนเครดิตจำนวน ${Intl.NumberFormat("THB").format(price)} ฿`,
                icon: "info",
                showCancelButton: true,
                cancelButtonColor: "#EB001B",
                confirmButtonColor: "#0072B1",
                cancelButtonText: "ยกเลิก",
                confirmButtonText: "ยืนยัน",
            }).then((result) => {
                if (result.isConfirmed) {
                    withdraw();

                }
            });
        }
    };


    const amount = [100, 200, 300, 500, 1000, 2000, 5000, 10000]

    return (
        <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>ถอนเครดิต</Typography>
            <Typography sx={{ fontSize: '12px' }}>เลือกจำนวนเครดิต</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {amount.map((item) => (
                    <>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    p: 1,
                                    bgcolor: '#0072B1'
                                }}
                                onClick={() => setPrice(item)}
                            >
                                <Typography
                                    sx={{ textAlign: "center", color: "#fff" }}
                                >
                                    {Intl.NumberFormat("THB").format(item)}
                                </Typography>
                            </Button>
                        </Grid>
                    </>
                ))}
            </Grid>
            <Typography sx={{ mt: 4, mb: 2 }}>
                ระบุจำนวนที่ต้องการถอน
            </Typography>

            <CurrencyInput
                className="currencyInput"
                sx={{ bgcolor: "#000", borderRadius: 2, height: "20px" }}
                value={price || ""} onChangeEvent={(e) => setPrice(e.target.value)} precision="0" />

            <Typography sx={{ color: "#aaa", mt: 1, mb: 2, fontSize: "12px" }}>
                ถอนไม่มีขั้นต่ำ
            </Typography>
            <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => handelwithdraw()}
                sx={{
                    mt: 1,
                    mb: 8,
                    bgcolor: "#41A3E3",
                    color: 'white'
                }}
            >
                ถอนเงิน
            </Button>
            <LoadingModal open={loading} />

        </Box>
    )
}

export default WithdrawComponent