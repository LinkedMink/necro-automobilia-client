import clsx from 'clsx';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#282d32",
    zIndex: -1,
    opacity: 0,
    transition: "0.2s ease-in-out",
  },
  overlayVisible: {
    zIndex: 100,
    opacity: 0.6
  },
  animation: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  }
});

class LoadingOverlay extends React.Component {
  renderLoadingAnimation() {
    if (Number.isInteger(this.props.percentComplete)) {
      return (
        <LinearProgress variant="determinate" value={this.props.percentComplete} />
      );
    } else {
      return (
        <LinearProgress />
      );
    }
  }

  render() {
    return (
      <div className={clsx(
        this.props.classes.overlay, 
        this.props.isLoading && this.props.classes.overlayVisible)}>
        <Container maxWidth="lg" className={this.props.classes.animation}>
          {this.renderLoadingAnimation()}
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(LoadingOverlay);
