import React, { useState } from "react";
import {
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function SongSearchBar(props) {

  const [value, setValue] = useState();

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(value);
  }

  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        <TextField onChange={handleChange} defaultValue={props.defaultValue} />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
    </Grid>
  );
}

export default SongSearchBar;
