import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Toolbar } from "@material-ui/core";
import SongCard from "./SongCard";
import { useHistory, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoDialog from "./VideoDialog";
import { makeStyles } from "@material-ui/core/styles";
const queryString = require("query-string");

const useStyles = makeStyles((theme) => ({
}));

// Control the song search based on url query search parameter which then puts it into the the search field.

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
  const history = useHistory();
  const location = useLocation();
  

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    setQuery(parsed.query);
  }, [location]);

  useEffect(() => {
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
      })
      .catch(function (error) {
        console.log("Request failed", error);
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
      <Grid item md={4} sm={6} xs={12}>
        <SongCard
          key={song.id}
          song={song}
          onClick={onClickSongCard}
        />
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
    <div>
      <Toolbar />
      <InfiniteScroll
        dataLength={songs.length}
        next={loadMoreSongs}
        hasMore={moreSongs}
        loader={
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        }
        style={{ overflow: "inherit" }}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more results</b>
          </p>
        }
      >
        <Grid container spacing={3}>
          {songsRender}
        </Grid>
      </InfiniteScroll>
      <VideoDialog
        open={openVideoDialog}
        onClose={handleClose}
        videoId={selectedVideo}
        onReady={_onReady}
      />
    </div>
  );
}

export default SongSearch;
