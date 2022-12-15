import React, { useState, useEffect } from "react";
import Image from "next/image";
// import logo from "/assets/logo.png";
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
    Switch,
    MenuItem,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

function register() {
    const router = useRouter()
    const [bonus, setBonus] = useState(true);
    const [rowData, setRowData] = useState({});
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [valuesCf, setValuesCf] = useState({
        password: "",
        showPassword: false,
    });

    const handleChangeData = async (e) => {
        setRowData({ ...rowData, [e.target.name]: e.target.value });
    };

    const handleChangeBonus = (event) => {
        setBonus(event.target.checked);
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

    const handleChangeCf = (prop) => (event) => {
        setValuesCf({ ...valuesCf, [prop]: event.target.value });
    };
    const handleClickShowPasswordCf = () => {
        setValuesCf({
            ...valuesCf,
            showPassword: !valuesCf.showPassword,
        });
    };

    const handleMouseDownPasswordCf = (event) => {
        event.preventDefault();
    };
    return (
        <div style={{ padding: " 0 2rem" }}>
            {/* <LoadingModal open={loading} /> */}
            {/* <CssBaseline /> */}


            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    bgcolor: '#41A3E3',
                    p: 3, borderRadius: 3,
                    flexGrow: 1,
                    mt: 1,
                    mt: 10,

                }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 0, }}
                >
                    {/* <Image src={logo} alt="Vercel Logo" width={123} height={39} /> */}
                    <Typography variant="h5" sx={{ color: "#FFFF" }}>สมัครสมาชิก</Typography>

                </Grid>
                <Typography sx={{ mt: 2, color: "#FFFF" }}>ชื่อ *</Typography>
                <TextField
                    name="first_name"
                    type="text"
                    value={rowData.first_name || ""}
                    placeholder="ชื่อ"
                    fullWidth
                    size="small"
                    onChange={(e) => handleChangeData(e)}
                    variant="outlined"
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                />
                <Typography sx={{ mt: 2, color: "#FFFF" }}>นามสกุล *</Typography>
                <TextField
                    name="last_name"
                    type="text"
                    value={rowData.last_name || ""}
                    placeholder="นามสกุล"
                    fullWidth
                    size="small"
                    onChange={(e) => handleChangeData(e)}
                    variant="outlined"
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                />
                <Typography sx={{ mt: 2, color: "#FFFF" }}>
                    โปรดเลือกบัญชีธนาคาร*
                </Typography>
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
                <Typography sx={{ mt: 2, color: "#FFFF" }}>
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
                <Typography sx={{ mt: 2, color: "#FFFF" }}>รหัสผ่าน</Typography>
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
                <Typography sx={{ mt: 2, color: "#FFFF" }}>
                    ยืนยันรหัสผ่าน
                </Typography>

                <FormControl fullWidth variant="outlined" size="small">
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={valuesCf.showPassword ? "text" : "password"}
                        value={valuesCf.password}
                        placeholder="password"
                        onChange={handleChangeCf("password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordCf}
                                    onMouseDown={handleMouseDownPasswordCf}
                                    edge="end"
                                >
                                    {valuesCf.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{ bgcolor: "white" }}
                    />
                </FormControl>


                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    // onClick={() => register()}
                    sx={{
                        mt: 3,
                        borderRadius: 5
                    }}
                >
                    สมัครสมาชิก
                </Button>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ mt: 2 }}
                >
                    <Typography sx={{ color: "#FFFF" }}>มีบัญชีแล้ว?</Typography>
                    <Button
                        variant="text"
                        sx={{ textDecoration: "underline " }}
                        onClick={() => router.push("/auth/login")}
                    >

                        <Typography sx={{ color: "#FFFF" }}>เข้าสู่ระบบ</Typography>
                    </Button>
                </Grid>
            </Box>




        </div>
    )
}

export default register
