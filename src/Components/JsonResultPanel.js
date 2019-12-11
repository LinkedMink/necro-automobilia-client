import Prism from "prismjs";
import 'prismjs/themes/prism-okaidia.css'
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { download } from '../Shared/FileOperations';

const JSON_SPACING = 2;

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '100%',
  },
  download: {
    textAlign: 'right',
  }
});

class JsonResultPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonString: "",
    };
  }

  getResult = () => {
    if (this.props.result) {
      const jsonString = JSON.stringify(this.props.result, null, JSON_SPACING);
      if (jsonString !== this.state.jsonString) {
        this.setState({ 
          jsonString,
        });
        setTimeout(() => Prism.highlightAll(), 100)
      }

      return jsonString;
    }

    return '';
  }

  startDownload = () => {
    download('accidents.json', this.state.jsonString, 'application/json');
  }

  renderDownload = () => {
    if (!this.state.jsonString) {
      return;
    }

    return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<CloudDownloadIcon />}
        onClick={this.startDownload}>
        Download
      </Button>
    );
  }
  render = () => {
    return (
      <Paper className={this.props.classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h4">
              Result
            </Typography>
          </Grid>
          <Grid item xs={6} className={this.props.classes.download}>
            {this.renderDownload()}
          </Grid>
        </Grid>
        <pre className="line-numbers json-result">
          <code className="language-javascript">{this.getResult()}</code>
        </pre>
      </Paper>
    );
  }
}

export default withStyles(styles)(JsonResultPanel);
