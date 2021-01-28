import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import FeedEventCard from "./FeedEventCard";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
});

class FeedScreen extends React.Component {
  renderEvents = () => {
    if (!this.props.events) {
      return;
    }

    return this.props.events.map((event, index) => {
      return (
        <FeedEventCard
          key={index}
          index={index}
          avatar={event.title.substring(0, 1)}
          event={event}
        />
      );
    });
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h3">Feed</Typography>
          {this.renderEvents()}
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(FeedScreen);
