import React from 'react';
import {Button} from 'react-bootstrap'


class CategoryOp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button onClick={this.props.startCategory} value={this.props.cat.category} >{this.props.cat.title}</Button>
      
    );
  }
}

export default CategoryOp;