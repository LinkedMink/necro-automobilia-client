import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { SettingsKey } from "../../Constants/Settings";
import AccountSettingsPanel from "./AccountSettingsPanel";
import UnitsSettingsPanel from "./UnitsSettingsPanel";
import AccountControls from "./AccountControls";

const styles = theme => ({
  container: {
    "& > div": {
      marginBottom: theme.spacing(2),
    },
  },
});

class SettingsScreen extends React.Component {
  handleUnitSettingsUpdate = properties => {
    if (this.props.saveSettings) {
      const id = this.props.settings[SettingsKey.UNITS_OF_MEASURE];
      this.props.saveSettings(id, SettingsKey.UNITS_OF_MEASURE, properties);
    }
  };

  handleAccountUpdate = properties => {
    if (this.props.saveAccountData) {
      this.props.saveAccountData(properties);
    }
  };

  handleAccountDelete = () => {
    if (this.props.deleteConfirm) {
      this.props.deleteConfirm();
    }
  };

  componentDidMount = () => {
    if (!this.props.profile) {
      if (this.props.getAccountData) {
        this.props.getAccountData();
      }
    }
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.props.deleteConfirmResult !== undefined) {
      if (this.props.deleteConfirmResult === true) {
        if (this.props.deleteAccountData) {
          this.props.deleteAccountData();
        }
      } else {
        if (this.props.deleteConfirmClear) {
          this.props.deleteConfirmClear();
        }
      }
    }
  };

  render = () => {
    return (
      <Container maxWidth="md" className={this.props.classes.container}>
        <AccountSettingsPanel
          profile={this.props.profile}
          onUpdate={this.handleAccountUpdate}
        />
        <UnitsSettingsPanel
          settings={
            this.props.settings &&
            this.props.settings[SettingsKey.UNITS_OF_MEASURE]
          }
          onUpdate={this.handleUnitSettingsUpdate}
        />
        <AccountControls onDelete={this.handleAccountDelete} />
      </Container>
    );
  };
}

export default withStyles(styles)(SettingsScreen);
