import React from 'react';
import Addresses from './lawns/Addresses'
import {Button, Card, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap'


class Dashboard extends React.Component {

  render() {
      return (
        <Card>
          <CardBody>
          <CardTitle>Customer Address Index</CardTitle>
            <Addresses />
          </CardBody>
        </Card>
      )
    }

}


export default Dashboard
