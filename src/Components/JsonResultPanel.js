import Prism from "prismjs";
import 'prismjs/themes/prism-okaidia.css'
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Switch from '@material-ui/core/Switch';

import { download } from '../Shared/FileOperations';

const JSON_SPACING = 2;

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '85vh',
  },
  download: {
    textAlign: 'right',
  },
  code: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    marginTop: theme.spacing(2),
    color: '#fff',
    backgroundColor: '#333',
    border: '1px solid #111',
    boxShadow: '3px 3px 5px 1px rgba(30, 30, 30, .5)'
  }
});

class JsonResultPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonString: "",
      isPrettyPrinting: false
    };
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getResult = () => {
    if (this.props.result) {
      const jsonString = JSON.stringify(this.props.result, null, JSON_SPACING);
      if (jsonString !== this.state.jsonString) {
        this.setState({  jsonString });
        if (this.state.isPrettyPrinting) {
          setTimeout(() => Prism.highlightAll(), 100);
        }
      }

      return jsonString;
    }

    return '';
  }

  handlePrettyPrint = () => {
    this.setState({ isPrettyPrinting: !this.state.isPrettyPrinting })
    if (this.state.isPrettyPrinting) {
      setTimeout(() => Prism.highlightAll(), 100);
    }
  }

  startDownload = () => {
    download('accidents.json', JSON.stringify(this.props.result), 'application/json');
  }

  renderButtons = () => {
    if (!this.state.jsonString) {
      return;
    }

    return (
      <Grid item xs={6} className={this.props.classes.download}>
        {/*
        <FormControlLabel
          control={
            <Switch
              checked={this.state.isPrettyPrinting}
              onChange={this.handlePrettyPrint}
              value="isPrettyPrinting"
              color="primary" />
          }
          label="Highlight Syntax" 
          title="This can be slow."/>
        */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<CloudDownloadIcon />}
          onClick={this.startDownload}>
          Download
        </Button>
      </Grid>
    );
  }

  renderText = () => {
    if (this.state.isPrettyPrinting) {
      return (
        <pre className="line-numbers json-result">
          <code className="language-javascript">{this.getResult()}</code>
        </pre>
      )
    } else {
      return (
        <div className={this.props.classes.code}>
          <pre>
            <code>{this.getResult()}</code>
          </pre>
        </div>
      )
    }
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
          {this.renderButtons()}
        </Grid>
        {this.renderText()}
      </Paper>
    );
  }
}

export default withStyles(styles)(JsonResultPanel);
