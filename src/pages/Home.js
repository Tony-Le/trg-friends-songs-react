import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import SongRecents from "./SongRecents";


function Home(props) {
  const history = useHistory();

  return (
    <div>
      <h2>About</h2>
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
        <a href="/search?query=pollyanna jazz">pollyanna jazz</a>"
      </p>
      <div>
        *Note: The first search will take a minute or so to load as the back-end
        server will require some time to wake up.
      </div>
      <h2>Recent Videos</h2>
      <SongRecents/>
    </div>
  );
}
export default Home;
