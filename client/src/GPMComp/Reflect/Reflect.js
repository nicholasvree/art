import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'
import ImgCarousel from "../../components/ImgCarousel/ImgCarousel"
import './Reflect.css'



class Reflect extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
                        <h1> Reflect </h1>
                        <ImgCarousel/>
                        <Button onClick={this.props.backToChooseHunt} value="reflect">Back to Choose</Button>

      </div>
    );
  }
}

export default Reflect;