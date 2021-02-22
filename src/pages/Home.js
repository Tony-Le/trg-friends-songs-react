import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import SongSearchField from "./SongSearchField";

function Home(props) {
  const history = useHistory();

  useEffect(() => {
    //Call an empty search to try and wake up server early
    const url =
      "https://trg-friends-songs-api.herokuapp.com/songs/api/search?query=";
    fetch(url)
      .then((response) => {})
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }, []);

  function onSubmit(value) {
    if (value) {
      history.push("/search?query=" + value);
    }
  }

  return (
    <div>
      <Grid container justify="center">
        <img
          src="/TRG Logo.jpg"
          alt="The Runaway Guys Logo"
          height="150px"
          width="150px"
        ></img>
        <img
          src="/developed-with-youtube-sentence-case-dark.png"
          alt="The Runaway Guys Logo"
          height="150px"
        ></img>
      </Grid>
      <p>
        To learn about the other members of The Runaway Guys Colosseum and their
        annual charity event, check out <span> </span>
        <a href="https://www.therunawayguys.com/colosseum-direct">
          https://www.therunawayguys.com/colosseum-direct
        </a>
        .
      </p>
      <p>
        If you do not know what to search for try searching<span> </span>"
        <Link to="/search?query=pollyanna jazz">pollyanna jazz</Link>"
      </p>
      <SongSearchField onSubmit={onSubmit} />
      <div>
        *Note: The first search will take a minute or so to load as the back-end
        server will require some time to wake up.
      </div>
    </div>
  );
}
export default Home;
