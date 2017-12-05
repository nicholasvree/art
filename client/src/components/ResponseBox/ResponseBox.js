import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap'

class ResponseBox extends React.Component {
  

    state = {
            value: ''
    }
  
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };


  render() {

    let space={
      marginTop:20,
      marginBottom:20,
      minWidth:"100%"
    }
      
   return (
      <div >
        <textarea
            className={"form-control"}
            style={{borderColor:"orange", borderWidth:"medium"}}
            style={space}
            rows={10}
            componentClass="textarea"                
            type="textarea"
            name="selectedIndex0"
            value={this.props.selectedIndex0}
            placeholder="Write Response Here"
            onChange={this.props.handleInputChange}/>
        
      </div>
    );
  }
}

export default ResponseBox;