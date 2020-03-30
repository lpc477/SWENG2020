import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { Contact } from './Contact';
import { NoMatch } from './NoMatch';
import App from './WEB_CHAT/App';
import './cssForWebVersion.css';
import {isMobile} from 'react-device-detect';

class AscToolsSite extends Component {
  renderContent = () => {
    if (isMobile) {
        return <App/>
    }
    return (
        <Router>
            <Switch>
              <Route exact path="/AscToolsChat" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/App" component={App} />
              <Route component={NoMatch} />
            </Switch>
        </Router>
    );
}
  render() { 
    return this.renderContent();
  }
}

export default AscToolsSite;
