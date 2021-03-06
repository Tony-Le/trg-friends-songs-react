import React, { useState } from "react";
import { Grid, IconButton, InputBase, Paper, Divider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: 500,
    maxHeight: "3em",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  maxHeight: {
    maxHeight: "4em",
  },
}));

function SongSearchBar(props) {
  const classes = useStyles();

  const [value, setValue] = useState();

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (value) {
      props.onSubmit(value);
    }
    else {
      props.onSubmit(props.defaultValue);
    }
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
      <InputBase
        onChange={handleChange}
        defaultValue={props.defaultValue}
        className={classes.input}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SongSearchBar;
