import axios from "axios";
import hostname from "../utils/hostname";
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
    // Swal.fire({
    //   position: "center",
    //   icon: "error",
    //   title: error.response.data.error.message,
    //   showConfirmButton: false,
    //   timer: 4000,
    // });
  }
};

export const register = async (data) => {
  try {
    let res = await axios({
      method: "post",
      url: `${hostname}/v2/auth/register/verify`,
      data: {
        bank_number: data.bank_number,
        bank_name: data.bank_name,
        tel: data.tel,
        affiliate_by: "-",
        platform: "postman",
        pin: data.pin,
        token: data.token,
      }
    });
    localStorage.setItem("access_token", res.data.accesstoken);
    return res.data;


  } catch (error) {
    console.log(error);
    // Swal.fire({
    //   position: "center",
    //   icon: "error",
    //   title: error.response.data.error.message,
    //   showConfirmButton: false,
    //   timer: 4000,
    // });
  }
};
