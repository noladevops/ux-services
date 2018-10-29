import React from 'react';
import classnames from 'classnames';
import Dashboard from './Dashboard';
import Scoreboard from './Scoreboard';

import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'

class ContentEngine extends React.Component {

  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab ){
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return(
      <div>
          <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Operations
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab} >
              <TabPane tabId="1">
                <Dashboard />
              </TabPane>
              <TabPane tabId="2">
                  <Scoreboard />
              </TabPane>
            </TabContent>
          </div>
          )
    }
}

export default ContentEngine;
