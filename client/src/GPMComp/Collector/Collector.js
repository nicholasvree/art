import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'
import SearchBox from "../../components/SearchBox/SearchBox"
import API from "../../utils/API";
import PictureBox from "../../components/PictureBox/PictureBox"



class Collector extends React.Component {

    state={
        retrievedImages:[]
    }

    handleSearch = (event) => {
        event.preventDefault()

        API.searchImages(this.props.searchBoxValue)
        .then(res => {
            this.setState({retrievedImages: res.data.data}, () => console.log(this.state.retrievedImages))})
        .catch(err => console.logErr)


  }

  handleImageSave = (event) => {

      event.preventDefault()
      console.log("clicked")
      let imageValue = event.target.value.split("|")
      
      API.saveImage({brook_id: imageValue[0], title:imageValue[1], primary_image:imageValue[2]})
    }

  render() {
    let retrievedPictureBoxes=this.state.retrievedImages.map( image =>{   
            return(
                <PictureBox image={image} openModal={this.openModal} closeModal={this.closeModal} handleFlow={this.handleImageSave} />
            ) 
        })
    

    

    return (
        <div className="container">
            <div className="row">
                <h1>Collector</h1>
                <div className="col-md-8">
                    <SearchBox handleInputChange={this.props.handleInputChange} searchBoxValue={this.props.searchBoxValue}/>
                </div>
                <div className="col-md-4">
                    <Button onClick={this.handleSearch}>Search</Button>
                </div>
            </div>
            <div className="row">
                {retrievedPictureBoxes}
            </div>
            <Button onClick={this.props.backToChooseHunt} value="reflect">Back to Choose</Button>
        </div>
    );
  }
}

export default Collector;