import React from 'react';
import classnames from 'classnames';
import Login from './Login';
import LawnsMaster from './lawns/LawnsMaster'



class ContentEngine extends React.Component {

  constructor(props){
    super(props);
    this.state = {authenticationStatus:"Please Log in",isLoggedIn:false,loginChecked:false, loginHidden:false,lawnsMasterHidden:true}
  }

  componentDidMount(){
    fetch('/api/auth/whoami', {credentials: "include" })
    .then( response => {
      if (!response.ok) {
         // console.log(response.data.message);
         throw new Error(response.data.message) }
      return response.json()  //we only get here if there is no error
    })
    .then( (json)=>{
      console.log("WhoAmi response: " + json.message);
      if (json.status===401) {
        this.setState({loginChecked:true,loginMessage:"Please Log In"});
      } else {
        this.setState({isLoggedIn:true,loginChecked:true,loginMessage:"Login Sucessful"});
      }
    })
    .catch( (err)=>{
      console.log("Respojkbkjbnse: \n");
      this.setState({loginChecked:true,loginMessage:"Please Log In"});
    })
  }


  loginSuccess(){

  }


  render() {


    let content;
    if(!this.state.isLoggedIn) {
      content = <div>
                  <Login authenticationStatus={this.state.authenticationStatus} />
                </div>


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
