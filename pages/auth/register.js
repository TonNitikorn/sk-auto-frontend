import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
   Button,
   Grid,
   Typography,
   TextField,
   Box,
   MenuItem,
   Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import CssBaseline from "@mui/material/CssBaseline";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import axios from "axios";
import hostname from "../../utils/hostname";
import { register } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/store";

function Register() {
   const router = useRouter()
   const dispatch = useAppDispatch();
   const [rowData, setRowData] = useState({});
   const [loading, setLoading] = useState(false);
   const [tabOtp, setTabOtp] = useState(new Array(6).fill(""))
   const [logo, setLogo] = useState([])
   const [dataOTP, setDataOTP] = useState({})

   const [page, setPage] = useState(0)

   const handleChangeData = async (e) => {
      setRowData({ ...rowData, [e.target.name]: e.target.value });
   };

   const handleChangeOtp = (element, index) => {
      if (isNaN(element.value)) return false

      setTabOtp([...tabOtp.map((d, idx) => (idx === index) ? element.value : d)])

      if (element.nextSibling) {
         element.nextSibling.focus()
      }
   }


   const getLogo = async () => {
      try {
         let res = await axios({
            method: "get",
            url: `${hostname}/menu/get_web_setting_logo`,
         });

         setLogo(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   const sendOTP = async () => {
      // setLoading(true)
      try {
         let res = await axios({
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            method: "post",
            url: `${hostname}/v2/auth/register`,
            data: {
               bank_number: rowData.bank_number,
               bank_name: rowData.bank_name,
               tel: rowData.tel,
               affiliate_by: "-",
               platform: "postman",
            }
         });
         let resData = res.data

         setDataOTP(resData)
         setPage(2)
         // setLoading(false)
      } catch (error) {
         console.log(error);
         // setLoading(false)
         if (
            error.response.data.error.status_code === 401 &&
            error.response.data.error.message === "มีข้อมูลผู้ใช้งานนี้แล้ว"
         ) {
            Swal.fire({
               position: 'center',
               icon: 'warning',
               title: 'มีข้อมูลผู้ใช้งานนี้แล้ว',
               showConfirmButton: false,
               timer: 2000
            })
         }
      }
   }

   useEffect(() => {
      getLogo()
   }, [])


   return (
      <div style={{ padding: "0 2rem" }}>
         <CssBaseline />

         <Grid container direction="row"
            justifyContent="center"
            alignItems="center" >
            <Grid item xs={3}></Grid>
            <Grid item xs={6} sx={{ display: { xs: "none", md: "block" }, }}>
               {
                  page === 0 ?
                     <Box sx={{ mt: 10 }}>
                        <Paper elevation={1} sx={{
                           p: 3,
                           flexGrow: 1,
                           mt: 20,
                           bgcolor: '#fff',
                           borderRadius: 5,
                           boxShadow: '2px 2px 5px #C1B9B9',
                           border: "1px solid #C1B9B9"
                        }}>
                           <Grid
                              container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                           >
                              <Box sx={{ pl: 1, mt: "5px" }}>
                                 <img src={logo[0]?.img_url} width={150} height={90} />
                              </Box></Grid>
                           <Grid container
                              direction="row"
                              justifyContent="center"
                              alignItems="center">
                              <AccountCircleIcon sx={{ color: '#41A3E3' }} />
                              <Typography sx={{ color: "#41A3E3", ml: 1 }}>สมัครสมาชิก</Typography>
                           </Grid>

                           <Grid container
                              direction="column"
                              sx={{ mt: 3 }}>
                              <Typography sx={{ color: "#707070", fontSize: "14px" }}>เบอร์โทรศัพท์</Typography>
                              <TextField
                                 name="tel"
                                 type="text"
                                 value={rowData.tel || ""}
                                 placeholder="เบอร์โทรศัพท์ของท่าน"
                                 fullWidth
                                 size="small"
                                 onChange={(e) => handleChangeData(e)}
                                 variant="outlined"
                                 inputProps={{ maxLength: 10 }}
                                 sx={{ borderRadius: "20px", mt: 1 }}
                              />

                           </Grid>

                           <Grid container
                              direction="row"
                              sx={{ mt: 1 }}>
                              <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>มีบัญชีอยู่แล้ว ?  </Typography>
                              <Button
                                 variant="text"
                                 onClick={() => router.push("/auth/login")}
                              >
                                 <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }} >เข้าสู่ระบบ</Typography>
                              </Button>

                           </Grid>

                           <Grid container
                              direction="column"
                              alignItems='center'
                              justifyContent='center'
                              sx={{ mt: 3 }}>
                              <Typography sx={{ color: "#979797", fontSize: "14px" }}>1/3</Typography>
                           </Grid>
                        </Paper>
                        <Grid
                           container
                           direction="row"
                           justifyContent="space-between"
                           alignItems="center"
                           sx={{ mt: 3 }}
                        >
                           <Button
                              variant="contained"
                              sx={{ bgcolor: '#E4E4E4', borderRadius: 10 }}
                              onClick={() => router.push("/auth/login")}
                           >
                              <KeyboardBackspaceIcon fontSize="small" sx={{ color: '#7C7C7C' }} />
                              <Typography sx={{ color: '#7C7C7C', fontSize: '10px', ml: 1 }}>ย้อนกลับ</Typography>
                           </Button>
                           <Button
                              variant="contained"
                              sx={{ borderRadius: 10 }}
                              onClick={() => {
                                 console.log('rowData.tel', rowData.tel)
                                 if (!rowData.tel) {
                                    Swal.fire({
                                       position: 'center',
                                       icon: 'warning',
                                       title: 'กรุณากรอกเบอร์โทรศัพท์',
                                       showConfirmButton: false,
                                       timer: 1500
                                    })
                                 } else {
                                    setPage(1)
                                 }
                              }
                              }
                           >
                              <Typography sx={{ color: '#fff', fontSize: '10px', mr: 1 }}> {" "}ต่อไป {"  "}</Typography>
                              <EastIcon fontSize="small" sx={{ color: '#fff' }} />
                           </Button>
                        </Grid>
                     </Box>
                     : page === 1 ?
                        <Box sx={{ mt: 10 }}>
                           <Paper elevation={1} sx={{
                              p: 3,
                              flexGrow: 1,
                              mt: 20,
                              bgcolor: '#fff',
                              borderRadius: 5,
                              boxShadow: '2px 2px 5px #C1B9B9',
                              border: "1px solid #C1B9B9"
                           }}>
                              <Grid
                                 container
                                 direction="column"
                                 justifyContent="center"
                                 alignItems="center"
                              >
                                 <Box sx={{ pl: 1, mt: "5px" }}>
                                    <img src={logo[0]?.img_url} width={150} height={90} />
                                 </Box></Grid>
                              <Grid container
                                 direction="row"
                                 justifyContent="center"
                                 alignItems="center">
                                 <AccountCircleIcon sx={{ color: '#41A3E3' }} />
                                 <Typography sx={{ color: "#41A3E3", ml: 1 }}>สมัครสมาชิก</Typography>
                              </Grid>

                              <Grid container
                                 direction="column"
                                 sx={{ mt: 3 }}>
                                 <Typography sx={{ color: "#707070", fontSize: "14px" }}>ธนาคารสำหรับฝาก - ถอนเงิน</Typography>
                                 <TextField
                                    name="bank_name"
                                    type="text"
                                    value={rowData.bank_name || ""}
                                    select
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleChangeData(e)}
                                    variant="outlined"
                                    sx={{ bgcolor: "white", borderRadius: 1 }}
                                 >
                                    <MenuItem selected disabled value>
                                       เลือก ธนาคาร
                                    </MenuItem>
                                    <MenuItem value="kbnk">ธนาคารกสิกรไทย</MenuItem>
                                    <MenuItem value="truemoney">TrueMoney Wallet</MenuItem>
                                    <MenuItem value="ktba">ธนาคารกรุงไทย</MenuItem>
                                    <MenuItem value="scb">ธนาคารไทยพาณิชย์</MenuItem>
                                    <MenuItem value="bay">ธนาคารกรุงศรีอยุธยา</MenuItem>
                                    <MenuItem value="bbla">ธนาคารกรุงเทพ</MenuItem>
                                    <MenuItem value="gsb">ธนาคารออมสิน</MenuItem>
                                    <MenuItem value="ttb">ธนาคารทหารไทยธนชาต (TTB)</MenuItem>
                                    <MenuItem value="BAAC">
                                       ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร
                                    </MenuItem>
                                    <MenuItem value="ICBC">ธนาคารไอซีบีซี (ไทย)</MenuItem>
                                    <MenuItem value="TCD">ธนาคารไทยเครดิตเพื่อรายย่อย</MenuItem>
                                    <MenuItem value="CITI">ธนาคารซิตี้แบงก์</MenuItem>
                                    <MenuItem value="SCBT">ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)</MenuItem>
                                    <MenuItem value="CIMB">ธนาคารซีไอเอ็มบีไทย</MenuItem>
                                    <MenuItem value="UOB">ธนาคารยูโอบี</MenuItem>
                                    <MenuItem value="HSBC">ธนาคารเอชเอสบีซี ประเทศไทย</MenuItem>
                                    <MenuItem value="MIZUHO">ธนาคารมิซูโฮ คอร์ปอเรต</MenuItem>
                                    <MenuItem value="GHB">ธนาคารอาคารสงเคราะห์</MenuItem>
                                    <MenuItem value="LHBANK">ธนาคารแลนด์ แอนด์ เฮ้าส์</MenuItem>
                                    <MenuItem value="TISCO">ธนาคารทิสโก้</MenuItem>
                                    <MenuItem value="kkba">ธนาคารเกียรตินาคิน</MenuItem>
                                    <MenuItem value="IBANK">ธนาคารอิสลามแห่งประเทศไทย</MenuItem>
                                 </TextField>

                                 <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                    หมายเลขบัญชี*
                                 </Typography>
                                 <TextField
                                    name="bank_number"
                                    type="number"
                                    value={rowData.bank_number || ""}
                                    placeholder="000-000-000"
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleChangeData(e)}
                                    variant="outlined"
                                    sx={{ bgcolor: "white", borderRadius: 1 }}
                                 />
                              </Grid>

                              <Grid container
                                 direction="row"
                                 sx={{ mt: 1 }}>
                                 <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>มีบัญชีอยู่แล้ว ?  </Typography>
                                 <Button
                                    variant="text"
                                    onClick={() => router.push("/auth/login")}
                                 >
                                    <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }} >เข้าสู่ระบบ</Typography>
                                 </Button>

                              </Grid>

                              <Grid container
                                 direction="column"
                                 alignItems='center'
                                 justifyContent='center'
                                 sx={{ mt: 3 }}>
                                 <Typography sx={{ color: "#979797", fontSize: "14px" }}>2/3</Typography>
                              </Grid>
                           </Paper>
                           <Grid
                              container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              sx={{ mt: 3 }}
                           >
                              <Button
                                 variant="contained"
                                 sx={{ bgcolor: '#E4E4E4', borderRadius: 10 }}
                                 onClick={() => setPage(0)}
                              >
                                 <KeyboardBackspaceIcon fontSize="small" sx={{ color: '#7C7C7C' }} />
                                 <Typography sx={{ color: '#7C7C7C', fontSize: '10px', ml: 1 }}>ย้อนกลับ</Typography>
                              </Button>
                              <Button
                                 variant="contained"
                                 sx={{ borderRadius: 10 }}
                                 onClick={() => setPage(2)}
                              >
                                 <Typography sx={{ color: '#fff', fontSize: '10px', mr: 1 }}> {" "}ต่อไป {"  "}</Typography>
                                 <EastIcon fontSize="small" sx={{ color: '#fff' }} />
                              </Button>
                           </Grid>
                        </Box>
                        : page === 2 ?
                           <>
                              <Box sx={{ mt: 10 }}>
                                 <Paper elevation={1} sx={{
                                    p: 3,
                                    flexGrow: 1,
                                    mt: 20,
                                    bgcolor: '#fff',
                                    borderRadius: 5,
                                    boxShadow: '2px 2px 5px #C1B9B9',
                                    border: "1px solid #C1B9B9"
                                 }}>
                                    <Grid
                                       container
                                       direction="column"
                                       justifyContent="center"
                                       alignItems="center"
                                    >
                                       <Box sx={{ pl: 1, mt: "5px" }}>
                                          <img src={logo[0]?.img_url} width={150} height={90} />
                                       </Box></Grid>
                                    <Grid container
                                       direction="row"
                                       justifyContent="center"
                                       alignItems="center"><AccountCircleIcon sx={{ color: '#41A3E3' }} />
                                       <Typography sx={{ color: "#41A3E3", ml: 1 }}>สมัครสมาชิก</Typography>
                                    </Grid>

                                    <Grid container
                                       direction="column"
                                       sx={{ mt: 3 }}>
                                       <Typography sx={{ color: "#4B4949", fontSize: "16px" }}>ยืนยันตัวตน OTP</Typography>

                                       <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>ส่งรหัส 6 หลักไปที่ {rowData.tel || ''}</Typography>
                                       <Box sx={{ textAlign: 'center', mt: 2 }}>
                                          {tabOtp.map((data, index) => {
                                             return (
                                                <input
                                                   style={{ width: 30, height: 45, marginLeft: '2%', textAlign: 'center', borderRadius: '10px', border: '1px solid #41A3E3' }}
                                                   type="number"
                                                   name="otp"
                                                   maxLength="1"
                                                   key={index}
                                                   value={data}
                                                   onChange={e => handleChangeOtp(e.target, index)}
                                                   onFocus={e => e.target.select()}
                                                />
                                             )
                                          })}
                                       </Box>
                                       <Typography sx={{ color: "#707070", fontSize: "14px" }}>รหัสอ้างอิง : {dataOTP.refno}</Typography>

                                    </Grid>
                                    <Grid container
                                       direction="row">
                                       <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>ไม่ได้รับรหัส OTP ? ?  </Typography>
                                       <Button
                                          variant="text"
                                          onClick={() => {
                                             sendOTP()
                                          }}
                                       >
                                          <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }} >ส่งรหัสอีกครั้ง</Typography>
                                       </Button>

                                    </Grid>
                                    <Grid
                                       container
                                       direction="row"
                                       justifyContent="center"
                                       alignItems="center"
                                       sx={{ mt: 3 }}
                                    >
                                       <Button
                                          variant="contained"
                                          sx={{ borderRadius: 10 }}
                                          onClick={async () => {
                                             const response = await dispatch(
                                                register({
                                                   tel: rowData.tel,
                                                   bank_number: rowData.bank_number,
                                                   bank_name: rowData.bank_name,
                                                   affiliate_by: "-",
                                                   platform: "postman",
                                                   token: dataOTP.token,
                                                   pin: tabOtp[0] + tabOtp[1] + tabOtp[2] + tabOtp[3] + tabOtp[4] + tabOtp[5]
                                                })
                                             );

                                             if (response.meta.requestStatus === "rejected") {
                                                alert("Login failed");
                                             } else {
                                                setTabOtp([...tabOtp.map(data => "")])
                                                router.push("/home");
                                             }
                                          }}
                                          fullWidth
                                       >
                                          <Typography sx={{ color: '#fff', mr: 1 }}> {" "}ยืนยัน {"  "}</Typography>
                                       </Button>
                                    </Grid>
                                    <Grid container
                                       direction="column"
                                       alignItems='center'
                                       justifyContent='center'
                                       sx={{ mt: 3 }}>
                                       <Typography sx={{ color: "#979797", fontSize: "14px" }}>3/3</Typography>
                                    </Grid>
                                 </Paper>
                                 <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ mt: 3 }}
                                 >
                                    <Button
                                       variant="contained"
                                       sx={{ bgcolor: '#E4E4E4', borderRadius: 10 }}
                                       onClick={() => setPage(1)}
                                    >
                                       <KeyboardBackspaceIcon fontSize="small" sx={{ color: '#7C7C7C' }} />
                                       <Typography sx={{ color: '#7C7C7C', fontSize: '10px', ml: 1 }}>ย้อนกลับ</Typography>
                                    </Button>

                                 </Grid>
                              </Box>
                           </>
                           : ''
               }

            </Grid>
            <Grid item xs={3}></Grid>
         </Grid>

         <Box sx={{ display: { xs: "block", md: "none" }, }}>
            {page === 0 ?
               <Box sx={{ mt: 10 }}>
                  <Paper elevation={1} sx={{
                     p: 3,
                     flexGrow: 1,
                     mt: 20,
                     bgcolor: '#fff',
                     borderRadius: 5,
                     boxShadow: '2px 2px 5px #C1B9B9',
                     border: "1px solid #C1B9B9"
                  }}>
                     <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                     >
                        <Box sx={{ pl: 1, mt: "5px" }}>
                           <img src={logo[0]?.img_url} width={150} height={90} />
                        </Box></Grid>
                     <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <AccountCircleIcon sx={{ color: '#41A3E3' }} />
                        <Typography sx={{ color: "#41A3E3", ml: 1 }}>สมัครสมาชิก</Typography>
                     </Grid>

                     <Grid container
                        direction="column"
                        sx={{ mt: 2 }}>
                        <Typography sx={{ color: "#707070", fontSize: "14px" }}>เบอร์โทรศัพท์</Typography>
                        <TextField
                           name="tel"
                           type="number"
                           value={rowData.tel || ""}
                           placeholder="เบอร์โทรศัพท์ของท่าน"
                           fullWidth
                           size="small"
                           onChange={(e) => handleChangeData(e)}
                           variant="outlined"
                           sx={{ borderRadius: "20px", mt: 1 }}
                        />

                     </Grid>

                     <Grid container
                        direction="row"
                        sx={{ mt: 1 }}>
                        <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>มีบัญชีอยู่แล้ว ?  </Typography>
                        <Button
                           variant="text"
                           onClick={() => router.push("/auth/login")}
                        >
                           <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }} >เข้าสู่ระบบ</Typography>
                        </Button>

                     </Grid>

                     <Grid container
                        direction="column"
                        alignItems='center'
                        justifyContent='center'
                        sx={{ mt: 3 }}>
                        <Typography sx={{ color: "#979797", fontSize: "14px" }}>1/3</Typography>
                     </Grid>
                  </Paper>
                  <Grid
                     container
                     direction="row"
                     justifyContent="space-between"
                     alignItems="center"
                     sx={{ mt: 3 }}
                  >
                     <Button
                        variant="contained"
                        sx={{ bgcolor: '#E4E4E4', borderRadius: 10 }}
                        onClick={() => router.push("/auth/login")}
                     >
                        <KeyboardBackspaceIcon fontSize="small" sx={{ color: '#7C7C7C' }} />
                        <Typography sx={{ color: '#7C7C7C', fontSize: '10px', ml: 1 }}>ย้อนกลับ</Typography>
                     </Button>
                     <Button
                        variant="contained"
                        sx={{ borderRadius: 10 }}
                        onClick={() => {
                           console.log('rowData.tel', rowData.tel)
                           if (!rowData.tel || rowData.tel.length !== 10) {
                              Swal.fire({
                                 position: 'center',
                                 icon: 'warning',
                                 title: 'กรุณากรอกเบอร์โทรศัพท์',
                                 showConfirmButton: false,
                                 timer: 1500
                              })
                           } else {
                              setPage(1)
                           }
                        }}
                     >
                        <Typography sx={{ color: '#fff', fontSize: '10px', mr: 1 }}> {" "}ต่อไป {"  "}</Typography>
                        <EastIcon fontSize="small" sx={{ color: '#fff' }} />
                     </Button>
                  </Grid>
               </Box>
               : page === 1 ?
                  <Box sx={{ mt: 10 }}>
                     <Paper elevation={1} sx={{
                        p: 3,
                        flexGrow: 1,
                        mt: 20,
                        bgcolor: '#fff',
                        borderRadius: 5,
                        boxShadow: '2px 2px 5px #C1B9B9',
                        border: "1px solid #C1B9B9"
                     }}>
                        <Grid
                           container
                           direction="column"
                           justifyContent="center"
                           alignItems="center"
                        >
                           <Box sx={{ pl: 1, mt: "5px" }}>
                              <img src={logo[0]?.img_url} width={150} height={90} />
                           </Box></Grid>
                        <Grid container
                           direction="row"
                           justifyContent="center"
                           alignItems="center">
                           <AccountCircleIcon sx={{ color: '#41A3E3' }} />
                           <Typography sx={{ color: "#41A3E3", ml: 1 }}>สมัครสมาชิก</Typography>
                        </Grid>

                        <Grid container
                           direction="column"
                           sx={{ mt: 3 }}>
                           <Typography sx={{ color: "#707070", fontSize: "14px" }}>ธนาคารสำหรับฝาก - ถอนเงิน</Typography>
                           <TextField
                              name="bank_name"
                              type="text"
                              value={rowData.bank_name || ""}
                              select
                              fullWidth
                              size="small"
                              onChange={(e) => handleChangeData(e)}
                              variant="outlined"
                              sx={{ bgcolor: "white", borderRadius: 1 }}
                           >
                              <MenuItem selected disabled value>
                                 เลือก ธนาคาร
                              </MenuItem>
                              <MenuItem value="kbnk">ธนาคารกสิกรไทย</MenuItem>
                              <MenuItem value="truemoney">TrueMoney Wallet</MenuItem>
                              <MenuItem value="ktba">ธนาคารกรุงไทย</MenuItem>
                              <MenuItem value="scb">ธนาคารไทยพาณิชย์</MenuItem>
                              <MenuItem value="bay">ธนาคารกรุงศรีอยุธยา</MenuItem>
                              <MenuItem value="bbla">ธนาคารกรุงเทพ</MenuItem>
                              <MenuItem value="gsb">ธนาคารออมสิน</MenuItem>
                              <MenuItem value="ttb">ธนาคารทหารไทยธนชาต (TTB)</MenuItem>
                              <MenuItem value="BAAC">
                                 ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร
                              </MenuItem>
                              <MenuItem value="ICBC">ธนาคารไอซีบีซี (ไทย)</MenuItem>
                              <MenuItem value="TCD">ธนาคารไทยเครดิตเพื่อรายย่อย</MenuItem>
                              <MenuItem value="CITI">ธนาคารซิตี้แบงก์</MenuItem>
                              <MenuItem value="SCBT">ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)</MenuItem>
                              <MenuItem value="CIMB">ธนาคารซีไอเอ็มบีไทย</MenuItem>
                              <MenuItem value="UOB">ธนาคารยูโอบี</MenuItem>
                              <MenuItem value="HSBC">ธนาคารเอชเอสบีซี ประเทศไทย</MenuItem>
                              <MenuItem value="MIZUHO">ธนาคารมิซูโฮ คอร์ปอเรต</MenuItem>
                              <MenuItem value="GHB">ธนาคารอาคารสงเคราะห์</MenuItem>
                              <MenuItem value="LHBANK">ธนาคารแลนด์ แอนด์ เฮ้าส์</MenuItem>
                              <MenuItem value="TISCO">ธนาคารทิสโก้</MenuItem>
                              <MenuItem value="kkba">ธนาคารเกียรตินาคิน</MenuItem>
                              <MenuItem value="IBANK">ธนาคารอิสลามแห่งประเทศไทย</MenuItem>
                           </TextField>

                           <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                              หมายเลขบัญชี*
                           </Typography>
                           <TextField
                              name="bank_number"
                              type="number"
                              value={rowData.bank_number || ""}
                              placeholder="000-000-000"
                              fullWidth
                              size="small"
                              onChange={(e) => handleChangeData(e)}
                              variant="outlined"
                              sx={{ bgcolor: "white", borderRadius: 1 }}
                           />
                        </Grid>

                        <Grid container
                           direction="row"
                           sx={{ mt: 1 }}>
                           <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>มีบัญชีอยู่แล้ว ?  </Typography>
                           <Button
                              variant="text"
                              onClick={() => router.push("/auth/login")}
                           >
                              <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }} >เข้าสู่ระบบ</Typography>
                           </Button>

                        </Grid>

                        <Grid container
                           direction="column"
                           alignItems='center'
                           justifyContent='center'
                           sx={{ mt: 3 }}>
                           <Typography sx={{ color: "#979797", fontSize: "14px" }}>2/3</Typography>
                        </Grid>
                     </Paper>
                     <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 3 }}
                     >
                        <Button
                           variant="contained"
                           sx={{ bgcolor: '#E4E4E4', borderRadius: 10 }}
                           onClick={() => setPage(0)}
                        >
                           <KeyboardBackspaceIcon fontSize="small" sx={{ color: '#7C7C7C' }} />
                           <Typography sx={{ color: '#7C7C7C', fontSize: '10px', ml: 1 }}>ย้อนกลับ</Typography>
                        </Button>
                        <Button
                           variant="contained"
                           sx={{ borderRadius: 10 }}
                           onClick={() => {
                              sendOTP()
                              // setPage(2)
                           }}
                        >
                           <Typography sx={{ color: '#fff', fontSize: '10px', mr: 1 }}> {" "}ต่อไป {"  "}</Typography>
                           <EastIcon fontSize="small" sx={{ color: '#fff' }} />
                        </Button>
                     </Grid>
                  </Box>
                  : page === 2 ?
                     <>
                        <Box sx={{ mt: 10 }}>
                           <Paper elevation={1} sx={{ p: 3 }}>
                              <Grid container
                                 direction="row"
                                 justifyContent="center"
                                 alignItems="center"><AccountCircleIcon sx={{ color: '#41A3E3' }} />
                                 <Typography sx={{ color: "#41A3E3", ml: 1 }}>สมัครสมาชิก</Typography>
                              </Grid>

                              <Grid container
                                 direction="column"
                                 sx={{ mt: 3 }}>
                                 <Typography sx={{ color: "#4B4949", fontSize: "16px" }}>ยืนยันตัวตน OTP</Typography>

                                 <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>ส่งรหัส 6 หลักไปที่ {rowData.tel}</Typography>
                                 <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    {tabOtp.map((data, index) => {
                                       return (
                                          <input
                                             style={{ width: 30, height: 45, marginLeft: '2%', textAlign: 'center', borderRadius: '10px', border: '1px solid #41A3E3' }}
                                             type="number"
                                             name="otp"
                                             maxLength="1"
                                             key={index}
                                             value={data}
                                             onChange={e => handleChangeOtp(e.target, index)}
                                             onFocus={e => e.target.select()}
                                          />
                                       )
                                    })}
                                 </Box>
                                 <Typography sx={{ color: "#707070", fontSize: "14px" }}>รหัสอ้างอิง : {dataOTP.refno}</Typography>

                              </Grid>
                              <Grid container
                                 direction="row">
                                 <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>ไม่ได้รับรหัส OTP ? ?  </Typography>
                                 <Button
                                    variant="text"
                                    onClick={() => sendOTP()}
                                 >
                                    <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }} >ส่งรหัสอีกครั้ง</Typography>
                                 </Button>

                              </Grid>
                              <Grid
                                 container
                                 direction="row"
                                 justifyContent="center"
                                 alignItems="center"
                                 sx={{ mt: 3 }}
                              >
                                 <Button
                                    variant="contained"
                                    sx={{ borderRadius: 10 }}
                                    onClick={async () => {
                                       const response = await dispatch(
                                          register({
                                             tel: rowData.tel,
                                             bank_number: rowData.bank_number,
                                             bank_name: rowData.bank_name,
                                             affiliate_by: "-",
                                             platform: "postman",
                                             token: dataOTP.token,
                                             pin: tabOtp[0] + tabOtp[1] + tabOtp[2] + tabOtp[3] + tabOtp[4] + tabOtp[5]
                                          })
                                       );

                                       if (response.meta.requestStatus === "rejected") {
                                          alert("Login failed");
                                       } else {
                                          setTabOtp([...tabOtp.map(data => "")])
                                          router.push("/home");
                                       }
                                    }}
                                    fullWidth
                                 >
                                    <Typography sx={{ color: '#fff', fontSize: '10px', mr: 1 }}> {" "}ยืนยัน {"  "}</Typography>
                                 </Button>
                              </Grid>
                              <Grid container
                                 direction="column"
                                 alignItems='center'
                                 justifyContent='center'
                                 sx={{ mt: 3 }}>
                                 <Typography sx={{ color: "#979797", fontSize: "14px" }}>3/3</Typography>
                              </Grid>
                           </Paper>
                           <Grid
                              container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              sx={{ mt: 3 }}
                           >
                              <Button
                                 variant="contained"
                                 sx={{ bgcolor: '#E4E4E4', borderRadius: 10 }}
                                 onClick={() => setPage(1)}
                              >
                                 <KeyboardBackspaceIcon fontSize="small" sx={{ color: '#7C7C7C' }} />
                                 <Typography sx={{ color: '#7C7C7C', fontSize: '10px', ml: 1 }}>ย้อนกลับ</Typography>
                              </Button>

                           </Grid>
                        </Box>
                     </>
                     : ''
            }
         </Box>
      </div>



   )
}

export default Register
