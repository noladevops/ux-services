import React from 'react';
import classnames from 'classnames';
import Devices from './Devices';
import Sessions from './Sessions';
import Users from './Users';

import {Card, CardBody, Col, Row, Container} from 'reactstrap'

class Scoreboard extends React.Component {

    render(){
      return(
        <Card>
          <CardBody>
            <Container fluid="true">
              <Row>
                <Col lg="6" sm="13" md={{size: 8, offset: 'auto'}} >
                   <Sessions />
                </Col>
                <Col lg="3" sm="6" md={{size: 4, offset: 'auto'}} >
                  <Devices />
                </Col>
                <Col lg="3" sm="4" md={{size: 6, offset: 'auto'}} >
                  <Users />
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>

      )
    }

}

export default Scoreboard
