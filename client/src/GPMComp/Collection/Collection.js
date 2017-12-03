import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'
import API from "../../utils/API";
import PictureBox from "../../components/PictureBox/PictureBox"


class Collection extends React.Component {

  state={
    retrievedImages:[]
  }

  componentDidMount(){
    API.getSavedImages()
    .then(res => {
      console.log(res)
      this.setState({retrievedImages: res.data.image})
    })
  }

  render() {
    let retrievedPictureBoxes=this.state.retrievedImages.map( image =>{   
            return(
                <PictureBox image={image} openModal={this.openModal} closeModal={this.closeModal} processAnswer={this.handleImageSave} />
            ) 
        })
  
    return (
        <div className="container">
            <div className="row">
                <h1>Collection</h1>
            </div>
            <div className="row">
                {retrievedPictureBoxes}
            </div>
            <Button onClick={this.props.backToChooseHunt} value="reflect">Back to Choose</Button>
        </div>
    );
  }
}

export default Collection;


