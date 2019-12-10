import Prism from "prismjs";
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const JSON_SPACING = 2;

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '100%',
  },
});

class JsonResultPanel extends React.Component {
  componentDidMount = () => {
    Prism.highlightAll();
  }

  getResult = () => {
    if (this.props.result) {
      return JSON.stringify(this.props.result, null, JSON_SPACING);
    }

    return '';
  }

  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="h4">
          Result
        </Typography>
        <pre>
          <code className="language-json">{this.getResult()}</code>
        </pre>
      </Paper>
    );
  }
}

export default withStyles(styles)(JsonResultPanel);
