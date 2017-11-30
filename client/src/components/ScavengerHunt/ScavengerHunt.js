import React from 'react';
import './ScavengerHunt.css'
import Modal from '../Modal/Modal'
import API from '../../utils/API'
import QBox from '../QBox/QBox'
import {Button, ButtonToolbar} from 'react-bootstrap'


 
class ScavengerHunt extends React.Component {

    state = { 
                isOpen: false,
                selectedImageInfo: "x",
                score:0
             };

    openModal = event => {

        let imageId=event.target.value


        API.getImageInfo(imageId)
        .then(res => {this.setState({selectedImageInfo: res.data.data, isOpen: !this.state.isOpen})})
        .catch(err => console.log(err))
      };



    
    
    closeModal = () => {
    this.setState({
        isOpen: !this.state.isOpen
    });
    }



    getSafe(fn) {
        try {
            return fn();
        } catch (e) {
            return undefined;
        }
    }




  render() {


    const collectedImages = this.props.collectedImages
    
    const elementImages = collectedImages.map(image => {

        
            
            return(
            <div key={image.id}>
                <div   className="col-md-3 well text-center">
                    <div className="card">
                        <div className="img-container">
                            <img alt = {image.title} src = {"https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2_sq/" + image.primary_image}/>
                            <p>{image.caption}</p>
                        </div>
                        <div className="content">
                                    {image.title}
                        </div>
                        <ButtonToolbar>
                            <Button bsSize="small"  value={image.id}  onClick={this.openModal} block>Read More</Button>
                            <Button bsSize="small" value={image.id}  onClick={this.props.processAnswer} block>Select Answer</Button>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
            ) 
    }) 


    return (
        <div>

            
            <div className="container">
                <div className="row">
                <div className="col-md-11">
                <QBox hunt={this.props.hunt} currentClue={this.props.currentClue}/>
                </div>
                </div>

                <div className="row">
                    {elementImages}
                </div>
            </div>
          
        
        

        <Modal show={this.state.isOpen}
                    onClose={this.closeModal}>
                    <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img className="selected-image" alt={this.state.selectedImageInfo.title} src ={this.getSafe( () => "http://" + this.state.selectedImageInfo.images[0].largest_derivative_url)}></img>
                            {/* Needs to be parsed into HTML? */}
                            <p className="caption">{ this.getSafe( () =>  this.state.selectedImageInfo.images[0].caption) }</p>
                        </div>
                        <div className="col-md-6">
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
            </div> 
    );
  }
}

export default ScavengerHunt;