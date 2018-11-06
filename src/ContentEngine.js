import React from 'react';
import classnames from 'classnames';
import Login from './Login';
import LawnsMaster from './lawns/LawnsMaster'



class ContentEngine extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoggedIn:false,loginChecked:false, loginHidden:false,lawnsMasterHidden:true}
  }



  componentDidMount(){
    fetch('/api/auth/whoami')
    fetch("/api/addresses", {credentials: "include" })
    .then( response => {
      if (!response.ok) { throw new Error(response) }
      return response.json()  //we only get here if there is no error
    })
    .then( (json)=>{
      console.log(json);
      console.log("Confirmed user logged in");
      this.setState({isLoggedIn:true,loginChecked:true});

    })
    .catch( (err)=>{
      console.log(err);
      this.setState({loginChecked:true});
    })
  }


  loginSuccess(){

  }


  render() {


    let content;
    if(!this.state.isLoggedIn) {
      content = <Login />
    } else {
      content = <LawnsMaster />
    }

    return(
      <div >
        {content}
      </div>
          )
    }
}

export default ContentEngine;
