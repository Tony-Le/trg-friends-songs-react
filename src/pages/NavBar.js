import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Paper,
  AppBar,
  Toolbar,
  Hidden,
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
                <Hidden xsDown>
                  <Grid item md={3} sm={6}>
                    <Link to="/home">
                      <img
                        src="/Web Logo.png"
                        alt="The Runaway Guys Logo"
                        height="50px"
                      ></img>
                    </Link>
                  </Grid>
                </Hidden>
                <Hidden smUp>
                  <Grid item xs={2}>
                    <Link to="/home">
                      <img
                        src="/TRG Logo.jpg"
                        alt="The Runaway Guys Logo"
                        height="50px"
                      ></img>
                    </Link>
                  </Grid>
                </Hidden>
                <Grid container item justify="center" md={6} sm={6} xs={10}>
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