import React from "react";
import Backdrop from "@mui/material/Backdrop";
// import { makeStyles } from "@mui/styles";
import { CircularProgress, Fab } from "@mui/material";

export default function LoadingModal(props) {

  return (
    <Backdrop style={{
      zIndex: 1299,
      color: "#fff",
    }} open={props.open} onClick={() => { }}>
      <div style={{
        margin: 1,
        position: "relative",
      }}>
        <Fab aria-label="save" color="neutral">
          <img
            src={"https://public-cdn-softkingdom.sgp1.digitaloceanspaces.com/1688026256108-Angpaos-Logo1.png"}
            alt="mascot"
            width="40px"
            height="35px"
          />
        </Fab>
        <CircularProgress
          size={78}
          thickness={5.0}
          color="primary"
          style={{
            // color: "yellow",
            position: "absolute",
            top: -11,
            left: -11,
            zIndex: 1300,
          }}
        />
      </div>
    </Backdrop>
  );
}