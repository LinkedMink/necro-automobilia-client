import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { ValidationRule, Validator } from "../Shared/Validator";

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

class QueryControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.rules = {
      query: { 
        label: "Query", 
        rules: [ValidationRule.JSON]
      },
      sort: {
        label: "Sort Properties",
        rules: [ValidationRule.JSON]
      },
      pageNumber: {
        label: "Page Number",
        rules: [[ValidationRule.RANGE, 0]]
      },
      pageSize: {
        label: "Items per Page",
        rules: [[ValidationRule.RANGE, 1, 100]]
      },
    };

    this.validator = new Validator(this.rules);

    this.state = {
      query: "",
      sort: "",
      pageNumber: "",
      pageSize: "",
      errors: this.validator.getDefaultErrorState()
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const validationState = this.validator.validate(this.state);
    this.setState({ errors: validationState.errors });

    if (validationState.isValid && this.props.onSubmit) {
      this.props.onSubmit(this.state.query, this.state.sort, this.state.pageNumber, this.state.pageSize);
    }
  }

  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h4">
          Fatality Query
        </Typography>
        <form className={this.props.classes.form} onSubmit={this.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            placeholder='{ "stateName": "Minnesota" }'
            fullWidth
            multiline
            rows="2"
            rowsMax="5"
            id="query"
            label={this.rules.query.label}
            name="query"
            type="text"
            onChange={this.handleChange}
            value={this.state.query}
            error={this.state.errors.query.isInvalid}
            helperText={this.state.errors.query.message}
            autoFocus />
          <TextField
            variant="outlined"
            margin="normal"
            placeholder='{ "consecutiveNumber": -1 }'
            fullWidth
            multiline
            rows="2"
            rowsMax="5"
            name="sort"
            label={this.rules.sort.label}
            type="text"
            value={this.state.sort}
            error={this.state.errors.sort.isInvalid}
            helperText={this.state.errors.sort.message}
            onChange={this.handleChange}
            id="sort" />
          <TextField
            variant="outlined"
            margin="normal"
            placeholder="Default 0"
            fullWidth
            name="pageNumber"
            label={this.rules.pageNumber.label}
            type="number"
            value={this.state.pageNumber}
            error={this.state.errors.pageNumber.isInvalid}
            helperText={this.state.errors.pageNumber.message}
            onChange={this.handleChange}
            id="pageNumber" />
          <TextField
            variant="outlined"
            margin="normal"
            placeholder="Default 20"
            fullWidth
            name="pageSize"
            label={this.rules.pageSize.label}
            type="number"
            value={this.state.pageSize}
            error={this.state.errors.pageSize.isInvalid}
            helperText={this.state.errors.pageSize.message}
            onChange={this.handleChange}
            id="pageSize" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.submit}>
            Submit
          </Button>
        </form>
        <Typography variant="body1">
          TODO. This will eventually display the data in a more user friendly format. For now,
          I've created this tool for colloborators to get a sense of the available data.
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(QueryControlPanel);
