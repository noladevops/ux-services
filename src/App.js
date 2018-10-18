import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Operations from './Operations';
import Users from './Users';
import { Container, Row, Col } from 'reactstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
    nolab.io iot Dashboard
      <Container>
        <Row>
          <Col xs="5">
             <Operations />
          </Col>
          <Col xs="3">
          <Dashboard />
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
