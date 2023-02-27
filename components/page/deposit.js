import React, { useState, useEffect } from "react";
import Layout from '../../theme/Layout'
import {
    Grid,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import Image from 'next/image';
import kbank from "../../assets/kbank.png";
import scbL from "../../assets/scbL.png";
import trueL from "../../assets/trueL.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CardBankRank from "../../components/CardBankRank";
import axios from "axios";
import hostname from "../../utils/hostname";
import LoadingModal from '../../theme/LoadingModal'

function DepositComponent() {
    const [open, setOpen] = useState(false);
    const [bank, setBank] = useState([])
    const [profileDeposit, setProfileDeposit] = useState({})
    const [loading, setLoading] = useState(false)

    const handleTooltipOpen = () => {
        setOpen(true);
    };


    const getBank = async () => {
        setLoading(true)
        try {
            let res = await axios({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                method: "get",
                url: `${hostname}/bank/bank_deposit`,
            });

            setBank(res.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            // if (
            //   error.response.status === 401 &&
            //   error.response.data === "Unauthorized"
            // ) {
            //   dispatch(signOut());
            //   localStorage.clear();
            //   router.push("/auth/login");
            // }
        }
    };

    useEffect(() => {
        getBank()
    }, [])

    return (
        <Box sx={{ m: 2, mb: 10 }}>
            <Box sx={{
                pb: 9,
                backgroundImage: `url('https://cdn.softkingdoms.sgp1.digitaloceanspaces.com/BKSCAN.jpg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', my: 3 }}>เติมเครดิต</Typography>
                {bank.map((item) => (
                    <>
                        <Box sx={{ my: 3 }}>
                            <Box
                                sx={{
                                    borderRadius: 4,
                                    bgcolor: '#fff',
                                    border: "2px solid #41A3E3",
                                    py: "30px"
                                }}
                            >
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Grid item xs={3}>
                                        <Box sx={{ ml: 4 }}>
                                            <Image src={kbank} alt="kbank" width="100%" height="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <Typography sx={{ color: '#0B5FAD', fontSize: '14px', pl: 3 }}>{item.bank_name} (กสิกรไทย)</Typography>
                                        <Typography sx={{ color: '#0B5FAD', fontSize: '16px', fontWeight: 'bold', my: "2px", pl: 3 }}>{item.bank_number}</Typography>
                                        <Typography sx={{ color: '#0B5FAD', fontSize: '12px', pl: 3 }}>{item.bank_account_name}</Typography>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <IconButton onClick={handleTooltipOpen}>
                                            <CopyToClipboard text={"bank_number"}>
                                                <ContentCopyIcon color="black" />
                                            </CopyToClipboard>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Box>
                    </>
                ))}

                <Typography sx={{ my: 3, fontSize: '12px' }}>โปรดใช้บัญชี {profileDeposit.bank_name} <b>{profileDeposit.bank_number}</b> โอนมาเท่านั้น</Typography>
            </Box>
            <LoadingModal open={loading} />
        </Box>
    )
}

export default DepositComponent