import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Dialog,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem

} from "@mui/material";
import Layout from '../theme/Layout';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';


function Profile() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(false)
  const [rowData, setRowData] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChangeData = async (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEditData = () => {
    setEditData(false)
  }
  return (
    <Layout>
      <Box sx={{
        mt: 10, background: "linear-gradient(#fff, #AFECFF )"
      }}>
        <Typography sx={{ p: 10 }}>LOGO</Typography>
      </Box>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center' }}>
        <Grid item xs={6} sx={{ bgcolor: '#62AEF4', color: '#62AEF4' ,py:1}}>{' s'}</Grid>
        <Grid item xs={6} sx={{ bgcolor: '#A1D2FF', color: '#A1D2FF' ,py:1 }}> {' s'}</Grid>
      </Grid>


      <Box sx={{ border: '2px solid #41A3E3', borderRadius: 5, m: 4, p: 3 }}>
        <Grid container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ textAlign: 'center', mb: 1 }}>
          <EditIcon sx={{ color: '#41A3E3' }} />
          <Button variant='text' onClick={() => setEditData(true)}>
            <Typography sx={{ textDecoration: 'underline' }}>แก้ไขข้อมูล</Typography>
          </Button>
        </Grid>
        <Grid container direction="row"
          justifyContent="center"
          alignItems="center">

          <Grid item xs={4} sx={{ fontWeight: 'bold' }}>
            ชื่อ
          </Grid>
          <Grid item xs={8}>
            สมหมาย ใจดี
          </Grid>
          <Grid item xs={4} sx={{ mt: 1, fontWeight: 'bold' }} >
            โทรศัพท์
          </Grid>
          <Grid item xs={8} sx={{ mt: 1 }}>
            0987654321
          </Grid>
          <Grid item xs={4} sx={{ mt: 1, fontWeight: 'bold' }}>
            ธนาคาร
          </Grid>
          <Grid item xs={8} sx={{ mt: 1 }}>
            scb
          </Grid>
          <Grid item xs={4} sx={{ mt: 1, fontWeight: 'bold' }}>
            เลขบัญชี
          </Grid>
          <Grid item xs={8} sx={{ mt: 1 }}>
            1452-52-4521
          </Grid>
        </Grid>
        <Grid container
          direction="row"
          sx={{ textAlign: 'center', mt: 1 }}>
          <SearchIcon sx={{ mt: 1, color: '#41A3E3' }} /><Button variant='text'><Typography sx={{ textDecoration: 'underline' }}>ประวัติการเล่นเกม</Typography></Button>
        </Grid>

      </Box>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={6}>
          <Button
            fullWidth
            variant='contained'
            sx={{ mb: 5 }}
            onClick={() => handleClickOpen()}
          >
            <Typography sx={{ color: 'white' }}>เปลี่ยนรหัสผ่าน</Typography>

          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={editData}
        onClose={handleCloseEditData}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <EditIcon sx={{ color: '#41A3E3', mt: 1 }} />แก้ไขข้อมูล
        </DialogTitle>
        <DialogContent>
          <Grid container>

            <Grid item xs={4} sx={{ fontWeight: 'bold', mt: 1}}>
              ชื่อ
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="bank_number"
                type="number"
                value={rowData.bank_number || ""}
                placeholder=""
                fullWidth
                size="small"
                onChange={(e) => handleChangeData(e)}
                variant="outlined"
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={4} sx={{ mt: 2, fontWeight: 'bold' }} >
              โทรศัพท์
            </Grid>
            <Grid item xs={8} sx={{ mt: 1 }}>
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
            <Grid item xs={4} sx={{ mt: 2, fontWeight: 'bold' }}>
              ธนาคาร
            </Grid>
            <Grid item xs={8} sx={{ mt: 1 }}>
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
            </Grid>
            <Grid item xs={4} sx={{ mt: 2, fontWeight: 'bold' }}>
              เลขบัญชี
            </Grid>
            <Grid item xs={8} sx={{ mt: 1 }}>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditData}>ยกเลิก</Button>
          <Button onClick={handleCloseEditData} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

    </Layout>

  )
}

export default Profile
