import React from 'react';
import { Redirect } from 'react-router-dom'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.login) {
      this.props.login(this.state)
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <div>

      </div>
    );
  }
}

export default LoginScreen;