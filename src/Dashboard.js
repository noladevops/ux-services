import React from 'react';
import {Button, Card, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap'


class Dashboard extends React.Component {

  render() {
      return (
        <Card>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card content.</CardText>
              <Button>Button</Button>
          </CardBody>
        </Card>
      )
    }

}


export default Dashboard
