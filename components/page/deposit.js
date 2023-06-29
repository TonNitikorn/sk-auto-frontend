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
import WarningIcon from '@mui/icons-material/Warning';

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
                                    backgroundImage: `url("https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1688026186261-2BG-Bank.jpg")`,
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
                                            {item.bank_name === "kbnk" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509600962-kbnk.png"
                                                    }
                                                    alt="kbnk"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "truemoney" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509654967-truemoney.png"
                                                    }
                                                    alt="truemoney"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "ktb" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509722840-ktb.png"
                                                    }
                                                    alt="ktb"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "scb" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509747475-scb.png"
                                                    }
                                                    alt="scb"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "bay" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509778211-bay.png"
                                                    }
                                                    alt="bay"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "bbl" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509796809-bbl.png"
                                                    }
                                                    alt="bbl"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "gsb" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509823709-gsb.png"
                                                    }
                                                    alt="gsb"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "ttb" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509868094-ttb.png"
                                                    }
                                                    alt="ttb"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "bbac" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509885549-baac.png"
                                                    }
                                                    alt="bbac"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "icbc" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509907708-icbt.png"
                                                    }
                                                    alt="icbc"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "tcd" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509929380-tcd.png"
                                                    }
                                                    alt="tcd"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "citi" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509949540-citi.png"
                                                    }
                                                    alt="citi"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "scbt" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509967883-scbt.png"
                                                    }
                                                    alt="scbt"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "cimb" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687509984083-cimb.png"
                                                    }
                                                    alt="cimb"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "uob" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687510000397-uob.png"
                                                    }
                                                    alt="uob"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "hsbc" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687510018318-hsbc.png"
                                                    }
                                                    alt="hsbc"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "mizuho" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687510037176-mizuho.png"
                                                    }
                                                    alt="mizuho"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "ghb" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687510067372-ghb.png"
                                                    }
                                                    alt="ghb"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "lhbank" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687510092134-lhbank.png"
                                                    }
                                                    alt="lhbank"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "tisco" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687510111592-tisco.png"
                                                    }
                                                    alt="tisco"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "kkba" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687510132080-kkba.png"
                                                    }
                                                    alt="kkba"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : item.bank_name === "ibank" ? (
                                                <Image
                                                    src={
                                                        "https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1687510150924-ibank.png"
                                                    }
                                                    alt="ibank"
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : (
                                                ""
                                            )}

                                            {/* <Image src={kbankL} alt="kbank" width="100%" height="100%" /> */}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <Typography sx={{ fontSize: '14px', pl: 3 }} >
                                            {item.bank_name === "kbnk"
                                                ? "กสิกรไทย"
                                                : item.bank_name === "truemoney"
                                                    ? "TrueMoney"
                                                    : item.bank_name === "ktb"
                                                        ? "กรุงไทย"
                                                        : item.bank_name === "scb"
                                                            ? "ไทยพาณิชย์"
                                                            : item.bank_name === "bay"
                                                                ? "กรุงศรีอยุธยา"
                                                                : item.bank_name === "bbl"
                                                                    ? "กรุงเทพ"
                                                                    : item.bank_name === "gsb"
                                                                        ? "ออมสิน"
                                                                        : item.bank_name === "ttb"
                                                                            ? "ทหารไทยธนชาต (TTB)"
                                                                            : item.bank_name === "BAAC"
                                                                                ? "เพื่อการเกษตรและสหกรณ์การเกษตร"
                                                                                : item.bank_name === "ICBC"
                                                                                    ? "ไอซีบีซี (ไทย)"
                                                                                    : item.bank_name === "TCD"
                                                                                        ? "ไทยเครดิตเพื่อรายย่อย"
                                                                                        : item.bank_name === "CITI"
                                                                                            ? "ซิตี้แบงก์"
                                                                                            : item.bank_name === "SCBT"
                                                                                                ? "สแตนดาร์ดชาร์เตอร์ด (ไทย)"
                                                                                                : item.bank_name === "CIMB"
                                                                                                    ? "ซีไอเอ็มบีไทย"
                                                                                                    : item.bank_name === "UOB"
                                                                                                        ? "ยูโอบี"
                                                                                                        : item.bank_name === "HSBC"
                                                                                                            ? "เอชเอสบีซี ประเทศไทย"
                                                                                                            : item.bank_name === "MIZUHO"
                                                                                                                ? "มิซูโฮ คอร์ปอเรต"
                                                                                                                : item.bank_name === "GHB"
                                                                                                                    ? "อาคารสงเคราะห์"
                                                                                                                    : item.bank_name === "LHBANK"
                                                                                                                        ? "แลนด์ แอนด์ เฮ้าส์"
                                                                                                                        : item.bank_name === "TISCO"
                                                                                                                            ? "ทิสโก้"
                                                                                                                            : item.bank_name === "kkba"
                                                                                                                                ? "เกียรตินาคิน"
                                                                                                                                : item.bank_name === "IBANK"
                                                                                                                                    ? "อิสลามแห่งประเทศไทย"
                                                                                                                                    : ""
                                            }
                                        </Typography>
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
                <Grid container sx={{ mt: 3, }}>
                    <WarningIcon color='warning' />
                    <Typography sx={{ ml: 1, mt: '6px', fontSize: '12px' }}> โปรดใช้บัญชี 
                         {bank_name === "kbnk"
                            ? " กสิกรไทย"
                            : bank_name === "truemoney"
                                ? " TrueMoney"
                                : bank_name === "ktb"
                                    ? " กรุงไทย"
                                    : bank_name === "scb"
                                        ? " ไทยพาณิชย์"
                                        : bank_name === "bay"
                                            ? " กรุงศรีอยุธยา"
                                            : bank_name === "bbl"
                                                ? " กรุงเทพ"
                                                : bank_name === "gsb"
                                                    ? " ออมสิน"
                                                    : bank_name === "ttb"
                                                        ? " ทหารไทยธนชาต (TTB)"
                                                        : bank_name === "BAAC"
                                                            ? " เพื่อการเกษตรและสหกรณ์การเกษตร"
                                                            : bank_name === "ICBC"
                                                                ? " ไอซีบีซี (ไทย)"
                                                                : bank_name === "TCD"
                                                                    ? " ไทยเครดิตเพื่อรายย่อย"
                                                                    : bank_name === "CITI"
                                                                        ? " ซิตี้แบงก์"
                                                                        : bank_name === "SCBT"
                                                                            ? " สแตนดาร์ดชาร์เตอร์ด (ไทย)"
                                                                            : bank_name === "CIMB"
                                                                                ? " ซีไอเอ็มบีไทย"
                                                                                : bank_name === "UOB"
                                                                                    ? " ยูโอบี"
                                                                                    : bank_name === "HSBC"
                                                                                        ? " เอชเอสบีซี ประเทศไทย"
                                                                                        : bank_name === "MIZUHO"
                                                                                            ? " มิซูโฮ คอร์ปอเรต"
                                                                                            : bank_name === "GHB"
                                                                                                ? " อาคารสงเคราะห์"
                                                                                                : bank_name === "LHBANK"
                                                                                                    ? " แลนด์ แอนด์ เฮ้าส์"
                                                                                                    : bank_name === "TISCO"
                                                                                                        ? " ทิสโก้"
                                                                                                        : bank_name === "kkba"
                                                                                                            ? " เกียรตินาคิน"
                                                                                                            : bank_name === "IBANK"
                                                                                                                ? " อิสลามแห่งประเทศไทย"
                                                                                                                : ""
                        } <b>{bank_number}</b> โอนมาเท่านั้น</Typography>

                </Grid>
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