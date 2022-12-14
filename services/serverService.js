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
      // url: `${hostname}/member/api/member/login`,
      url: 'https://www.mecallapi.com/api/login',
      data: {
        // "username": user.tel,
        // "password": user.password,
        "username": "karn.yong@mecallapi.com",
        "password": "mecallapi"
      }
      // data: {
      //   tel: user.tel,
      //   password: user.password,
      // },
    });
    console.log('res.data', res.data)
    localStorage.setItem("access_token", res.data.accessToken);
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
