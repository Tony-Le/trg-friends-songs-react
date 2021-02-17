
import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SongSearch from "./pages/SongSearch";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search">
          <SongSearch />
        </Route>
        {/* <Route path="/">
          <Home/>
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
