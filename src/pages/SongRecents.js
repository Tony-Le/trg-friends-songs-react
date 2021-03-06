import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
} from "@material-ui/core";
import SongCard from "./SongCard";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoDialog from "./VideoDialog";

function SongSearch(props) {

  const songPageLength = 15;
  const [songs, setSongs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [moreSongs, setMoreSongs] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [playerRef, setPlayerRef] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const url =
      "https://trg-friends-songs-api.herokuapp.com/songs/api/recent";
    setPageNumber(0);
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
            setSongs(data._embedded.songList);
            setMoreSongs(data._embedded.songList.length >= songPageLength);
            setLoading(false);
          }
        } else {
          // no songs found
          setSongs([]);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }, []);

  function loadMoreSongs() {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);
    const url =
      "https://trg-friends-songs-api.herokuapp.com/songs/api/recent?pageNumber=" +
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

  function onClickSongCard(song) {
    // if same song id start the video again
    if (song.id == selectedVideo) {
      playerRef.playVideo();
    } else {
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
      <InfiniteScroll
        style={{ overflow: "inherit" }}
        dataLength={songs.length}
        next={loadMoreSongs}
        hasMore={moreSongs}
        loader={
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        }
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
