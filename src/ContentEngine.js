import React from 'react';
import classnames from 'classnames';
import Login from './Login';
import LawnsMaster from './lawns/LawnsMaster'



class ContentEngine extends React.Component {

  constructor(props){
    super(props);
  }


  render() {
    return(
      <div >
      <Login />

          </div>
          )
    }
}

export default ContentEngine;
