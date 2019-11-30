import React from 'react';

class AboutScreen extends React.Component {
  render() {
    return (
      <div>
        <h2>About</h2>
        <ul>
          <li>
            <a href="https://github.com/LinkedMink/node-user-service">User Service</a>
          </li>
          <li>
            <a href="https://github.com/LinkedMink/necro-automobilia">Necro Automobilia</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default AboutScreen;