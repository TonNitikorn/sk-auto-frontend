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
   InputAdornment,
   IconButton
} from "@mui/material";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import CssBaseline from "@mui/material/CssBaseline";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import axios from "axios";
import { hostname } from "../../utils/hostname";
import { register } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/store";
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Register() {
   const router = useRouter()
   const dispatch = useAppDispatch();
   const [rowData, setRowData] = useState({});
   const [loading, setLoading] = useState(false);
   const [tabOtp, setTabOtp] = useState(new Array(6).fill(""))
   const [logo, setLogo] = useState([])
   const [dataOTP, setDataOTP] = useState({})
   const [sendOTPAgain, setSendOTPAgain] = useState(false)
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('')
   const [page, setPage] = useState(0)
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

   const handlePasswordChange = (event) => {
      setPassword(event.target.value);
   };

   const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
   };

   const toggleShowPassword = () => {
      setShowPassword(!showPassword);
   };

   const toggleShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (password !== "" && confirmPassword !== "") {
         if (password === confirmPassword) {
            registerUser()
         } else {
            Swal.fire({
               position: 'center',
               icon: 'warning',
               title: 'รหัสผ่านไม่ตรง',
               showConfirmButton: false,
               timer: 2000
            })

         }
      } else {
         Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'กรุณากรอกรหัสผ่านให้ครบถ้วน',
            showConfirmButton: false,
            timer: 2000
         })
      }

   };


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
      try {
         let res = await axios({
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            method: "post",
            url: `${hostname}/v2/auth/check_otp`,
            data: {
               tel: rowData.tel,
            }
         });
         let resData = res.data
         setDataOTP(resData)
         setPage(1)

         const interval = setInterval(() => {
            setSendOTPAgain(true)
         }, 30000);
         return () => clearInterval(interval);

      } catch (error) {
         console.log(error);
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
   
   const confirmOTP = async () => {
      try {
         let res = await axios({
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            method: "post",
            url: `${hostname}/v2/auth/confirm_otp`,
            data: {
               token: dataOTP.token,
               pin: tabOtp[0] + tabOtp[1] + tabOtp[2] + tabOtp[3] + tabOtp[4] + tabOtp[5],
               tel: rowData.tel,
            }
         });

         if (res.data.message === 'ยืนยัน OTP สำเร็จ') {
            Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'ยืนยัน OTP สำเร็จ',
               showConfirmButton: false,
               timer: 2000
            }).then(() => {
               setPage(2)
            })
         }

      } catch (error) {
         console.log(error)
         if (error.response.data.error.status_code === 500 &&
            error.response.data.error.message === "OTP ไม่ถูกต้อง") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "OTP ไม่ถูกต้อง",
              showConfirmButton: false,
              timer: 3000,
            });
          }
      }
   }

   const registerUser = async () => {
      // setLoading(true)

      const response = await dispatch(
         register({
            tel: rowData.tel,
            bank_number: rowData.bank_number,
            bank_name: rowData.bank_name,
            fname: rowData.fname,
            lname: rowData.lname,
            affiliate_by: "-",
            platform: "postman",
            token: dataOTP.token,
            pin: tabOtp[0] + tabOtp[1] + tabOtp[2] + tabOtp[3] + tabOtp[4] + tabOtp[5],
            password: password
         })
      );
      if (response.meta.requestStatus === "rejected") {
         // alert("Login failed");
         console.log("otp failed");
      } else {
         setTabOtp([...tabOtp.map(data => "")])
         router.push("/home");
      }

      setPage(2)
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
                              <Box sx={{ mt: "5px" }}>
                                 <img src={logo[0]?.img_url} width={200} height={70} />
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
                                 if (!rowData.tel) {
                                    Swal.fire({
                                       position: 'center',
                                       icon: 'warning',
                                       title: 'กรุณากรอกเบอร์โทรศัพท์',
                                       showConfirmButton: false,
                                       timer: 1500
                                    })
                                 } else {
                                    sendOTP()

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
                                 <Box sx={{ mt: "5px" }}>
                                    <img src={logo[0]?.img_url} width={200} height={70} />
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
                                             type="text"
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
                                 {!sendOTPAgain ?
                                    <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1, ml: 1 }}>ส่งรหัสอีกครั้งในอีก 30 วินาที</Typography>
                                    : <Button
                                       variant="text"
                                       onClick={() => sendOTP()}
                                    >
                                       <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }}>ส่งรหัสอีกครั้ง</Typography>
                                    </Button>}

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
                                    fullWidth
                                    onClick={() => {
                                       confirmOTP()
                                    }}
                                 >
                                    <Typography sx={{ color: '#fff', mr: 1 }}> {" "}ยืนยัน {"  "}</Typography>
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

                           </Grid>
                        </Box>
                        : page === 2 ?
                           <>
                              <form onSubmit={handleSubmit}>
                                 <Box sx={{ mt: 10 }}>
                                    <Paper elevation={1} sx={{
                                       p: 3,
                                       flexGrow: 1,
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
                                          <Box sx={{ mt: "5px" }}>
                                             <img src={logo[0]?.img_url} width={200} height={70} />
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
                                             <MenuItem value="ktb">ธนาคารกรุงไทย</MenuItem>
                                             <MenuItem value="scb">ธนาคารไทยพาณิชย์</MenuItem>
                                             <MenuItem value="bay">ธนาคารกรุงศรีอยุธยา</MenuItem>
                                             <MenuItem value="bbl">ธนาคารกรุงเทพ</MenuItem>
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
                                          <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                             ชื่อจริง (ตรงกับบัญชีธนาคาร)*
                                          </Typography>
                                          <TextField
                                             name="fname"
                                             type="text"
                                             value={rowData.fname || ""}
                                             placeholder="ชื่อ"
                                             fullWidth
                                             size="small"
                                             onChange={(e) => handleChangeData(e)}
                                             variant="outlined"
                                             sx={{ bgcolor: "white", borderRadius: 1 }}
                                          />
                                          <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                             นามสกุล (ตรงกับบัญชีธนาคาร)*
                                          </Typography>
                                          <TextField
                                             name="lname"
                                             type="text"
                                             value={rowData.lname || ""}
                                             placeholder="นามสกุล"
                                             fullWidth
                                             size="small"
                                             onChange={(e) => handleChangeData(e)}
                                             variant="outlined"
                                             sx={{ bgcolor: "white", borderRadius: 1 }}
                                          />
                                          <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                             รหัสผ่าน
                                          </Typography>
                                          <TextField
                                             type={showPassword ? 'text' : 'password'}
                                             placeholder="รหัสผ่าน"
                                             variant="outlined"
                                             fullWidth
                                             size="small"
                                             value={password}
                                             onChange={handlePasswordChange}
                                             sx={{ bgcolor: "white", borderRadius: 1 }}
                                             InputProps={{
                                                endAdornment: (
                                                   <InputAdornment position="end">
                                                      <IconButton onClick={toggleShowPassword}>
                                                         {showPassword ? <Visibility /> : <VisibilityOff />}
                                                      </IconButton>
                                                   </InputAdornment>
                                                ),
                                             }}
                                          />
                                          <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                             ยืนยันรหัสผ่าน
                                          </Typography>
                                          <TextField
                                             type={showConfirmPassword ? 'text' : 'password'}
                                             placeholder="ยืนยันรหัสผ่าน"
                                             variant="outlined"
                                             fullWidth
                                             size="small"
                                             value={confirmPassword}
                                             onChange={handleConfirmPasswordChange}
                                             sx={{ bgcolor: "white", borderRadius: 1 }}
                                             InputProps={{
                                                endAdornment: (
                                                   <InputAdornment position="end">
                                                      <IconButton onClick={toggleShowConfirmPassword}>
                                                         {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                      </IconButton>
                                                   </InputAdornment>
                                                ),
                                             }}
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
                                          onClick={() => setPage(0)}
                                       >
                                          <KeyboardBackspaceIcon fontSize="small" sx={{ color: '#7C7C7C' }} />
                                          <Typography sx={{ color: '#7C7C7C', fontSize: '10px', ml: 1 }}>ย้อนกลับ</Typography>
                                       </Button>
                                       <Button
                                          variant="contained"
                                          sx={{ borderRadius: 10 }}
                                          type="submit"
                                       >
                                          <Typography sx={{ color: '#fff', fontSize: '10px', mr: 1 }}> {" "}ต่อไป {"  "}</Typography>
                                          <EastIcon fontSize="small" sx={{ color: '#fff' }} />
                                       </Button>
                                    </Grid>
                                 </Box>
                              </form>
                           </>
                           : ''
               }

            </Grid>
            <Grid item xs={3}></Grid>
         </Grid>

         <Box sx={{ display: { xs: "block", md: "none" }, }}>
            {
               page === 0 ?
                  <Box sx={{ mt: 10 }}>
                     <Paper elevation={1} sx={{
                        p: 3,
                        flexGrow: 1,
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
                           <Box sx={{ mt: "5px" }}>
                              <img src={logo[0]?.img_url} width={200} height={70} />
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
                              if (!rowData.tel) {
                                 Swal.fire({
                                    position: 'center',
                                    icon: 'warning',
                                    title: 'กรุณากรอกเบอร์โทรศัพท์',
                                    showConfirmButton: false,
                                    timer: 1500
                                 })
                              } else {
                                 sendOTP()

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
                              <Box sx={{ mt: "5px" }}>
                                 <img src={logo[0]?.img_url} width={200} height={70} />
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
                                          type="text"
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
                              {!sendOTPAgain ?
                                 <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1, ml: 1 }}>ส่งรหัสอีกครั้งในอีก 30 วินาที</Typography>
                                 : <Button
                                    variant="text"
                                    onClick={() => sendOTP()}
                                 >
                                    <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }}>ส่งรหัสอีกครั้ง</Typography>
                                 </Button>}

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
                                 fullWidth
                                 onClick={() => {
                                    confirmOTP()
                                 }}
                              >
                                 <Typography sx={{ color: '#fff', mr: 1 }}> {" "}ยืนยัน {"  "}</Typography>
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

                        </Grid>
                     </Box>
                     : page === 2 ?
                        <>
                           <form onSubmit={handleSubmit}>
                              <Box sx={{ mt: 10 }}>
                                 <Paper elevation={1} sx={{
                                    p: 3,
                                    flexGrow: 1,
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
                                       <Box sx={{ mt: "5px" }}>
                                          <img src={logo[0]?.img_url} width={200} height={70} />
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
                                          <MenuItem value="ktb">ธนาคารกรุงไทย</MenuItem>
                                          <MenuItem value="scb">ธนาคารไทยพาณิชย์</MenuItem>
                                          <MenuItem value="bay">ธนาคารกรุงศรีอยุธยา</MenuItem>
                                          <MenuItem value="bbl">ธนาคารกรุงเทพ</MenuItem>
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
                                       <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                          ชื่อจริง (ตรงกับบัญชีธนาคาร)*
                                       </Typography>
                                       <TextField
                                          name="fname"
                                          type="text"
                                          value={rowData.fname || ""}
                                          placeholder="ชื่อ"
                                          fullWidth
                                          size="small"
                                          onChange={(e) => handleChangeData(e)}
                                          variant="outlined"
                                          sx={{ bgcolor: "white", borderRadius: 1 }}
                                       />
                                       <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                          นามสกุล (ตรงกับบัญชีธนาคาร)*
                                       </Typography>
                                       <TextField
                                          name="lname"
                                          type="text"
                                          value={rowData.lname || ""}
                                          placeholder="นามสกุล"
                                          fullWidth
                                          size="small"
                                          onChange={(e) => handleChangeData(e)}
                                          variant="outlined"
                                          sx={{ bgcolor: "white", borderRadius: 1 }}
                                       />
                                       <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                          รหัสผ่าน
                                       </Typography>
                                       <TextField
                                          type={showPassword ? 'text' : 'password'}
                                          placeholder="รหัสผ่าน"
                                          variant="outlined"
                                          fullWidth
                                          size="small"
                                          value={password}
                                          onChange={handlePasswordChange}
                                          sx={{ bgcolor: "white", borderRadius: 1 }}
                                          InputProps={{
                                             endAdornment: (
                                                <InputAdornment position="end">
                                                   <IconButton onClick={toggleShowPassword}>
                                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                                   </IconButton>
                                                </InputAdornment>
                                             ),
                                          }}
                                       />
                                       <Typography sx={{ mt: 1, color: "#707070", fontSize: '12px' }}>
                                          ยืนยันรหัสผ่าน
                                       </Typography>
                                       <TextField
                                          type={showConfirmPassword ? 'text' : 'password'}
                                          placeholder="ยืนยันรหัสผ่าน"
                                          variant="outlined"
                                          fullWidth
                                          size="small"
                                          value={confirmPassword}
                                          onChange={handleConfirmPasswordChange}
                                          sx={{ bgcolor: "white", borderRadius: 1 }}
                                          InputProps={{
                                             endAdornment: (
                                                <InputAdornment position="end">
                                                   <IconButton onClick={toggleShowConfirmPassword}>
                                                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                   </IconButton>
                                                </InputAdornment>
                                             ),
                                          }}
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
                                       onClick={() => setPage(0)}
                                    >
                                       <KeyboardBackspaceIcon fontSize="small" sx={{ color: '#7C7C7C' }} />
                                       <Typography sx={{ color: '#7C7C7C', fontSize: '10px', ml: 1 }}>ย้อนกลับ</Typography>
                                    </Button>
                                    <Button
                                       variant="contained"
                                       sx={{ borderRadius: 10 }}
                                       type="submit"
                                    >
                                       <Typography sx={{ color: '#fff', fontSize: '10px', mr: 1 }}> {" "}ต่อไป {"  "}</Typography>
                                       <EastIcon fontSize="small" sx={{ color: '#fff' }} />
                                    </Button>
                                 </Grid>
                              </Box>
                           </form>
                        </>
                        : ''
            }
         </Box>
      </div>



   )
}

export default Register
