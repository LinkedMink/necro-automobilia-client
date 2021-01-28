import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
});

class AccountControls extends React.Component {
  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h4">Delete</Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={this.props.onDelete}
          className={this.props.classes.submit}
        >
          Delete Account
        </Button>
      </Paper>
    );
  };
}

export default withStyles(styles)(AccountControls);
