import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Address from './Address'
import Modal from 'react-modal'
import './Addresses.css';

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

class Addresses extends React.Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
     modalIsOpen: false
     ,addresses: [{"id":-1,"originalText":"ghost's house","customerText":"Mr Ghost","day":"Ghost Day","crew lead":"Ghost"}]
     ,selectedAddress: {}
   };

   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
   this.columns = [
      { key: 'originalText', name: 'Original Address'}
      ,{key: 'customerText', name: 'Customer'}
      ,{key: 'day', name: 'Day'}
      ,{key: 'crewLead', name: "Crew Lead"}
    ]
  }

  rowGetter = (i) => {
    return this.state.addresses[i];
  };

  componentDidMount() {
   fetch("api/addresses",{
  credentials: "include"
})
  .then( response => {
    if (!response.ok) { throw new Error(response) }
    return response.json()  //we only get here if there is no error
  })
  .then( (json) => {
      let addresses = json.data.map( (address) => {
        address.key = address._id;
        return address;
      } );
      this.setState({"addresses": addresses});
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
    fetch("api/addresses/" + this.rowGetter(rowIndex)._id)
    .then( (response)=>{
      return response.json();
    })
    .then( (json)=> {
      //this.rowGetter(rowIndex).messages = json.data.messages;
      this.setState({selectedAddress: this.rowGetter(rowIndex)});
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
      Addresses <br />
      Count: {this.state.addresses.length}
      <div className="address-container">
          <ReactDataGrid
            columns={this.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.addresses.length}
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
         contentLabel="Address Details">
           <Address  selectedAddress={this.state.selectedAddress} />
        </Modal>
      </div>
    </div>


  )
}

}

export default Addresses;
