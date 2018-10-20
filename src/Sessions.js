import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Session from './Session'
import Modal from 'react-modal'
import './Sessions.css';

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

class Sessions extends React.Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
     modalIsOpen: false
     ,sessions: [{"id":-1,"pastRequests":[],"authProvider":"a ghost", "created": new Date().toString(), "lastSeen": new Date().toString()}]
     ,selectedSession: {}
   };

   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
   this.columns = [
      { key: 'sid', name: 'Session ID'}
      ,{key: 'created', name: 'Created'}
      ,{key: 'lastSeen', name: 'Last Seen'}
      ,{key: 'authProvider', name: "Auth Provider"}
    ]
  }

  rowGetter = (i) => {
    return this.state.sessions[i];
  };

  componentDidMount() {
   fetch("api/activity/sessions",{
  credentials: "include"
})
  .then( response => {
    if (!response.ok) { throw new Error(response) }
    return response.json()  //we only get here if there is no error
  })
  .then( (json) => {
      let sessions = json.data.map( (session) => {
        session.key = session._id;
        return session;
      } );
      this.setState({"sessions": sessions});
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
    fetch("api/activity/sessions/" + this.rowGetter(rowIndex)._id)
    .then( (response)=>{
      return response.json();
    })
    .then( (json)=> {
      this.rowGetter(rowIndex).messages = json.data.messages;
      this.setState({selectedSession: this.rowGetter(rowIndex)});
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
      Sessions <br />
      Count: {this.state.sessions.length}
      <div className="session-container">
          <ReactDataGrid
            columns={this.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.sessions.length}
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
         contentLabel="Session Details">
           <Session  selectedSession={this.state.selectedSession} />
        </Modal>
      </div>
    </div>

  )
}

}

export default Sessions;
