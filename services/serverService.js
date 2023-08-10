import axios from "axios";
import { hostname } from "../utils/hostname";
import Swal from "sweetalert2";
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
export const signIn = async (user) => {
  try {
    let res = await axios({
      method: "post",
      url: `${hostname}/v2/auth/login/verify`,
      data: {
        "tel": user.tel,
        "pin": user.pin,
        "token": user.token
      }
    });
    localStorage.setItem("access_token", res.data.accesstoken);
    return res.data;


  } catch (error) {
    console.log(error);
    if (
      error.response.data.status === 429
    ) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'ตอนนี้ระบบมีผู้ใช้งานจำนวนมาก กรุณารอสักครู่',
        showConfirmButton: false,
        timer: 2000
      })
    }
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
};

export const register = async (data) => {
  try {
    let res = await axios({
      method: "post",
      url: `${hostname}/auth/register`,
      data: {
        bank_number: data.bank_number,
        bank_name: data.bank_name,
        fname: data.fname,
        lname: data.lname,
        tel: data.tel,
        affiliate_by: "-",
        platform: "postman",
        pin: data.pin,
        token: data.token,
        password: data.password
      }
    });
    localStorage.setItem("access_token", res.data.result.access_token);
    return res.data;


  } catch (error) {
    console.log(error);
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
};
