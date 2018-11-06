import React from 'react';
import classnames from 'classnames';
import Home from './Home';
import Addresses from './Addresses';
import Customers from './Customers';
import CutManifest from './CutManifest';
import JobCalendar from './JobCalendar';
import Scoreboard from '../Scoreboard';

import {Container, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'

class LawnsMaster extends React.Component {

  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '6'
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab ){
      this.setState({
        activeTab: tab
      });
    }
  }


  render(){
    return(

    <Container>
      <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: this.state.activeTab === '6' })}
          onClick={() => { this.toggle('6'); }}
        >
          Home
        </NavLink>
      </NavItem>
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
        <TabPane tabId="6">
          <Home />
        </TabPane>
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
      </Container>
    );
  }
}

module.exports = LawnsMaster;
