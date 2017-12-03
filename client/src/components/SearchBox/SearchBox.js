import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap'


class SearchBox extends React.Component {
    
    state = {
        value: ''
    }

  
    render() {

        console.log("SEARCHBOX" ,this.props.searchBoxValue)
      return (
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="text"
              name="searchBoxValue"
              value={this.props.searchBoxValue}
              placeholder="Enter text"
              onChange={this.props.handleInputChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      );
    }
  };
  
  export default SearchBox;
  