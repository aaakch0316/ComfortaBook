import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
interface Props {
  book: any;
  no: any;
}

export default function SimpleCard(props: Props) {
  const classes = useStyles();
  const bookURL = `/read/${props.book.bookNo}`;
  return (
    <Card className={classes.root}>
      <Link className={classes.link} to={bookURL}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            제목
          </Typography>
          <Typography variant="h5" component="h2">
            {props.book.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            작가
          </Typography>
          <Typography variant="body2" component="p">
            {props.book.author}
            <br />
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}