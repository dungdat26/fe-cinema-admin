import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: "2rem auto",
    marginLeft: 15,
    width: 250,
    minHeight: 350,
  },
  media: {
    height: 350,
    width: 250,
  },
  link: {
    textDecoration: "none",
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.introduce}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/edit-producer/${props.id_producer}`} className={classes.link}>
          <Button variant="contained" size="small" color="secondary">
            Edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
