import Head from "next/head";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { getToken } from "../store/slices/userSlice";
import { createTheme, ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }) {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
        light: "#30323e",
      },
      secondary: {
        main: "#41A3E3",
        light: "#7190c4",
      },
     
      
    },
    typography: {
      fontFamily: 'Noto Sans Thai',
      // fontSize: 14,
      // color: '#ffff',
      // button: {
      //   textTransform: "none",
      // },
    },
  })

  useEffect(() => {
    store.dispatch(getToken({ token: localStorage.getItem("access_token") }));
  }, []);

  return (
    <>
      <Head>
        <title>auto wallet</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )

}

export default MyApp
