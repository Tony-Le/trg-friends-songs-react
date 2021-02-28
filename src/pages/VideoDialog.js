import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import YouTube from "react-youtube";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  fluidVideo: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  },
  fluidVideoContainer: {
    width: "1080px",
    paddingTop: "56.25%", /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  },
}));

function VideoDialog(props) {

    const classes = useStyles();

    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <Dialog
        open={props.open}
        maxWidth="xl"
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
      >
        <DialogContent>
          <YouTube
            videoId={props.videoId}
            opts={opts}
            onReady={props.onReady}
            containerClassName={classes.fluidVideoContainer}
            className={classes.fluidVideo}
          />
        </DialogContent>
      </Dialog>
    );
}

export default VideoDialog;