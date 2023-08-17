import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  AppBar,
  Container,
  Toolbar,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material";
import Image from 'next/image'
import withAuth from '../routes/withAuth'
import Layout from '../theme/Layout'
import LoadingModal from '../theme/LoadingModal'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Slide from '@mui/material/Slide';
import { signIn } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/store";
import axios from 'axios';
import { hostname } from '../utils/hostname';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from "sweetalert2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false)
  // const [categoryType, setCategoryType] = useState('game')
  // const [rowData, setRowData] = useState({})
  // const [openDialogContact, setOpenDialogContact] = useState(false)
  // const [otp, setOtp] = useState(false)
  // const [tabOtp, setTabOtp] = useState(new Array(6).fill(""))
  // const [dataOTP, setDataOTP] = useState()
  // const [logo, setLogo] = useState([])
  // const [banner, setBanner] = useState([])
  // const [slide, setSlide] = useState([])
  // const [gameType, setGameType] = useState([])
  // const [subGameType, setSubGameType] = useState([])
  // const [values, setValues] = useState({
  //   amount: "",
  //   password: "",
  //   weight: "",
  //   weightRange: "",
  //   showPassword: false,
  // });

 
  return (
    <div style={{ padding: 0 }}>
     
      <LoadingModal open={loading} />
    </div>
  )
}

export default withAuth(Index)
