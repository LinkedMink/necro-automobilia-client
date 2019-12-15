import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LocationResultCard from './LocationResultCard';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    maxHeight: '85vh',
  },
});

class LocationResultPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };

    this.containerRef = React.createRef();
    this.selectedRef = React.createRef();
  }

  scrollToSelected = () => {
    this.containerRef.current.scrollTo({
      top: this.selectedRef.current.offsetTop - this.containerRef.current.offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  }
  
  renderResults = () => {
    if (!this.props.results) {
      return (
        <Typography variant="body1">
          No results
        </Typography>
      );
    }

    return this.props.results.map((result, index) => {
      const selected = this.state.selected === index;

      if (selected) {
        return (
          <LocationResultCard 
            key={index}
            index={index}
            avatar={index + 1} 
            result={result}
            containerRef={this.selectedRef}
            selected={selected}
            onSelect={this.props.onSelect} 
            onFavorite={this.props.onFavorite} 
            onShare={this.props.onShare} />
        );
      }

      return (
        <LocationResultCard 
          key={index}
          index={index}
          avatar={index + 1} 
          result={result}
          selected={selected}
          onSelect={this.props.onSelect} 
          onFavorite={this.props.onFavorite} 
          onShare={this.props.onShare} />
      );
    });
  }

  render = () => {
    if (this.state.selected !== this.props.selected) {
      this.setState({selected: this.props.selected});
      setTimeout(this.scrollToSelected.bind(this), 200);
    }

    return (
      <Paper 
        ref={this.containerRef}
        className={this.props.classes.paper}>
        <Typography variant="h4">
          Results
        </Typography>
        {this.renderResults()}
      </Paper>
    );
  }
}

export default withStyles(styles)(LocationResultPanel);
