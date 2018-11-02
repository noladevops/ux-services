import React from 'react';
import './App.css';
import ContentEngine from './ContentEngine'
import Login from './Login';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Container, Row, Col, Jumbotron } from 'reactstrap';
import classnames from 'classnames';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">

      <Login />
      <Jumbotron className="jumboheader">
        <h4>  lawns.io </h4>
      </Jumbotron>

      <ContentEngine />
    
  </div>
  );
};

export default App;
