import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import JsonResultPanel from '../JsonResultPanel';
import QueryControlPanel from '../QueryControlPanel';

const styles = theme => ({
  fill: {
    height: "100%"
  }
});

class QueryScreen extends React.Component {
  handleControlPanelSubmit = (query, sort, pageNumber, pageSize) => {
    if (this.props.query) {
      this.props.query(query, sort, pageNumber, pageSize);
    }
  }

  render = () => {
    return (
      <Container maxWidth="xl" className={this.props.classes.fill}>
        <Grid container spacing={3} className={this.props.classes.fill}>
          <Grid item xs={12} md={3}>
            <QueryControlPanel onSubmit={this.handleControlPanelSubmit} />
          </Grid>
          <Grid item xs={12} md={9}>
            <JsonResultPanel result={this.props.searchResult} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(QueryScreen);
