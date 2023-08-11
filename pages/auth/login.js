import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Box,
  InputAdornment,
  IconButton

} from "@mui/material";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { signIn, changePassword } from "../../store/slices/userSlice";
import withAuth from "../../routes/withAuth";
import { hostname } from "../../utils/hostname";
import { useAppDispatch } from "../../store/store";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from "sweetalert2";
import LoadingModal from '../../theme/LoadingModal'
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logo, setLogo] = useState([])
  const [rowData, setRowData] = useState({});
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [otp, setOtp] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(0)

  const [tabOtp, setTabOtp] = useState(new Array(6).fill(""))
  const [dataOTP, setDataOTP] = useState()
  const [loading, setLoading] = useState(false)
  const [sendOTPAgain, setSendOTPAgain] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

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

  const sendPasswordOTP = async () => {
    setLoading(true)
    try {
      if (!rowData.tel || rowData.tel.length !== 10) {
        setLoading(false)
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'กรุณากรอกหมายเลขโทรศัพท์',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        let res = await axios({
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          method: "post",
          url: `${hostname}/v2/auth/auth_otp`,
          data: {
            "tel": rowData.tel
          }
        });

        let resData = res.data

        setDataOTP(resData)
        setForgotPassword(2)
        setLoading(false)

        const interval = setInterval(() => {
          setSendOTPAgain(true)
        }, 30000);
        return () => clearInterval(interval);
        // return () => clearInterval(interval);
      }

    } catch (error) {
      console.log(error);
      setLoading(false)
      if (
        error.response.data.error.status_code === 401 &&
        error.response.data.error.message === "ไม่มีข้อมูลผู้ใช้งานนี้"
      ) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'ไม่มีข้อมูลผู้ใช้งานนี้',
          showConfirmButton: false,
          timer: 2000
        })
        // router.push("/auth/login")
      }
    }
  }

  const verifiyOTP = async () => {
    setLoading(true)
    try {
      if (!rowData.tel || rowData.tel.length !== 10) {
        setLoading(false)
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'กรุณากรอกหมายเลขโทรศัพท์',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        let res = await axios({
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          method: "post",
          url: `${hostname}/v2/auth/check_otp_forget`,
          data: {
            tel: rowData.tel,
            token: dataOTP.token,
            pin: tabOtp[0] + tabOtp[1] + tabOtp[2] + tabOtp[3] + tabOtp[4] + tabOtp[5]
          }
        });

        let resData = res.data

        if (resData.message === "ยืนยัน OTP สำเร็จ") {
          setLoading(false)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'ยืนยัน OTP สำเร็จ',
            showConfirmButton: false,
            timer: 2000
          })
          setForgotPassword(3)

        }
        setLoading(false)

        const interval = setInterval(() => {
          setSendOTPAgain(true)
        }, 30000);
        return () => clearInterval(interval);
        // return () => clearInterval(interval);
      }

    } catch (error) {
      console.log(error);
      setLoading(false)
      if (error.response.data.error.status_code === 500 &&
        error.response.data.error.message === "AxiosError: Request failed with status code 400") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "OTP ไม่ถูกต้อง",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      if (
        error.response.data.error.status_code === 401 &&
        error.response.data.error.message === "ไม่มีข้อมูลผู้ใช้งานนี้"
      ) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'ไม่มีข้อมูลผู้ใช้งานนี้',
          showConfirmButton: false,
          timer: 2000
        })
        // router.push("/auth/login")
      }
    }
  }
  const handleChangeData = async (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
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

  useEffect(() => {
    getLogo()
  }, [])

  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <CssBaseline />

        <Grid container >
          <Grid item xs={3} />
          <Grid item xs={6}>
            {otp === false ?
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  flexGrow: 1,
                  mt: 10,
                  p: 2,
                  bgcolor: '#fff',
                  borderRadius: 5,
                  boxShadow: '2px 2px 5px #C1B9B9',
                  border: "1px solid #C1B9B9"
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box sx={{ mt: "5px" }}>
                    <img src={logo[0]?.img_url} width={200} height={70} />
                  </Box>
                  {/* <Typography variant="h5" sx={{ mt: 3, color: "#41A3E3" }}>เข้าสู่ระบบ</Typography> */}
                </Grid>
                {forgotPassword === 0 ?
                  <>
                    <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                      เบอร์โทรศัพท์
                    </Typography>
                    <TextField
                      name="tel"
                      type="text"
                      value={rowData.tel || ""}
                      placeholder="000-000-000"
                      fullWidth
                      size="small"
                      onChange={(e) => handleChangeData(e)}
                      variant="outlined"
                      sx={{ bgcolor: "white" }}
                      inputProps={{ maxLength: 10 }}
                    />

                    <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                      รหัสผ่าน
                    </Typography>
                    <TextField
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      // value={rowData.password || ""}
                      value={password}
                      placeholder="password"
                      fullWidth
                      size="small"
                      onChange={handlePasswordChange}
                      variant="outlined"
                      sx={{ bgcolor: "white" }}
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

                    <Button
                      variant="text"
                      onClick={() => {
                        setForgotPassword(1)
                      }}
                    >
                      <Typography sx={{ mt: 1, color: "#41A3E3", fontSize: "14px", textDecoration: 'underline' }} >ลืมรหัสผ่าน</Typography>
                    </Button>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 3,
                        bgcolor: '#41A3E3',
                        borderRadius: 5,
                        color: '#fff'
                      }}
                      onClick={async () => {
                        const response = await dispatch(
                          signIn({ tel: rowData.tel, password: password })
                        );

                        if (response.meta.requestStatus === "rejected") {
                          // alert("Login failed");
                          console.log('otp failed');
                        } else {
                          setTabOtp([...tabOtp.map(data => "")])
                          router.push("/home");
                        }
                      }}
                    >
                      เข้าสู่ระบบ
                    </Button>


                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        my: 2,
                        bgcolor: '#fff',
                        borderRadius: 5,
                        border: "2px solid #41A3E3",
                        color: '#41A3E3'
                      }}
                      onClick={() => router.push(`/auth/register`)}
                    >
                      สมัครสมาชิก
                    </Button>
                  </>
                  : forgotPassword === 1 ?
                    <>
                      <Typography sx={{ fontSize: "18px", textAlign: 'start', textDecoration: 'underline' }}>
                        รีเซ็ตรหัสผ่าน
                      </Typography>
                      <Grid item xs={4} container>
                        <ArrowBackIosIcon fontSize='small' sx={{ mt: 1 }} onClick={() => setForgotPassword(0)} /> <Typography sx={{ fontSize: '14px', color: "#707070", mt: 1 }}> เข้าสู่ระบบ</Typography>
                      </Grid>

                      <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                        เบอร์โทรศัพท์
                      </Typography>
                      <TextField
                        name="tel"
                        type="text"
                        value={rowData.tel || ""}
                        placeholder="000-000-000"
                        fullWidth
                        size="small"
                        onChange={(e) => handleChangeData(e)}
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                        inputProps={{ maxLength: 10 }}
                      />

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 3,
                          bgcolor: '#41A3E3',
                          borderRadius: 5,
                          color: '#fff'
                        }}
                        onClick={async () => {
                          // sendOTP()
                          sendPasswordOTP()

                        }}
                      >
                        ยืนยัน
                      </Button>


                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          my: 2,
                          bgcolor: '#fff',
                          borderRadius: 5,
                          border: "2px solid #41A3E3",
                          color: '#41A3E3'
                        }}
                        onClick={() => router.push(`/auth/register`)}
                      >
                        สมัครสมาชิก
                      </Button>

                    </> : forgotPassword === 2 ?
                      <>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Grid item xs={4}>
                            <ArrowBackIosIcon fontSize='small' sx={{ mt: 3 }} onClick={() => setForgotPassword(1)} />
                          </Grid>
                          <Grid item xs={4} container justifyContent="center">

                          </Grid>
                          <Grid item xs={4} />
                        </Grid>

                        <Grid container direction="column" >
                          <Typography sx={{ mt: 2, color: "#4B4949", fontSize: "16px" }}>ยืนยันตัวตน OTP</Typography>

                          <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>ส่งรหัส 6 หลักไปที่ {rowData.tel}</Typography>
                          <Box sx={{ textAlign: 'center', mt: 2, mb: -4 }}>
                            {tabOtp.map((data, index) => {
                              return (
                                <input
                                  style={{ width: 30, height: 40, marginLeft: '2%', textAlign: 'center', borderRadius: '10px', border: '1px solid #41A3E3' }}
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
                          <Typography sx={{ color: "#707070", fontSize: "14px" }}>รหัสอ้างอิง : {dataOTP?.refno}</Typography>
                        </Grid>
                        <Grid container
                          direction="row">
                          <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>ไม่ได้รับรหัส OTP ? </Typography>
                          {!sendOTPAgain ?
                            <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1, ml: 1 }}>ส่งรหัสอีกครั้งในอีก 30 วินาที</Typography>
                            : <Button
                              variant="text"
                              onClick={() => sendPasswordOTP()}
                            >
                              <Typography sx={{ color: "#41A3E3", fontSize: "12px", textDecoration: 'underline' }}>ส่งรหัสอีกครั้ง</Typography>
                            </Button>}
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                        >
                          {/* <Grid item xs={4}>
              <ArrowBackIosIcon fontSize='small' onClick={() => setOtp(false)} />
            </Grid> */}
                          <Grid item xs={6}>
                            <Button
                              variant="contained"
                              fullWidth
                              sx={{
                                bgcolor: '#41A3E3',
                                borderRadius: 5,
                                color: '#fff',
                                mt: 1
                              }}
                              onClick={() => {
                                verifiyOTP()
                              }}
                            >
                              ยืนยัน OTP
                            </Button>
                          </Grid>
                          {/* <Grid item xs={4} /> */}
                        </Grid>
                      </>
                      : forgotPassword === 3 ?
                        <>
                          <Typography sx={{ fontSize: "18px", textAlign: 'start', textDecoration: 'underline' }}>
                            รีเซ็ตรหัสผ่าน
                          </Typography>
                          <Grid item xs={4} container>
                            <ArrowBackIosIcon fontSize='small' sx={{ mt: 1 }} onClick={() => setForgotPassword(2)} />
                          </Grid>
                          <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
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
                          <Typography sx={{ mt: 2, color: "#707070", fontSize: '14px' }}>
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

                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              mt: 3,
                              bgcolor: '#41A3E3',
                              borderRadius: 5,
                              color: '#fff'
                            }}
                            onClick={async () => {
                              if (password === "" && confirmPassword === "") {
                                Swal.fire({
                                  position: 'center',
                                  icon: 'warning',
                                  title: 'กรุณากรอกรหัสผ่านให้ครบถ้วน',
                                  showConfirmButton: false,
                                  timer: 3000
                                })
                              }

                              if (password !== confirmPassword) {
                                Swal.fire({
                                  position: 'center',
                                  icon: 'warning',
                                  title: 'รหัสผ่านไม่ตรงกัน',
                                  showConfirmButton: false,
                                  timer: 3000
                                })
                              } else {
                                const response = await dispatch(
                                  changePassword({ tel: rowData.tel, password: password })
                                );

                                if (response.meta.requestStatus === "rejected") {
                                  // alert("Login failed");
                                  console.log('otp failed');
                                } else {
                                  setTabOtp([...tabOtp.map(data => "")])
                                  // router.push("/auth/login");
                                  setForgotPassword(0)
                                }
                              }
                            }}
                          >
                            ยืนยันการเปลี่ยนรหัสผ่าน
                          </Button>
                        </>
                        : ''}



              </Box> :
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  flexGrow: 1,
                  mt: 10,
                  p: 2,
                  bgcolor: '#fff',
                  borderRadius: 5,
                  boxShadow: '2px 2px 5px #C1B9B9',
                  border: "1px solid #C1B9B9"
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item xs={4}>
                    <ArrowBackIosIcon fontSize='small' sx={{ mt: 3 }} onClick={() => setOtp(false)} />
                  </Grid>
                  <Grid item xs={4} container justifyContent="center">
                    <Box sx={{ mt: "5px" }}>
                      <img src={logo[0]?.img_url} width={200} height={70} />
                    </Box>
                    {/* <Typography variant="h5" sx={{ mt: 3, color: "#41A3E3" }}>เข้าสู่ระบบ</Typography> */}
                  </Grid>
                  <Grid item xs={4} />
                </Grid>

                <Grid container
                  direction="column"
                  sx={{ mt: 1 }}>
                  <Typography sx={{ mt: 2, ml: 2, color: "#4B4949", fontSize: "16px" }}>ยืนยันตัวตน OTP</Typography>

                  <Typography sx={{ mt: 1, ml: 2, color: "#707070", fontSize: "14px" }}>ส่งรหัส 6 หลักไปที่ {rowData.tel}</Typography>
                  <Box sx={{ textAlign: 'center', mt: 2, mb: -4 }}>
                    {tabOtp.map((data, index) => {
                      return (
                        <input
                          style={{ width: 30, height: 40, marginLeft: '2%', textAlign: 'center', borderRadius: '10px', border: '1px solid #41A3E3' }}
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
                  <Typography sx={{ ml: 2, color: "#707070", fontSize: "14px" }}>รหัสอ้างอิง : {dataOTP.refno} </Typography>
                </Grid>
                <Grid container
                  direction="row">
                  <Typography sx={{ ml: 2, color: "#707070", fontSize: "12px", mt: 1 }}>ไม่ได้รับรหัส OTP ? </Typography>

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
                  justifyContent="flex-end"
                >
                  {/* <Grid item xs={4}>
    <ArrowBackIosIcon fontSize='small' onClick={() => setOtp(false)} />
  </Grid> */}
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: '#41A3E3',
                        borderRadius: 5,
                        color: '#fff'
                      }}
                      onClick={async () => {
                        const response = await dispatch(
                          changePassword({ tel: rowData.tel, password: password })
                        );

                        if (response.meta.requestStatus === "rejected") {
                          // alert("Login failed");
                          console.log('otp failed');
                        } else {
                          setTabOtp([...tabOtp.map(data => "")])
                          // router.push("/auth/login");
                          setForgotPassword(0)
                        }
                      }}
                    >
                      ยืนยัน
                    </Button>
                  </Grid>
                  {/* <Grid item xs={4} /> */}
                </Grid>
              </Box>
            }

          </Grid>
          <Grid item xs={3} />
        </Grid>
        {otp === false ?
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              flexGrow: 1,
              mt: 10,
              p: 2,
              bgcolor: '#fff',
              borderRadius: 5,
              boxShadow: '2px 2px 5px #C1B9B9',
              border: "1px solid #C1B9B9"
            }}
          >

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box sx={{ mt: "5px" }}>
                <img src={logo[0]?.img_url} width={200} height={70} />
              </Box>
              {/* <Typography variant="h5" sx={{ mt: 3, color: "#41A3E3" }}>เข้าสู่ระบบ</Typography> */}
            </Grid>
            {forgotPassword === 0 ?
              <>
                <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                  เบอร์โทรศัพท์
                </Typography>
                <TextField
                  name="tel"
                  type="text"
                  value={rowData.tel || ""}
                  placeholder="000-000-000"
                  fullWidth
                  size="small"
                  onChange={(e) => handleChangeData(e)}
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                  inputProps={{ maxLength: 10 }}
                />

                <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                  รหัสผ่าน
                </Typography>
                <TextField
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  // value={rowData.password || ""}
                  value={password}
                  placeholder="password"
                  fullWidth
                  size="small"
                  onChange={handlePasswordChange}
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
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

                <Button
                  variant="text"
                  onClick={() => {
                    setForgotPassword(1)
                  }}
                >
                  <Typography sx={{ mt: 1, color: "#41A3E3", fontSize: "14px", textDecoration: 'underline' }} >ลืมรหัสผ่าน</Typography>
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    bgcolor: '#41A3E3',
                    borderRadius: 5,
                    color: '#fff'
                  }}
                  onClick={async () => {
                    const response = await dispatch(
                      signIn({ tel: rowData.tel, password: password })
                    );

                    if (response.meta.requestStatus === "rejected") {
                      // alert("Login failed");
                      console.log('otp failed');
                    } else {
                      setTabOtp([...tabOtp.map(data => "")])
                      router.push("/home");
                    }
                  }}
                >
                  เข้าสู่ระบบ
                </Button>


                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    my: 2,
                    bgcolor: '#fff',
                    borderRadius: 5,
                    border: "2px solid #41A3E3",
                    color: '#41A3E3'
                  }}
                  onClick={() => router.push(`/auth/register`)}
                >
                  สมัครสมาชิก
                </Button>
              </>
              : forgotPassword === 1 ?
                <>
                  <Typography sx={{ fontSize: "18px", textAlign: 'start', textDecoration: 'underline' }}>
                    รีเซ็ตรหัสผ่าน
                  </Typography>
                  <Grid item xs={4} container>
                    <ArrowBackIosIcon fontSize='small' sx={{ mt: 1 }} onClick={() => setForgotPassword(0)} /> <Typography sx={{ fontSize: '14px', color: "#707070", mt: 1 }}> เข้าสู่ระบบ</Typography>
                  </Grid>

                  <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                    เบอร์โทรศัพท์
                  </Typography>
                  <TextField
                    name="tel"
                    type="text"
                    value={rowData.tel || ""}
                    placeholder="000-000-000"
                    fullWidth
                    size="small"
                    onChange={(e) => handleChangeData(e)}
                    variant="outlined"
                    sx={{ bgcolor: "white" }}
                    inputProps={{ maxLength: 10 }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      bgcolor: '#41A3E3',
                      borderRadius: 5,
                      color: '#fff'
                    }}
                    onClick={async () => {
                      // sendOTP()
                      sendPasswordOTP()

                    }}
                  >
                    ยืนยัน
                  </Button>


                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      my: 2,
                      bgcolor: '#fff',
                      borderRadius: 5,
                      border: "2px solid #41A3E3",
                      color: '#41A3E3'
                    }}
                    onClick={() => router.push(`/auth/register`)}
                  >
                    สมัครสมาชิก
                  </Button>

                </> : forgotPassword === 2 ?
                  <>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={4}>
                        <ArrowBackIosIcon fontSize='small' sx={{ mt: 3 }} onClick={() => setForgotPassword(1)} />
                      </Grid>
                      <Grid item xs={4} container justifyContent="center">

                      </Grid>
                      <Grid item xs={4} />
                    </Grid>

                    <Grid container direction="column" >
                      <Typography sx={{ mt: 2, color: "#4B4949", fontSize: "16px" }}>ยืนยันตัวตน OTP</Typography>

                      <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>ส่งรหัส 6 หลักไปที่ {rowData.tel}</Typography>
                      <Box sx={{ textAlign: 'center', mt: 2, mb: -4 }}>
                        {tabOtp.map((data, index) => {
                          return (
                            <input
                              style={{ width: 30, height: 40, marginLeft: '2%', textAlign: 'center', borderRadius: '10px', border: '1px solid #41A3E3' }}
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
                      <Typography sx={{ color: "#707070", fontSize: "14px" }}>รหัสอ้างอิง : {dataOTP?.refno}</Typography>
                    </Grid>
                    <Grid container
                      direction="row">
                      <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>ไม่ได้รับรหัส OTP ? </Typography>
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
                      justifyContent="flex-end"
                    >
                      {/* <Grid item xs={4}>
              <ArrowBackIosIcon fontSize='small' onClick={() => setOtp(false)} />
            </Grid> */}
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: '#41A3E3',
                            borderRadius: 5,
                            color: '#fff',
                            mt: 1
                          }}
                          onClick={() => {
                            setForgotPassword(3)
                          }}
                        >
                          ยืนยัน OTP
                        </Button>
                      </Grid>
                      {/* <Grid item xs={4} /> */}
                    </Grid>
                  </>
                  : forgotPassword === 3 ?
                    <>
                      <Typography sx={{ fontSize: "18px", textAlign: 'start', textDecoration: 'underline' }}>
                        รีเซ็ตรหัสผ่าน
                      </Typography>
                      <Grid item xs={4} container>
                        <ArrowBackIosIcon fontSize='small' sx={{ mt: 1 }} onClick={() => setForgotPassword(2)} />
                      </Grid>
                      <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
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
                      <Typography sx={{ mt: 2, color: "#707070", fontSize: '12px' }}>
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


                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 3,
                          bgcolor: '#41A3E3',
                          borderRadius: 5,
                          color: '#fff'
                        }}
                        onClick={async () => {
                          if (password !== "" && confirmPassword !== "") {
                            Swal.fire({
                              position: 'center',
                              icon: 'warning',
                              title: 'กรุณากรอกรหัสผ่านให้ครบถ้วน',
                              showConfirmButton: false,
                              timer: 3000
                            })
                          } if (password !== confirmPassword) {
                            Swal.fire({
                              position: 'center',
                              icon: 'warning',
                              title: 'รหัสผ่านไม่ตรงกัน',
                              showConfirmButton: false,
                              timer: 3000
                            })
                          } else {
                            const response = await dispatch(
                              changePassword({ tel: rowData.tel, password: password })
                            );

                            if (response.meta.requestStatus === "rejected") {
                              // alert("Login failed");
                              console.log('otp failed');
                            } else {
                              setTabOtp([...tabOtp.map(data => "")])
                              // router.push("/auth/login");
                              setForgotPassword(0)
                            }
                          }
                        }}
                      >
                        ยืนยันการเปลี่ยนรหัสผ่าน
                      </Button>
                    </>
                    : ''}



          </Box>
          :
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              flexGrow: 1,
              mt: 10,
              p: 2,
              bgcolor: '#fff',
              borderRadius: 5,
              boxShadow: '2px 2px 5px #C1B9B9',
              border: "1px solid #C1B9B9"
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box sx={{ mt: "5px" }}>
                <img src={logo[0]?.img_url} width={200} height={70} />
              </Box>
              {/* <Typography variant="h5" sx={{ mt: 3, color: "#41A3E3" }}>เข้าสู่ระบบ</Typography> */}
            </Grid>
            {forgotPassword === 0 ?
              <>
                <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                  เบอร์โทรศัพท์
                </Typography>
                <TextField
                  name="tel"
                  type="text"
                  value={rowData.tel || ""}
                  placeholder="000-000-000"
                  fullWidth
                  size="small"
                  onChange={(e) => handleChangeData(e)}
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                  inputProps={{ maxLength: 10 }}
                />

                <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                  รหัสผ่าน
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

                <Button
                  variant="text"
                  onClick={() => {
                    setForgotPassword(1)
                  }}
                >
                  <Typography sx={{ mt: 1, color: "#41A3E3", fontSize: "14px", textDecoration: 'underline' }} >ลืมรหัสผ่าน</Typography>
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    bgcolor: '#41A3E3',
                    borderRadius: 5,
                    color: '#fff'
                  }}
                  onClick={async () => {
                    const response = await dispatch(
                      signIn({ tel: rowData.tel, password: password })
                    );

                    if (response.meta.requestStatus === "rejected") {
                      // alert("Login failed");
                      console.log('otp failed');
                    } else {
                      setTabOtp([...tabOtp.map(data => "")])
                      router.push("/home");
                    }
                  }}
                >
                  เข้าสู่ระบบ
                </Button>


                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    my: 2,
                    bgcolor: '#fff',
                    borderRadius: 5,
                    border: "2px solid #41A3E3",
                    color: '#41A3E3'
                  }}
                  onClick={() => router.push(`/auth/register`)}
                >
                  สมัครสมาชิก
                </Button>
              </>
              : forgotPassword === 1 ?
                <>
                  <Typography sx={{ fontSize: "18px", textAlign: 'start', textDecoration: 'underline' }}>
                    รีเซ็ตรหัสผ่าน
                  </Typography>
                  <Grid item xs={4} container>
                    <ArrowBackIosIcon fontSize='small' sx={{ mt: 1 }} onClick={() => setForgotPassword(0)} /> <Typography sx={{ fontSize: '14px', color: "#707070", mt: 1 }}> เข้าสู่ระบบ</Typography>
                  </Grid>

                  <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                    เบอร์โทรศัพท์
                  </Typography>
                  <TextField
                    name="tel"
                    type="number"
                    value={rowData.tel || ""}
                    placeholder="000-000-000"
                    fullWidth
                    size="small"
                    onChange={(e) => handleChangeData(e)}
                    variant="outlined"
                    sx={{ bgcolor: "white" }}
                    inputProps={{ maxLength: 10 }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      bgcolor: '#41A3E3',
                      borderRadius: 5,
                      color: '#fff'
                    }}
                    onClick={async () => {
                      // sendOTP()
                      sendPasswordOTP()

                    }}
                  >
                    ยืนยัน
                  </Button>


                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      my: 2,
                      bgcolor: '#fff',
                      borderRadius: 5,
                      border: "2px solid #41A3E3",
                      color: '#41A3E3'
                    }}
                    onClick={() => router.push(`/auth/register`)}
                  >
                    สมัครสมาชิก
                  </Button>

                </> : forgotPassword === 2 ?
                  <>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item xs={4}>
                        <ArrowBackIosIcon fontSize='small' sx={{ mt: 3 }} onClick={() => setForgotPassword(1)} />
                      </Grid>
                      <Grid item xs={4} container justifyContent="center">

                      </Grid>
                      <Grid item xs={4} />
                    </Grid>

                    <Grid container direction="column" >
                      <Typography sx={{ mt: 2, color: "#4B4949", fontSize: "16px" }}>ยืนยันตัวตน OTP</Typography>

                      <Typography sx={{ mt: 1, color: "#707070", fontSize: "14px" }}>ส่งรหัส 6 หลักไปที่ {rowData.tel}</Typography>
                      <Box sx={{ textAlign: 'center', mt: 2, mb: -4 }}>
                        {tabOtp.map((data, index) => {
                          return (
                            <input
                              style={{ width: 30, height: 40, marginLeft: '2%', textAlign: 'center', borderRadius: '10px', border: '1px solid #41A3E3' }}
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
                      <Typography sx={{ color: "#707070", fontSize: "14px" }}>รหัสอ้างอิง : {dataOTP?.refno}</Typography>
                    </Grid>
                    <Grid container
                      direction="row">
                      <Typography sx={{ color: "#707070", fontSize: "12px", mt: 1 }}>ไม่ได้รับรหัส OTP ? </Typography>
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
                      justifyContent="flex-end"
                    >
                      {/* <Grid item xs={4}>
              <ArrowBackIosIcon fontSize='small' onClick={() => setOtp(false)} />
            </Grid> */}
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: '#41A3E3',
                            borderRadius: 5,
                            color: '#fff',
                            mt: 1
                          }}
                          onClick={() => {
                            setForgotPassword(3)
                          }}
                        >
                          ยืนยัน OTP
                        </Button>
                      </Grid>
                      {/* <Grid item xs={4} /> */}
                    </Grid>
                  </>
                  : forgotPassword === 3 ?
                    <>
                      <Typography sx={{ fontSize: "18px", textAlign: 'start', textDecoration: 'underline' }}>
                        รีเซ็ตรหัสผ่าน
                      </Typography>
                      <Grid item xs={4} container>
                        <ArrowBackIosIcon fontSize='small' sx={{ mt: 1 }} onClick={() => setForgotPassword(2)} />
                      </Grid>
                      <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                        รหัสผ่าน
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
                      <Typography sx={{ mt: 2, color: "#707070", fontSize: "14px" }}>
                        ยืนยันรหัสผ่าน
                      </Typography>
                      <TextField
                        name="re_password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="password"
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
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


                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 3,
                          bgcolor: '#41A3E3',
                          borderRadius: 5,
                          color: '#fff'
                        }}
                        onClick={async () => {
                          if (password !== "" && confirmPassword !== "") {
                            Swal.fire({
                              position: 'center',
                              icon: 'warning',
                              title: 'กรุณากรอกรหัสผ่านให้ครบถ้วน',
                              showConfirmButton: false,
                              timer: 3000
                            })
                          } if (password !== confirmPassword) {
                            Swal.fire({
                              position: 'center',
                              icon: 'warning',
                              title: 'รหัสผ่านไม่ตรงกัน',
                              showConfirmButton: false,
                              timer: 3000
                            })
                          } else {
                            const response = await dispatch(
                              changePassword({ tel: rowData.tel, password: password })
                            );

                            if (response.meta.requestStatus === "rejected") {
                              // alert("Login failed");
                              console.log('otp failed');
                            } else {
                              setTabOtp([...tabOtp.map(data => "")])
                              // router.push("/auth/login");
                              setForgotPassword(0)
                            }
                          }
                        }}
                      >
                        ยืนยันการเปลี่ยนรหัสผ่าน
                      </Button>
                    </>
                    : ''}



          </Box>
        }
      </div >
      <LoadingModal open={loading} />
    </>
  );
}

export default withAuth(Login);

