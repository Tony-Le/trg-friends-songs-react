import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Paper,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { useHistory, useLocation, Link } from "react-router-dom";
import SongSearchField from "./SongSearchField";
const queryString = require("query-string");

function NavBar(props) {

    const history = useHistory();

    function onSubmit(value) {
      if (value) {
        history.push("/search?query=" + value);
      }
    }

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Container>
              <Grid container justify="space-between">
                <Grid item xs={3}>
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
                <Grid container item justify="center" xs={6}>
                  <SongSearchField
                    onSubmit={onSubmit}
                    defaultValue={
                      queryString.parse(window.location.search).query
                    }
                  ></SongSearchField>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    );
}

export default NavBar;