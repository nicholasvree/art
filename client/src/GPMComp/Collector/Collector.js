import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'
import SearchBox from "../../components/SearchBox/SearchBox"
import API from "../../utils/API";
import PictureBox from "../../components/PictureBox/PictureBox"
import Modal from 'react-responsive-modal';



class Collector extends React.Component {

    state={
        isOpen:false,
        retrievedImages:[],
        selectedImageInfo:{}
    }

    handleSearch = (event) => {
        event.preventDefault()

        API.searchImages(this.props.searchBoxValue)
        .then(res => {
            this.setState({retrievedImages: res.data.data}, () => console.log(this.state.retrievedImages))})
        .catch(err => console.logErr)


  }

    onOpenModal = event => {
        console.log("clicked",event.target.value)
        let imageId=event.target.value
        API.getImageInfo(imageId)
        .then(res => {this.setState({selectedImageInfo: res.data.data, isOpen: true})})
        .catch(err => console.log(err))
    };

    onCloseModal = () => {
        this.setState({ isOpen: false });
        console.log("close clicked")
    };

    getSafe(fn) {
        try {
            return fn();
        } catch (e) {
            return undefined;
        }
    }

  handleImageSave = (event) => {

      event.preventDefault()
      console.log("clicked")
      let imageValue = event.target.value.split("|")
      
      API.saveImage({id: imageValue[0], title:imageValue[1], primary_image:imageValue[2]})
    }

  render() {
    let retrievedPictureBoxes=this.state.retrievedImages.map( image =>{   
            return(
                <PictureBox activeComp={this.props.activeComp} image={image} openModal={this.onOpenModal} closeModal={this.onCloseModal} processAnswer={this.handleImageSave} />
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
            <Modal open={this.state.isOpen} onClose={this.onCloseModal}>
                        <button onClick={this.props.onClose}>x</button>
                        <div className="container">
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img className="selected-image" alt={this.state.selectedImageInfo.title} src ={this.getSafe( () => "http://" + this.state.selectedImageInfo.images[0].largest_derivative_url)}></img>
                                {/* Needs to be parsed into HTML? */}
                                <p className="caption">{ this.getSafe( () =>  this.state.selectedImageInfo.images[0].caption) }</p>
                            </div>
                            <div className="col-md-4">
                                <h1> {this.getSafe ( () => this.state.selectedImageInfo.title)} </h1>
                                    <h3> {this.getSafe( () => this.state.selectedImageInfo.artists[0].name)} </h3> 
                                    <h5> {this.getSafe( () => this.state.selectedImageInfo.artists[0].dates)}</h5> 
                                        {/* Needs to be parsed into HTML */}
                                        <p>{this.getSafe( () => this.state.selectedImageInfo.labels[0].content) }  </p> 
                                        <p> <strong> MEDIUM </strong>   {this.getSafe ( () => this.state.selectedImageInfo.medium)} </p>
                                        <p> <strong> DATES </strong>   {this.getSafe ( () => this.state.selectedImageInfo.object_date ) } </p>
                                        <p> <strong> DIMENSIONS </strong>   { this.getSafe ( () => this.state.selectedImageInfo.dimensions)} </p>
                            </div>
                            </div>
                        </div>
                    </Modal>
            <Button onClick={this.props.backToChooseHunt} value="reflect">Back to Choose</Button>
        </div>
    );
  }
}

export default Collector;