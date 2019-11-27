import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RouterOutlet from './RouterOutlet';

import './App.scss';

class App extends React.Component {
  render = () => (
    <BrowserRouter>
    <h4>Hello</h4>
      <RouterOutlet />
    </BrowserRouter>
  )
}

export default App;
