import React from 'react';
import Modal from 'react-modal'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

import './Login.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth             : '500px',
    maxHeight            : '500px'
  }
};

class Login extends React.Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
     modalIsOpen: false,
     loginMessage: props.loginMessage
   };
   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
   this.sendLogin = this.sendLogin.bind(this);
   this.loginChange = this.loginChange.bind(this);
   this.passwordChange = this.passwordChange.bind(this);
  }

static getDerivedStateFromProps(nextProps,prevState){
    console.log("Next Login Message: " + nextProps.authenticationStatus);
    if(nextProps.authenticationStatus!==prevState.authenticationStatus){
      return {authenticationStatus: nextProps.authenticationStatus };
  } else {
    return { authenticationStatus: prevState.authenticationStatus}
  }
}

  componentDidMount() {
      this.setState({modalIsOpen: true});
  }

openModal() {
  this.setState({modalIsOpen: true});
 }

 afterOpenModal() {
   // references are now sync'd and can be accessed.
   //this.subtitle.style.color = '#f00';
 }

 closeModal() {
   this.setState({modalIsOpen: false});

 }

 sendLogin(event) {
   console.log("Sending U/P to log-in");
   console.log(this.state.username + " " +  this.state.password);
   fetch('/api/auth', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       username: this.state.username,
       password: this.state.password,
     })
   })
   .then( (json)=>{
     console.log("Login Response: " + JSON.stringify(json));
     if (json.status===401) {
       this.setState({loginChecked:true,loginMessage:"Login Failed"});
     } else if (json.status===200) {
       this.setState({isLoggedIn:true,loginChecked:true,loginMessage:"Login Sucessful"});
     } else {
        this.setState({loginChecked:true,loginMessage:"Error Logging In, please contact us"});
     }
   })
   .catch( (err)=>{
     // console.log("Respojkbkjbnse: \n" + err);
     this.setState({loginChecked:true,loginMessage:"Error Logging In"});
   })
 }

loginChange(event){
  this.setState({username: event.target.value});
}
passwordChange(event){
  this.setState({password: event.target.value});
}

render() {
  return (
    <div className="login-container" >

        <Modal
         isOpen={this.state.modalIsOpen}
         onRequestClose={this.closeModal}
         style={customStyles}
         ariaHideApp={false}
         contentLabel="Login">
         <Form>
           <FormGroup>
             <Label for="exampleEmail">Email</Label>
             <Input type="email" name="email" id="usernameInput" placeholder="username" onChange={this.loginChange} />
           </FormGroup>
           <FormGroup>
             <Label for="examplePassword">Password</Label>
             <Input type="password" name="password" id="passwordInput" placeholder="password" onChange={this.passwordChange} />
           </FormGroup>
           <FormGroup>
              <Button onClick={this.sendLogin.bind(this)}>Submit</Button>{' '}
           </FormGroup>
           <FormGroup>
            {this.state.loginMessage} <br />
            {this.state.authenticationStatus}
           </FormGroup>
        </Form>
        </Modal>
    </div>


  )
}

}

export default Login;
