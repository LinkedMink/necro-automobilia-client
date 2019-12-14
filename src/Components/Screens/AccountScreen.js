import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { MIN_PASSWORD_LENGTH } from "../../Constants/Account";
import { ValidationRule, Validator } from "../../Shared/Validator";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.rules = {
      email: { 
        label: "Email Address", 
        rules: [ValidationRule.EMAIL]
      },
      password: {
        label: "Password",
        rules: [[ValidationRule.LENGTH, MIN_PASSWORD_LENGTH]]
      },
      confirmPassword: {
        label: "Confirm Password",
        rules: [[ValidationRule.MATCH, 'password']]
      }
    };

    this.validator = new Validator(this.rules);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      hasRetreivedProfile: false,
      formIsNotDirty: false,
      errors: this.validator.getDefaultErrorState()
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.isDirty()) {
      return;
    }

    const dirtyProperties = {}
    if (this.state.email !== this.props.profile.email) {
      dirtyProperties.email = this.state.email;
    }

    if (this.state.password !== "") {
      dirtyProperties.password = this.state.password;
    }

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.saveAccountData) {
      this.props.saveAccountData(dirtyProperties);
    }
  }

  isDirty = () => {
    return this.props.profile && (
      this.state.email !== this.props.profile.email ||
      this.state.password !== ""
    );
  }

  getProfile = () => {
    if (!this.props.profile) {
      if (this.props.getAccountData) {
        this.props.getAccountData();
      }

      return {};
    }

    if (!this.state.hasRetreivedProfile) {
      this.setState({
        email: this.props.profile.email,
        hasRetreivedProfile: true
      });
    }

    return this.props.profile;
  }

  render = () => {
    return (
      <Container maxWidth="lg">
        <Paper className={this.props.classes.paper}>
          <Typography variant="h3">
            Account: {this.getProfile().email}
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label={this.rules.email.label}
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  error={this.state.errors.email.isInvalid}
                  helperText={this.state.errors.email.message}
                  autoFocus />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label={this.rules.password.label}
                  type="password"
                  value={this.state.password}
                  error={this.state.errors.password.isInvalid}
                  helperText={this.state.errors.password.message}
                  onChange={this.handleChange}
                  id="password" />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label={this.rules.confirmPassword.label}
                  type="password"
                  value={this.state.confirmPassword}
                  error={this.state.errors.confirmPassword.isInvalid}
                  helperText={this.state.errors.confirmPassword.message}
                  onChange={this.handleChange}
                  id="confirmPassword" />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!this.isDirty()}
                  className={this.props.classes.submit}>
                  Save
                </Button>

              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(AccountScreen);
