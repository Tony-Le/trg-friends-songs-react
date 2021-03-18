import React from "react";
import {  Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";

function SongSearch(props) {

  function onClick() {
    props.onClick(props.song);
  }

  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          image={"https://i.ytimg.com/vi/" + props.song.id + "/mqdefault.jpg"}
        />
        <CardContent>
          <Typography gutterBottom noWrap={true}>
            {props.song.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SongSearch;
