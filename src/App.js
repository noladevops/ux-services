import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Operations from './Operations';
import { Container, Row, Col } from 'reactstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
    nolab.io iot Dashboard
      <Container>
        <Row>
          <Col xs="5">
            <Dashboard />
          </Col>
          <Col xs="5">
             <Operations />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
