import React, { useEffect, useState } from "react";
import {  Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";

function SongSearch(props) {

  function onClick() {
    props.onClick(props.song);
  }

  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          image={"https://i.ytimg.com/vi/" + props.song.id + "/hqdefault.jpg"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.song.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SongSearch;
