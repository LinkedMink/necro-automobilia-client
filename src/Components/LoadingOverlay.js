import clsx from 'clsx';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  overlay: {
    width: "100%",
    height: "calc(100% - 56px)",
    backgroundColor: "#282d32",
    color: "azure",
    zIndex: -1,
    opacity: 0,
    transition: "0.25s ease-in-out",
  },
  overlayVisible: {
    zIndex: 100,
    opacity: 0.6
  }
});

class LoadingOverlay extends React.Component {
  renderLoadingAnimation() {
    if (Number.isInteger(this.props.percentComplete)) {
      return (
        <LinearProgress />
      );
    } else {
      return (
        <LinearProgress variant="determinate" value={this.props.percentComplete} />
      );
    }
  }

  render() {
    return (
      <div className={clsx(
        this.props.classes.overlay, 
        this.props.isLoading && this.props.classes.overlayVisible)}>
        <Container maxWidth="lg">
          {this.renderLoadingAnimation()}
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(LoadingOverlay);
