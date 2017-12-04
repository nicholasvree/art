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
      
   return (
      <div>
        <FormGroup controlId="formBasicText">
        <FormControl
            type="text"
            name="selectedIndex0"
            value={this.props.selectedIndex0}
            placeholder="Enter text"
            onChange={this.props.handleInputChange}/>
        </FormGroup>
      </div>
    );
  }
}

export default ResponseBox;