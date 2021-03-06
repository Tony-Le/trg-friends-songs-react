
import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Container,
} from "@material-ui/core";
import Home from "./pages/Home";
import SongSearch from "./pages/SongSearch";
import NavBar from "./pages/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Container>
        <Switch>
          <Route path="/search">
            <SongSearch />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
