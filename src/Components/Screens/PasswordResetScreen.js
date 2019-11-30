import React from 'react';
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/List';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class PasswordResetScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.login) {
      this.props.login(this.state)
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h5" component="h1">
          Password Reset
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(PasswordResetScreen);
