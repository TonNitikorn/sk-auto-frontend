import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Box,
    IconButton, Snackbar
} from "@mui/material";
import Image from 'next/image';
import kbankL from "../../assets/kbankL.png";
import scbL from "../../assets/scbL.png";
import trueL from "../../assets/trueL.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";
import hostname from "../../utils/hostname";
import MuiAlert from "@mui/material/Alert";
import LoadingModal from '../../theme/LoadingModal'
import { useRouter } from "next/router";
import { signOut } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/store";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function DepositComponent(props) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [bank, setBank] = useState([])
    const [loading, setLoading] = useState(false)
    const bank_number = props.bank_number
    const bank_name = props.bank_name
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleClose = (event, reason) => {
        setOpenSnackbar(false);
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
        getBank()
    }, [])

    return (
        <Box sx={{ m: 2, }}>
            <Box sx={{
                pb: 9,
                // backgroundImage: `url('https://cdn.softkingdoms.sgp1.digitaloceanspaces.com/BKSCAN.jpg')`,
                // backgroundPosition: 'center',
                // backgroundSize: 'cover',
                // backgroundRepeat: 'no-repeat',
            }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', my: 3 }}>เติมเครดิต</Typography>
                {bank.map((item) => (
                    <>
                        <Box sx={{ my: 2 }}>
                            <Box
                                sx={{
                                    backgroundImage: `url("https://angpaos.games/wp-content/uploads/2023/03/2BG-Bank.jpg")`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',

                                    borderRadius: 2,
                                    // background: "linear-gradient(#0072B1, #41A3E3)",
                                    py: "30px",
                                    boxShadow: '2px 2px 10px gray'
                                }}
                            >
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Grid item xs={3}>
                                        <Box sx={{ ml: 4 }}>
                                            <Image src={kbankL} alt="kbank" width="100%" height="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <Typography sx={{ fontSize: '14px', pl: 3 }}>{item.bank_name} (กสิกรไทย)</Typography>
                                        <Typography sx={{ fontSize: '18px', my: "5px", pl: 3 }}>{item.bank_number}</Typography>
                                        <Typography sx={{ fontSize: '14px', pl: 3 }}>{item.bank_account_name}</Typography>
                                    </Grid>
                                    <Grid item xs={2} >
                                        <IconButton onClick={handleClickSnackbar}>
                                            <CopyToClipboard text={item.bank_number}>
                                                <ContentCopyIcon />
                                            </CopyToClipboard>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Box>
                    </>
                ))}

                <Typography sx={{ mt: 3, fontSize: '12px' }}>โปรดใช้บัญชี {bank_name} <b>{bank_number}</b> โอนมาเท่านั้น</Typography>
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity="success" sx={{ width: "80%" }}>
                    Copy success !
                </Alert>
            </Snackbar>

            <LoadingModal open={loading} />
        </Box>
    )
}

export default DepositComponent