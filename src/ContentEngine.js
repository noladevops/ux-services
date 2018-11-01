import React from 'react';
import classnames from 'classnames';
import Addresses from './lawns/Addresses';
import Customers from './lawns/Customers';
import CutManifest from './lawns/CutManifest';
import JobCalendar from './lawns/JobCalendar';
import Scoreboard from './Scoreboard';


import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'

class ContentEngine extends React.Component {

  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '4'
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
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Manifest Builder
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              Job Calendar
            </NavLink>
          </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Addresses
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                  >
                  Customers
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

              <TabPane tabId="4">
                <CutManifest />
              </TabPane>
              <TabPane tabId="5">
                <JobCalendar />
              </TabPane>

              <TabPane tabId="1">
                <Addresses />
              </TabPane>

              <TabPane tabId="3">
                <Customers />
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
