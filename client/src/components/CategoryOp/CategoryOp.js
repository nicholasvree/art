import React from 'react';
import {Button} from 'react-bootstrap'


class CategoryOp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {



    return (
      <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} onClick={this.props.startCategory} value={this.props.cat.category} >{this.props.cat.title}</button>
      
    );
  }
}

export default CategoryOp;