import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Paper
} from "@mui/material";
import Image from "next/image";
import LoadingModal from '../../theme/LoadingModal'
import axios from "axios";
import hostname from "../../utils/hostname";
import { useRouter } from "next/router";
import { signOut } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/store";

function HistoryComponent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([])

    const getHistory = async () => {
        setLoading(true)
        try {
            let res = await axios({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                method: "get",
                url: `${hostname}/transaction/get_transaction_history`,
            });

            let resData = res.data
            setHistory(resData)

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
    }

    useEffect(() => {
        getHistory()
    }, [])



    return (
        <Box sx={{ m: 2, mb: 10 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>ประวัติรายการย้อนหลัง</Typography>
            {history.length === 0 ?
                <Paper sx={{ mt: 1, borderRadius: 5 }}>
                    <Grid container justifyContent="center" sx={{ py: 1, px: 2, bgcolor: '#F1F1F1', borderRadius: "20px 20px 0px 0px" }}>
                        <Typography>ไม่มีประวัติการถฮน </Typography>

                    </Grid>
                    <Grid
                        container
                        justifyContent="flex-end"
                        sx={{ bgcolor: "#D9D9D9", py: 1, px: 2, borderRadius: "0px 0px 20px 20px" }}
                    >
                        <Typography sx={{ color: "#D9D9D9"}}> a </Typography>

                    </Grid>
                </Paper>
                : history.map((item) => (
                    <Paper sx={{ mt: 1, borderRadius: 5 }}>
                        <Grid container justifyContent="space-between" sx={{ py: 1, px: 2, bgcolor: '#F1F1F1', borderRadius: "20px 20px 0px 0px" }}>
                            <Typography>{item.transfer_type === "WITHDRAW" ? 'ถอนเครดิต' : 'เติมเครดิต'} </Typography>
                            <Typography sx={{ color: "green", fontWeight: "bold" }}>
                                +{Intl.NumberFormat("THB").format(item.credit)}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            justifyContent="flex-end"
                            sx={{ bgcolor: "#D9D9D9", py: 1, px: 2, borderRadius: "0px 0px 20px 20px" }}
                        >
                            22 ก.ย. | 07:47
                        </Grid>
                    </Paper>
                ))}




            <LoadingModal open={loading} />

        </Box>
    )
}

export default HistoryComponent