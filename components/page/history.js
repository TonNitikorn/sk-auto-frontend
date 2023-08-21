import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Paper,
  Tab,
  Tabs,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from "@mui/material";
import Image from "next/image";
import LoadingModal from "../../theme/LoadingModal";
import axios from "axios";
import { hostname } from "../../utils/hostname";
import { useRouter } from "next/router";
import { signOut } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/store";
import moment from "moment/moment";
import PropTypes from "prop-types";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function HistoryComponent(props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyGame, setHistoryGame] = useState([]);
  const [value, setValue] = React.useState(0);
  const username = props.profile;
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [search, setSearch] = useState("0");
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: moment().format("YYYY-MM-DD 00:00"),
    end: moment().format("YYYY-MM-DD 23:59"),
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getHistory = async () => {
    setLoading(true);
    try {
      let res = await axios({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        method: "get",
        url: `${hostname}/transaction/get_transaction_history`,
      });

      let resData = res.data;
      setHistory(resData);

      setLoading(false);
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

  const getGameHistory = async () => {
    setLoading(true);
    try {
      let res = await axios({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        method: "post",
        url: `https://angpaogame-api-xbww4.ondigitalocean.app/v1/member/getMemberTransaction`,
        data: {
          username: username || "",
          start_date: selectedDateRange.start,
          end_date: selectedDateRange.end,
        },
      });

      let resData = res.data;
      setHistoryGame(resData);

      setLoading(false);
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

  const historyUser = (
    <>
      {history.length === 0 ? (
        <>
          <Paper
            sx={{
              mt: 1,
              borderRadius: 3,
              p: 3,
              bgcolor: "#D9D9D9",
              textAlign: "center",
            }}
          >
            <Typography>ไม่มีประวัติการทำรายการ </Typography>
          </Paper>
        </>
      ) : (
        history.map((item) => (
          <Paper sx={{ mt: 1, borderRadius: 3 }}>
            <Grid
              container
              justifyContent="space-between"
              sx={{
                py: 0.5,
                px: 1,
                bgcolor: "#D9D9D9",
                borderRadius: "5px 5px 0px 0px",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                {item.transfer_type === "WITHDRAW" ? "ถอนเครดิต" : "เติมเครดิต"}{" "}
              </Typography>
              <Typography
                sx={{
                  color:
                    item.transfer_type === "WITHDRAW" ? "#BC0C20" : "#0d8544",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {item.transfer_type === "WITHDRAW" ? "-" : "+"}
                {Intl.NumberFormat('th', { style: 'currency', currency: 'THB' }).format(item.credit)}
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              sx={{
                bgcolor:
                  item.status_transction === "CANCEL"
                    ? "#ab2b3a"
                    : item.status_transction === "PENDING"
                      ? "#c78912"
                      : item.status_transction === "MANUAL"
                        ? "#0d8544"
                        : item.status_transction === "APPROVE"
                          ? "#c78912"
                          : "#0d8544",
                py: 0.5,
                px: 1,
                borderRadius: "0px 0px 5px 5px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#D9D9D9",
                }}
              >
                {item.status_transction === "CANCEL"
                  ? "ทำรายการไม่สำเร็จ"
                  : item.status_transction === "PENDING"
                    ? "กำลังทำรายการ"
                    : item.status_transction === "APPROVE"
                      ? "กำลังทำรายการ"
                      : item.status_transction === "MANUAL"
                        ? "ทำรายการสำเร็จ"
                        : "ทำรายการสำเร็จ"}{" "}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#D9D9D9" }}>
                {moment(item.update_at).format("DD/MM | hh:mm")}
              </Typography>
            </Grid>

            {/* <Grid
                            container
                            justifyContent="flex-end"
                            sx={{ bgcolor: "#D9D9D9", py: 1, px: 2, borderRadius: "0px 0px 20px 20px" }}
                        >
                            22 ก.ย. | 07:47
                        </Grid> */}
          </Paper>
        ))
      )}
    </>
  );

  const historyByGame = (
    <>
      {historyGame.length === 0 ? (
        <Paper
          sx={{
            mt: 1,
            borderRadius: 3,
            p: 3,
            bgcolor: "#D9D9D9",
            textAlign: "center",
          }}
        >
          <Typography>ไม่มีประวัติการทำรายการ </Typography>
        </Paper>
      ) : (
        historyGame.map((item) => (
          <Paper sx={{ mt: 0.5, borderRadius: 3, }}>
            <Grid
              container
              justifyContent="space-between"
              sx={{
                p: 1,
                // bgcolor: "#e9e9e9",
              }}
            >
              <Grid item xs={5}>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {" "}
                  {item.game_name}{" "}
                </Typography>
                <Divider
                  sx={{ color: "#c0b7b7", bgcolor: "#c0b7b7", my: 0.5 }}
                />
                <Typography sx={{ fontSize: "12px" }}>
                  {moment(item.update_at).format("DD/MM | hh:mm")}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  เดิมพัน
                </Typography>
                <Divider
                  sx={{ color: "#c0b7b7", bgcolor: "#c0b7b7", my: 0.5 }}
                />
                <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                  {/* ประเภท {item.symbolsStore !== "" ? "Slot" : "Pikgo"} */}
                  {Intl.NumberFormat('th', { style: 'currency', currency: 'THB' }).format(item.betAmount)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  ผลลัพธ์
                </Typography>
                <Divider
                  sx={{ color: "#c0b7b7", bgcolor: "#c0b7b7", my: 0.5 }}
                />
                <Typography
                  sx={{
                    color: item.win === "0" ? "#BC0C20" : "#0d8544",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {item.win === "0" ? "" : "+"}
                  {Intl.NumberFormat('th', { style: 'currency', currency: 'THB' }).format(item.win)}
                </Typography>
              </Grid>
            </Grid>

          </Paper>
        ))
      )}
    </>
  );

  useEffect(() => {
    getHistory();
    getGameHistory();
  }, []);

  return (
    <Box
      sx={{
        m: 1,
        maxHeight: "500px",
        overflow: "auto",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", m: 1 }}>
          ประวัติรายการย้อนหลัง
        </Typography>
        <IconButton
          onClick={() => (search === "0" ? setSearch("1") : setSearch("0"))}
        >
          <FilterAltIcon />
        </IconButton>
      </Grid>

      {search === "1" ? (
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
            <TextField
              label="เริ่ม"
              style={{
                marginRight: "8px",
                marginTop: "8px",
                backgroundColor: "white",
                borderRadius: 4,
              }}
              variant="outlined"
              size="small"
              type="datetime-local"
              fullWidth
              name="start"
              value={selectedDateRange.start}
              onChange={(e) => {
                setSelectedDateRange({
                  ...selectedDateRange,
                  [e.target.name]: e.target.value,
                });
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: {
                  fontSize: "12px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="สิ้นสุด"
              style={{
                marginRight: "8px",
                marginTop: "8px",
                color: "white",
                backgroundColor: "white",
                borderRadius: 4,
              }}
              variant="outlined"
              size="small"
              type="datetime-local"
              fullWidth
              name="end"
              value={selectedDateRange.end}
              onChange={(e) => {
                setSelectedDateRange({
                  ...selectedDateRange,
                  [e.target.name]: e.target.value,
                });
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: {
                  fontSize: "12px",
                },
              }}
            />
          </Grid>
          <Button
            variant="contained"
            sx={{ my: 1 }}
            color="primary"
            size="small"
            fullWidth
            type="submit"
            onClick={() => {
              getGameHistory();
            }}
          >
            <SearchIcon sx={{ color: "#ffff" }} />
            <Typography sx={{ color: "#ffff" }}>ค้นหา</Typography>
          </Button>
        </Grid>
      ) : (
        ""
      )}
      <Box sx={{ width: "100%" }}>
        <Grid
          sx={{
            background: "linear-gradient(#0072B1, #41A3E3)",
            borderRadius: 1.5,
          }}
        >
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              sx={{
                background: "linear-gradient(#0072B1, #41A3E3)",
                borderRadius: 1.5,
                textAlign: "center",
                p: 0.5,
              }}
            >
              <Tab
                label="ประวัติรายการฝากถอน"
                {...a11yProps(0)}
                sx={{ fontSize: 15 }}
              />
              <Tab
                label="ประวัติรายการเล่นเกม"
                {...a11yProps(1)}
                sx={{ fontSize: 15 }}
                onClick={() => getGameHistory()}
              />
            </Tabs>
          </Grid>
        </Grid>
      </Box>

      <CustomTabPanel value={value} index={0}>
        {historyUser}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {historyByGame}
      </CustomTabPanel>

      <Dialog
        open={openDateDialog}
        onClose={() => setOpenDateDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography
            sx={{
              color: "#41A3E3",
              fontSize: "22px",
              textAlign: "center",
              mt: 1,
            }}
          >
            {" "}
            รายละเอียด Rank
          </Typography>
        </DialogTitle>
        <DialogContent>eiei</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenDateDialog(false)}>
            ปิด
          </Button>
        </DialogActions>
      </Dialog>

      <LoadingModal open={loading} />
    </Box>
  );
}

export default HistoryComponent;
