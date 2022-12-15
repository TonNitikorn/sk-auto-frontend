import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
  FormControl,
  Box,
  InputAdornment,
  OutlinedInput,
  Paper
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { signIn } from "../../store/slices/userSlice";
import withAuth from "../../routes/withAuth";
import hostname from "../../utils/hostname";
import { useAppDispatch } from "../../store/store";

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [rowData, setRowData] = useState({});
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChangeData = async (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <CssBaseline />
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            flexGrow: 1,
            mt: 1,
            mt: "50%",
            p: 2,
            bgcolor: '#41A3E3',
            borderRadius: 5
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          // sx={{ pt: 10 ,}}
          >
            {/* <Image src={logo} alt="Vercel Logo" width={163} height={59} />  */}

            <Typography variant="h5" sx={{ mt: 3, color: "white" }}>เข้าสู่ระบบ</Typography>
          </Grid>

          <Typography sx={{ mt: 3, color: "#FFFF" }}>
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
          <Typography sx={{ mt: 2, color: "#FFFF" }}>รหัสผ่าน</Typography>
          <div>
            <FormControl fullWidth variant="outlined" size="small">
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                placeholder="password"
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ bgcolor: "white" }}
              />
            </FormControl>
            <Grid
              container
              direction="row-reverse"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Button
                variant="text"
                sx={{ textDecoration: "underline ", color: "#FFFF" }}
              >
                ลืมรหัสผ่าน
              </Button>
            </Grid>
          </div>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 3,
              // background: "linear-gradient(to right,#00C041, #0097D7)",
              borderRadius: 5
            }}
            onClick={async () => {
              const response = await dispatch(
                signIn({ tel: rowData.tel, password: values.password })
              );

              if (response.meta.requestStatus === "rejected") {
                alert("Login failed");
              } else {
                console.log("else");
                router.push("/home");
              }
            }}
          >
            เข้าสู่ระบบ
          </Button>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Typography sx={{ color: "#eeee" }}>ยังไม่เป็นสมาชิก?</Typography>
            <Button
              variant="text"
              sx={{ textDecoration: "underline ", color: "#FFFF" }}
            // onClick={() => {
            //   if (know_us === undefined) {
            //     router.push(`/RegisterTel?know_us=friend`);
            //   } else {
            //     router.push(`/RegisterTel?know_us=${know_us}`);
            //   }
            // }}
            onClick={() =>  router.push(`/auth/register`)}
            >
              สมัครสมาชิก
            </Button>
          </Grid>
        </Box>
      </div>
    </>
  );
}

// export default Login;
export default withAuth(Login);

