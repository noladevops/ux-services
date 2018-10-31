import React from 'react';
import './Customer.css';
import {Button, Card, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap'

class Customer extends React.Component {

  // constructor(props,context) {
  //   super(props,context);
  //
  // }

  componentWillUnmount() {

  }

  componentDidMount() {

  }

  render() {
    return(

      <div >
      <Card>
      <div>
        <br /><CardTitle>
         {this.props.selectedCustomer.originalText}
      </CardTitle>
      </div>
      <div>
        Customer: <br />
        {this.props.selectedCustomer.name}
      </div>
      <div>
        Contact: <br />
        {this.props.selectedCustomer.contact}
      </div>
      <div>
        Email: <br />
        {this.props.selectedCustomer.email}
      </div>
      <div>
        Day: <br />
        {this.props.selectedCustomer.day}
      </div>
      <div style={{width:"500px", border: "solid 1px black"}}>
      <ul>
        {this.props.selectedCustomer.addresses.map( (address)=>{
          return <li> {address} </li>
        })}
      </ul>
      </div>
      </Card>
    </div>)
  }

}

export default Customer;
