import React from 'react';
import './Home.css';
import {Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Card, CardBody} from 'reactstrap'


class Home extends React.Component {


  render(){
    return (<Card>
            <CardBody>
              Welcome
                <ul>
                  <li> Manifest Builder: View / Modify / Generate weekly/daily cut manifest </li>
                  <li> Job Calendar: Track progress and status of jobs </li>
                  <li> Addreses: Manage and View Addresses</li>
                  <li> Customers: Manage and View Customers</li>
                  <li> Operations: View / Manage users and site activity </li>
                </ul>
            </CardBody>
            </Card>)
      }
}


module.exports = Home;
