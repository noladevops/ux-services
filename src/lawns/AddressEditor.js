import React from 'react';
import './CutManifest.css';
import {Row,Col, InputGroup,Input,InputGroupAddon} from 'reactstrap';
import Modal from 'react-modal';
import Address from './Address';
import Customer from './Customer';
import {Alert,Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Card, CardBody, Button} from 'reactstrap'


class AddressEditor extends React.Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
      selectedAddress: {
        lat: 0,
        lng: 0,
        lead: {
          name:""
        },
        cutDay:{
          name:""
        }

      }
    }
  }

componentWillReceiveProps(newProps) {
      this.setState({selectedAddress: newProps.selectedAddress});
  }

render(){
  
  return(
    <div>
    <Row>
      <Col>
        <Alert color="primary">Cut Day: {this.state.selectedAddress.cutDay.name}<Button>Change</Button></Alert>
      </Col>
      <Col>
        <Alert color="primary">Crew Lead: {this.state.selectedAddress.lead.name}<Button>Change</Button></Alert>
      </Col>
    </Row>
   <Row>
     <Col>
       <Address  selectedAddress={this.state.selectedAddress} />
     </Col>
   </Row>
   <Row>
     <Col>

     </Col>
   </Row>
   </div>
 )}

}

module.exports = AddressEditor
