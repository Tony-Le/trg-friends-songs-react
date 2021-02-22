import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  TextField,
  CircularProgress,
  Dialog,
  DialogContent,
  Backdrop,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import SongSearchField from "./SongSearchField";
import SongCard from "./SongCard";
import { useHistory, useLocation, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import YouTube from "react-youtube";
import { makeStyles } from "@material-ui/core/styles";
const queryString = require("query-string");
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function SongSearch(props) {
  const classes = useStyles();

  const songPageLength = 15;
  const [query, setQuery] = useState([]);
  const [songs, setSongs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [moreSongs, setMoreSongs] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [playerRef, setPlayerRef] = useState(null);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    setQuery(parsed.query);
  }, [location]);

  useEffect(() => {
    setOpenBackDrop(true);
    const url =
      "https://trg-friends-songs-api.herokuapp.com/songs/api/search?query=";
    setPageNumber(0);
    fetch(url + query)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then((response) => response.json())
      .then((data) => {
         if (data._embedded) {
           if (data._embedded.songList.length > 0) {
             setSongs(data._embedded.songList);
             setMoreSongs(data._embedded.songList.length >= songPageLength);
           }
         } else {
           // no songs found
           setSongs([]);
         }
        setOpenBackDrop(false);
      })
      .catch(function (error) {
        console.log("Request failed", error);
        setOpenBackDrop(false);
      });
  }, [query]);

  function loadMoreSongs() {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);

    const url =
      "https://trg-friends-songs-api.herokuapp.com/songs/api/search?query=" +
      query +
      "&pageNumber=" +
      newPageNumber;
    fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then((response) => response.json())
      .then((data) => {
        if (data._embedded) {
          if (data._embedded.songList.length > 0) {
            setSongs(songs.concat(data._embedded.songList));
          }
        } else {
          setMoreSongs(false);
        }
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  function onSubmit(value) {
    if (value) {
      history.push("/search?query=" + value);
    }
  }

  function onClickSongCard(song) {
    // if same song id start the video again
    if (song.id == selectedVideo)
    {
      playerRef.playVideo();
    }
    else {
      setSelectedVideo(song.id);
    }
    setOpenVideoDialog(true);
  }

  function handleClose() {
    playerRef.stopVideo();
    setOpenVideoDialog(false);
  }

  function _onReady(event) {
    // access to player in all event handlers via event.target
    setPlayerRef(event.target);
  }

  const songsRender = songs.map((song) => {
    return (
      <Grid item md={4} sm={6}>
        <SongCard key={song.id} song={song} onClick={onClickSongCard} />
      </Grid>
    );
  });

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <Container>
      <AppBar position="fixed">
        <Toolbar>
          <Container>
            <Grid container justify="space-between">
              <Grid xs={3}>
                <Link to="/home">
                  <img
                    src="/TRG Logo.jpg"
                    alt="The Runaway Guys Logo"
                    height="40px"
                  ></img>
                  <img
                    src="/developed-with-youtube-sentence-case-light.png"
                    alt="The Runaway Guys Logo"
                    height="40px"
                  ></img>
                </Link>
              </Grid>
              <Grid container justify="center" xs={6}>
                <SongSearchField
                  onSubmit={onSubmit}
                  defaultValue={queryString.parse(window.location.search).query}
                ></SongSearchField>
              </Grid>
              <Grid xs={3}></Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <InfiniteScroll
        dataLength={songs.length}
        next={loadMoreSongs}
        hasMore={moreSongs}
        loader={<div>Loading...</div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={3}>
          <Backdrop className={classes.backdrop} open={openBackDrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {songsRender}
        </Grid>
      </InfiniteScroll>
      <Dialog
        open={openVideoDialog}
        maxWidth="xl"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent>
          <YouTube videoId={selectedVideo} opts={opts} onReady={_onReady} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default SongSearch;
