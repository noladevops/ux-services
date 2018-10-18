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
     modalIsOpen: false
   };
   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
  }


  componentDidMount() {
      this.setState({modalIsOpen: true});
  }

openModal() {
  console.log("Open Modal")
   this.setState({modalIsOpen: true});
 }

 afterOpenModal() {
   // references are now sync'd and can be accessed.
   //this.subtitle.style.color = '#f00';
 }

 closeModal() {
   this.setState({modalIsOpen: false});

 }

 sendLogin() {
   console.log("Sending U/P to log-in");
   fetch('/api/auth', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       firstParam: 'yourValue',
       secondParam: 'yourOtherValue',
     })
   })
   .then( ()=> {
     console.log("Logged In");
   } )
 }

render() {
  return (
    <div className="login-container" >

        <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         ariaHideApp={false}
         contentLabel="Login">
         <Form>
           <FormGroup>
             <Label for="exampleEmail">Email</Label>
             <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
           </FormGroup>
           <FormGroup>
             <Label for="examplePassword">Password</Label>
             <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
           </FormGroup>
           <FormGroup>
              <Button onClick={this.sendLogin()}>Submit</Button>{' '}
           </FormGroup>
        </Form>
        </Modal>
    </div>


  )
}

}

export default Login;
