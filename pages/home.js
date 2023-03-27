import {
   Box,
   Button,
   Divider,
   Grid,
   Paper,
   Typography,
   BottomNavigation,
   BottomNavigationAction,
   Skeleton,
   IconButton,
   DialogTitle,
   DialogContentText,
   DialogContent,
   DialogActions,
   Dialog,
   TextField, Table, TableRow, TableCell, Avatar
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import { signOut } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/store";
import hostname from "../utils/hostname";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import rank1 from '../assets/rank-1.png'
import AppsIcon from "@mui/icons-material/Apps";
import HomeComponent from "../components/page/home";
import DepositComponent from "../components/page/deposit";
import WithdrawComponent from "../components/page/withdraw";
import HistoryComponent from "../components/page/history";
import withAuth from "../routes/withAuth";
import LoadingModal from '../theme/LoadingModal'
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function Home({ children }) {
   const router = useRouter();
   const dispatch = useAppDispatch();
   const [value, setValue] = useState(0);
   const [credit, setCredit] = useState({});
   const [logo, setLogo] = useState([])
   const [profile, setProfile] = useState({})
   const [page, setPage] = useState('home')
   const [loading, setLoading] = useState(false)
   const [openDialog, setOpenDialog] = useState(false)

   const getProfile = async () => {
      setLoading(true)
      try {
         let credit = await axios({
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            method: "get",
            url: `${hostname}/user/credit`,
         });

         let profile = await axios({
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            method: "get",
            url: `${hostname}/user/profile`,
         });

         setProfile(profile.data);

         setCredit(credit.data);
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

   const getLogo = async () => {
      setLoading(true)
      try {
         let res = await axios({
            method: "get",
            url: `${hostname}/menu/get_web_setting_logo`,
         });



         setLogo(res.data);
         setLoading(false)
      } catch (error) {
         console.log(error);
      }
   };



   useEffect(() => {
      getProfile()
      getLogo()
   }, [])

   return (
      <div>
         <CssBaseline />
         {/* ------------ on Mobile ------------ */}
         <Box
            sx={{
               display: { xs: "block", md: "none" },
            }}
         >
            {/* ----- header ----- */}

            <Grid
               container
               direction="row"
               justifyContent="start"
               alignItems="center"
            >
               <Grid item xs={6} >
                  <Box sx={{ pl: 1, mt: 1 }}>
                     <img src={logo[0]?.img_url} width={70} height={45} />
                  </Box>
               </Grid>
               <Grid container justifyContent="flex-end"
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
               </Grid>

            </Grid>

            <Box sx={{ m: 1, mt: 0 }}>
               <Paper
                  sx={{
                     // background:
                     //   "linear-gradient(to right,#01B843,#00A598,#00A2A4, #009BC5)",
                     background: "linear-gradient(#0072B1, #41A3E3)",
                     p: 2,
                     width: "100%",
                  }}
               >
                  <Grid container>
                     <Box sx={{ textAlign: "center", mt: 1 }}>
                        <Typography sx={{ color: "#fff" }}>User :</Typography>
                     </Box>
                     <Box sx={{ textAlign: "center", mt: 1, mx: 1 }}>
                        <Typography align="center" sx={{ color: "#fff" }}>
                           {profile.tel ? (
                              profile.tel
                           ) : (
                              <Skeleton
                                 variant="text"
                                 sx={{ fontSize: "1rem", minWidth: "100px" }}
                              />
                           )}
                        </Typography>
                     </Box>
                     <Box>
                        <IconButton>
                           {/* <CopyToClipboard text={profile.sb_username}>
                            <ContentCopyIcon color="white" />
                         </CopyToClipboard> */}
                        </IconButton>
                     </Box>
                  </Grid>
                  <Typography
                     align="start"
                     sx={{ color: "#fff", mt: 2, fontSize: "13px" }}
                  >
                     เงินในวอลเล็ท (บาท)
                  </Typography>
                  <Grid container justifyContent="space-between">
                     {credit !== undefined ? (
                        <Typography
                           variant="h6"
                           sx={{ color: "#fff", textAlign: "left" }}
                        >
                           {Intl.NumberFormat("THB").format(credit)} ฿{" "}
                        </Typography>
                     ) : (
                        <Skeleton
                           variant="text"
                           sx={{ fontSize: "1rem", minWidth: "80px" }}
                        />
                     )}
                     <Button
                        variant="contained"
                        sx={{ bgcolor: "#fff", borderRadius: 50 }}
                        size="small"
                        onClick={() => {
                           setOpenDialog(true)
                        }}
                     >
                        <PersonOutlineIcon
                           sx={{ color: "#00897b", mr: "3px" }}
                        />
                        <Typography sx={{ color: "#000", fontWeight: 100, fontSize: '12px' }}>
                           ข้อมูลส่วนตัว
                        </Typography>
                     </Button>
                  </Grid>
               </Paper>
            </Box>

            <Box sx={{ m: 1 }}>
               <Paper sx={{ background: "linear-gradient(#0072B1, #41A3E3)", p: 1, width: "100%" }}>
                  <Grid container>
                     <Grid item sx={{ mt: 1 }}>
                        <Image src={rank1} alt="diamond" width={60} height={50} />
                     </Grid>
                     <Grid item sx={{ ml: 1, mt: 1 }}>
                        <Typography sx={{ color: "#fff" }}>
                           Diamond
                        </Typography>
                        <Typography sx={{ color: "#fff", fontSize: "10px", mt: 1 }}>
                           เติม 1000฿ จะได้ Commander
                        </Typography>
                     </Grid>
                     <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ color: "white", bgcolor: "white", mx: 1 }}
                     />
                     <Grid item sx={{ ml: 1, mt: 1 }}>
                        <Grid container>
                           <AppsIcon sx={{ color: "white" }} />
                           <Typography sx={{ mx: 1, color: "white", fontSize: "14px" }}>
                              500 pts
                           </Typography>
                        </Grid>
                        <Typography sx={{ mt: 1, ml: 1, fontSize: "10px", color: "white" }}>
                           450 pts จะหมดอายุ
                        </Typography>
                     </Grid>
                  </Grid>
               </Paper>
            </Box>


            {/* ----- body ----- */}
            <Box sx={{
               // backgroundImage: `url('https://cdn.softkingdoms.sgp1.digitaloceanspaces.com/BKSCAN.jpg')`,
               // backgroundPosition: 'center',
               // backgroundSize: 'cover',
               // backgroundRepeat: 'no-repeat',
               display: { xs: "block", md: "none" },
            }}>
               {/* {children} */}
               {page === 'home' ? <HomeComponent /> :
                  page === 'deposit' ? <DepositComponent bank_number={profile.bank_number} bank_name={profile.bank_name} /> :
                     page === 'withdraw' ? <WithdrawComponent /> :
                        page === 'history' ? <HistoryComponent /> : ''}


            </Box>



            {/* ----- footer ----- */}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }} elevation={3}>
               <BottomNavigation
                  showLabels
                  value={value}
                  sx={{
                     background: "linear-gradient(#41A3E3, #0072B1)", borderTopLeftRadius: '30px', borderTopRightRadius: '30px',
                     '& .Mui-selected': {
                        '& .MuiBottomNavigationAction-label': {
                           color: '#fff'
                        },
                        '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                           color: '#fff'
                        }
                     }
                  }}
                  onChange={(event, newValue) => {
                     setValue(newValue);
                  }}
               >
                  <BottomNavigationAction label="หน้าหลัก" value="home" icon={<HomeIcon />} onClick={() => setPage('home')} />
                  <BottomNavigationAction label="ฝากเงิน" value="deposit" icon={<PaidIcon />} onClick={() => setPage('deposit')} />
                  <BottomNavigationAction label="ถอนเงิน" value="withdraw" icon={<CurrencyExchangeIcon />} onClick={() => setPage('withdraw')} />
                  <BottomNavigationAction label="ประวัติ" value="history" icon={<ViewListIcon />} onClick={() => setPage('history')} />
               </BottomNavigation>
            </Paper>

         </Box>


         {/* ------------ on Desktop ------------ */}
         <Box
            sx={{
               display: { xs: "none", md: "block" },

            }}
         >
            <Grid container sx={{ mt: 1 }}>
               <Grid item xs={3} />
               <Grid item xs={6}>
                  <Paper elevation={10} sx={{ minHeight: '860px' }}>
                     <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                     >
                        <Grid item xs={6} >
                           <Box sx={{ pl: 1, mt: 1 }}>
                              <img src={logo[0]?.img_url} width={70} height={45} />
                           </Box>
                        </Grid>
                        <Grid container justifyContent="flex-end"
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
                        </Grid>

                     </Grid>


                     <Box sx={{ m: 1, mt: 0 }}>
                        <Paper
                           sx={{
                              // background:
                              //   "linear-gradient(to right,#01B843,#00A598,#00A2A4, #009BC5)",
                              background: "linear-gradient(#0072B1, #41A3E3)",
                              p: 2,
                              width: "100%",
                           }}
                        >
                           <Grid container>
                              <Box sx={{ textAlign: "center", mt: 1 }}>
                                 <Typography sx={{ color: "#fff" }}>User :</Typography>
                              </Box>
                              <Box sx={{ textAlign: "center", mt: 1, mx: 1 }}>
                                 <Typography align="center" sx={{ color: "#fff" }}>
                                    {profile.tel ? (
                                       profile.tel
                                    ) : (
                                       <Skeleton
                                          variant="text"
                                          sx={{ fontSize: "1rem", minWidth: "100px" }}
                                       />
                                    )}
                                 </Typography>
                              </Box>
                              <Box>
                                 <IconButton>
                                    {/* <CopyToClipboard text={profile.sb_username}>
                            <ContentCopyIcon color="white" />
                         </CopyToClipboard> */}
                                 </IconButton>
                              </Box>
                           </Grid>
                           <Typography
                              align="start"
                              sx={{ color: "#fff", mt: 2, fontSize: "13px" }}
                           >
                              เงินในวอลเล็ท (บาท)
                           </Typography>
                           <Grid container justifyContent="space-between">
                              {credit !== undefined ? (
                                 <Typography
                                    variant="h6"
                                    sx={{ color: "#fff", textAlign: "left" }}
                                 >
                                    {Intl.NumberFormat("THB").format(credit)} ฿{" "}
                                 </Typography>
                              ) : (
                                 <Skeleton
                                    variant="text"
                                    sx={{ fontSize: "1rem", minWidth: "80px" }}
                                 />
                              )}
                              <Button
                                 variant="contained"
                                 sx={{ bgcolor: "#fff", borderRadius: 50 }}
                                 size="small"
                                 onClick={() => {
                                    setOpenDialog(true)
                                 }}
                              >
                                 <PersonOutlineIcon
                                    sx={{ color: "#00897b", mr: "3px" }}
                                 />
                                 <Typography sx={{ color: "#000", fontWeight: 100, fontSize: '12px' }}>
                                    ข้อมูลส่วนตัว
                                 </Typography>
                              </Button>
                           </Grid>
                        </Paper>
                     </Box>

                     <Box sx={{ m: 1 }}>
                        <Paper sx={{ background: "linear-gradient(#0072B1, #41A3E3)", p: 1, width: "100%" }}>
                           <Grid container>
                              <Grid item sx={{ mt: 1 }}>
                                 <Image src={rank1} alt="diamond" width={60} height={50} />
                              </Grid>
                              <Grid item sx={{ ml: 1, mt: 1 }}>
                                 <Typography sx={{ color: "#fff" }}>
                                    Diamond
                                 </Typography>
                                 <Typography sx={{ color: "#fff", fontSize: "10px", mt: 1 }}>
                                    เติม 1000฿ จะได้ Commander
                                 </Typography>
                              </Grid>
                              <Divider
                                 orientation="vertical"
                                 flexItem
                                 sx={{ color: "white", bgcolor: "white", mx: 1 }}
                              />
                              <Grid item sx={{ ml: 1, mt: 1 }}>
                                 <Grid container>
                                    <AppsIcon sx={{ color: "white" }} />
                                    <Typography sx={{ mx: 1, color: "white", fontSize: "14px" }}>
                                       500 pts
                                    </Typography>
                                 </Grid>
                                 <Typography sx={{ mt: 1, ml: 1, fontSize: "10px", color: "white" }}>
                                    450 pts จะหมดอายุ
                                 </Typography>
                              </Grid>
                           </Grid>
                        </Paper>
                     </Box>
                     <Box sx={{ display: { xs: "none", md: "block" }, }}>
                        {page === 'home' ? <HomeComponent /> :
                           page === 'deposit' ? <DepositComponent /> :
                              page === 'withdraw' ? <WithdrawComponent /> :
                                 page === 'history' ? <HistoryComponent /> : ''}
                     </Box>

                  </Paper>

               </Grid>
               <Grid item xs={3} />
            </Grid>

            <Grid container >
               <Grid item xs={3} />

               <Grid item xs={6}>
                  <Box sx={{ mt: 1 }} >
                     <BottomNavigation
                        showLabels
                        value={value}
                        sx={{
                           background: "linear-gradient(#41A3E3, #0072B1)", borderTopLeftRadius: '30px', borderTopRightRadius: '30px',
                           '& .Mui-selected': {
                              '& .MuiBottomNavigationAction-label': {
                                 color: '#fff'
                              },
                              '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                                 color: '#fff'
                              }
                           }
                        }}
                        onChange={(event, newValue) => {
                           setValue(newValue);
                        }}
                     >
                        <BottomNavigationAction label="หน้าหลัก" value="home" icon={<HomeIcon />} onClick={() => setPage('home')} />
                        <BottomNavigationAction label="ฝากเงิน" value="deposit" icon={<PaidIcon />} onClick={() => setPage('deposit')} />
                        <BottomNavigationAction label="ถอนเงิน" value="withdraw" icon={<CurrencyExchangeIcon />} onClick={() => setPage('withdraw')} />
                        <BottomNavigationAction label="ประวัติ" value="history" icon={<ViewListIcon />} onClick={() => setPage('history')} />
                     </BottomNavigation>
                  </Box>
               </Grid>
               <Grid item xs={3} />
            </Grid>



         </Box>




         <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            fullWidth
            maxWidth='md'

         >
            <DialogTitle >
               <Typography sx={{ color: '#41A3E3', fontSize: '18px' }}> ข้อมูลส่วนตัว</Typography>
            </DialogTitle>
            <DialogContent >
               <Grid container justifyContent='center'>
                  <Avatar
                     sx={{ width: 80, height: 80, my: 2 }}
                  >H</Avatar>
               </Grid>
               <Table sx={{ border: '1px solid #eee' }}>
                  <TableRow>
                     <TableCell
                        sx={{ fontWeight: "bold", border: '1px solid #eee' }}
                        variant="head"
                     >
                        ชื่อผู้ใช้งาน
                     </TableCell>
                     <TableCell>{profile.username}</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell
                        sx={{ fontWeight: "bold", border: '1px solid #eee' }}
                        variant="head"
                     >
                        เครดิตคงเหลือ
                     </TableCell>
                     <TableCell>{profile.credit}</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell
                        sx={{ fontWeight: "bold", border: '1px solid #eee' }}
                        variant="head"
                     >
                        โทรศัพท์
                     </TableCell>
                     <TableCell>{profile.tel}</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell
                        sx={{ fontWeight: "bold", border: '1px solid #eee' }}
                        variant="head"
                     >
                        ธนาคาร
                     </TableCell>
                     <TableCell>
                        <Grid container >
                           <Grid item xs={3}>
                              {profile.bank_name === "kbnk" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/kbnk.png"
                                    }
                                    alt="kbnk"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "truemoney" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/truemoney.png"
                                    }
                                    alt="truemoney"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "ktba" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/ktba.png"
                                    }
                                    alt="ktba"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "scb" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/scb.png"
                                    }
                                    alt="scb"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "bay" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/bay.png"
                                    }
                                    alt="bay"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "bbla" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/bbl.png"
                                    }
                                    alt="bbla"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "gsb" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/gsb.png"
                                    }
                                    alt="gsb"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "ttb" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/ttb.png"
                                    }
                                    alt="ttb"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "bbac" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/baac.png"
                                    }
                                    alt="bbac"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "icbc" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/icbc.png"
                                    }
                                    alt="icbc"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "tcd" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/tcd.png"
                                    }
                                    alt="tcd"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "citi" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/citi.png"
                                    }
                                    alt="citi"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "scbt" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/scbt.png"
                                    }
                                    alt="scbt"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "cimb" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/cimb.png"
                                    }
                                    alt="cimb"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "uob" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/uob.png"
                                    }
                                    alt="uob"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "hsbc" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/hsbc.png"
                                    }
                                    alt="hsbc"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "mizuho" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/mizuho.png"
                                    }
                                    alt="mizuho"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "ghb" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/ghb.png"
                                    }
                                    alt="ghb"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "lhbank" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/lhbank.png"
                                    }
                                    alt="lhbank"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "tisco" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/tisco.png"
                                    }
                                    alt="tisco"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "kkba" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/kkba.png"
                                    }
                                    alt="kkba"
                                    width={50}
                                    height={50}
                                 />
                              ) : profile.bank_name === "ibank" ? (
                                 <Image
                                    src={
                                       "https://angpaos.games/wp-content/uploads/2023/03/ibank.png"
                                    }
                                    alt="ibank"
                                    width={50}
                                    height={50}
                                 />
                              ) : (
                                 ""
                              )}
                           </Grid>
                           <Grid item xs={6} sx={{ ml: 1, mt: '5px' }}>
                              <Typography sx={{fontSize:'14px'}} >
                                 {profile.bank_name === "kbnk"
                                    ? "กสิกรไทย"
                                    : profile.bank_name === "truemoney"
                                       ? "TrueMoney"
                                       : profile.bank_name === "ktba"
                                          ? "กรุงไทย"
                                          : profile.bank_name === "scb"
                                             ? "ไทยพาณิชย์"
                                             : profile.bank_name === "bay"
                                                ? "กรุงศรีอยุธยา"
                                                : profile.bank_name === "bbla"
                                                   ? "กรุงเทพ"
                                                   : profile.bank_name === "gsb"
                                                      ? "ออมสิน"
                                                      : profile.bank_name === "ttb"
                                                         ? "ทหารไทยธนชาต (TTB)"
                                                         : profile.bank_name === "BAAC"
                                                            ? "เพื่อการเกษตรและสหกรณ์การเกษตร"
                                                            : profile.bank_name === "ICBC"
                                                               ? "ไอซีบีซี (ไทย)"
                                                               : profile.bank_name === "TCD"
                                                                  ? "ไทยเครดิตเพื่อรายย่อย"
                                                                  : profile.bank_name === "CITI"
                                                                     ? "ซิตี้แบงก์"
                                                                     : profile.bank_name === "SCBT"
                                                                        ? "สแตนดาร์ดชาร์เตอร์ด (ไทย)"
                                                                        : profile.bank_name === "CIMB"
                                                                           ? "ซีไอเอ็มบีไทย"
                                                                           : profile.bank_name === "UOB"
                                                                              ? "ยูโอบี"
                                                                              : profile.bank_name === "HSBC"
                                                                                 ? "เอชเอสบีซี ประเทศไทย"
                                                                                 : profile.bank_name === "MIZUHO"
                                                                                    ? "มิซูโฮ คอร์ปอเรต"
                                                                                    : profile.bank_name === "GHB"
                                                                                       ? "อาคารสงเคราะห์"
                                                                                       : profile.bank_name === "LHBANK"
                                                                                          ? "แลนด์ แอนด์ เฮ้าส์"
                                                                                          : profile.bank_name === "TISCO"
                                                                                             ? "ทิสโก้"
                                                                                             : profile.bank_name === "kkba"
                                                                                                ? "เกียรตินาคิน"
                                                                                                : profile.bank_name === "IBANK"
                                                                                                   ? "อิสลามแห่งประเทศไทย"
                                                                                                   : ""
                                 }
                              </Typography>
                           </Grid>
                        </Grid></TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell
                        sx={{ fontWeight: "bold", border: '1px solid #eee' }}
                        variant="head"
                     >
                        เลขบัญชี
                     </TableCell>
                     <TableCell >{profile.bank_number}</TableCell>
                  </TableRow>
               </Table>

            </DialogContent>
            <DialogActions>
               <Button variant="outlined" onClick={() => setOpenDialog(false)} >
                  ปิด
               </Button>
            </DialogActions>
         </Dialog>

         <LoadingModal open={loading} />
      </div >
   );
}

export default withAuth(Home);
