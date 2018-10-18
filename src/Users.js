import React from 'react';
import ReactDataGrid from 'react-data-grid';
import User from './User'
import Modal from 'react-modal'
import './Users.css';

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

class Users extends React.Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
     modalIsOpen: false
     ,users: [{"id":-1,"username":"a user","name":"a ghost", "created": new Date().toString(), "lastSeen": new Date().toString()}]
     ,selectedUser: {}
   };

   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
   this.columns = [
      { key: 'username', name: 'User'}
      ,{key: 'name', name: 'Name'}
      ,{key: 'created', name: "Created"}
      ,{key: 'lastSeen', name: 'Last Seen'}
    ]
  }

  rowGetter = (i) => {
    return this.state.users[i];
  };

  componentDidMount() {
   fetch("api/users")
  .then( response => {
    if (!response.ok) { throw new Error(response) }
    return response.json()  //we only get here if there is no error
  })
  .then( (json) => {
      let users = json.data.map( (user) => {
        user.key = user._id;
        return user;
      } );
      this.setState({"users": users});
    }
  )

  .catch( (err) => {
      console.log(err)
  })
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

 onRowsSelected = (rowIndex) => {
    console.log("Row Selected" + "\n" + this.rowGetter(rowIndex) );
    // lazy-load a devices messages before setting state
    fetch("api/users/" + this.rowGetter(rowIndex)._id)
    .then( (response)=>{
      return response.json();
    })
    .then( (json)=> {
      this.rowGetter(rowIndex).messages = json.data.messages;
      this.setState({selectedUser: this.rowGetter(rowIndex)});
      this.openModal();
    })

  };

  onRowsDeselected = (rows) => {

    //let rowIndexes = rows.map(r => r.rowIdx);
    //this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  };


// componentWillUnmount() {
//   clearInterval(this.interval);
// }

render() {
  return (
    <div className="operations-container" >
      Users <br />
      Count: {this.state.users.length}
      <div className="user-container">
          <ReactDataGrid
            columns={this.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.users.length}
            minHeight={500}
            enableRowSelect="single"
            onRowClick={this.onRowsSelected}
            rowSelection={{
            showCheckbox: false,
              selectBy: {
                isSelectedKey: 'isSelected'
            }}}
            />
      </div>
      <div>
        <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         ariaHideApp={false}
         contentLabel="User Details">
           <User  selectedUser={this.state.selectedUser} />
        </Modal>
      </div>
    </div>

  )
}

}

export default Users;
