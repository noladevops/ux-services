import React from 'react';
import './App.css';
import Devices from './Devices';
import Sessions from './Sessions';
import Users from './Users';
import Login from './Login';
import { Container, Row, Col } from 'reactstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
    nolab.io iot Dashboard
      <Login />
      <Container>
        <Row>
          <Col xs="5">
             <Sessions />
          </Col>
          <Col xs="3">
          <Devices />
          </Col>
          <Col xs="3">
            <Users />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
