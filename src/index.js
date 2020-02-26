import React from 'react';
import ReactDOM from 'react-dom';
import rpc from './utils/rpc';
import HUD from './components/hud';
import './index.css';
import MainMenu from './components/menu/menu';

const windows = {
  none: {
    id: 'none',
    component: ''
  },
  menu: {
    id: 'menu',
    component: <MainMenu />
  },
  hud: {
    id: 'hud',
    component: <HUD />
  }
};

/**
 * The Main Component
 */
export default class App extends React.Component {

  state = {
    currentWindow: 'menu'
  };

  procedures = {
    SWITCH_UI: {
      run: (window) => { this.setState({ currentWindow: window }); }
    }
  };

  componentDidMount() {
    rpc.register('window::Handler', this.windowHandler);
  }

  windowHandler(data) {
    this.procedures[data.type].run(data.value);
  }

  /**
   * Renders The Main Component
   */
  render() {
    return (
      <div>
        { windows[this.state.currentWindow].component }
      </div>   
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));