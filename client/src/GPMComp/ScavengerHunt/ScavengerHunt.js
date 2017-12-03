import React from 'react';
import './ScavengerHunt.css'
import Modal from '../../components/Modal/Modal'
import API from '../../utils/API'
import QBox from '../../components/QBox/QBox'
import PictureBox from '../../components/PictureBox/PictureBox'
import {Button, ButtonToolbar} from 'react-bootstrap'


 
class ScavengerHunt extends React.Component {

    state = { 
                isOpen: false,
                selectedImageInfo: '',
                score:0
             };

/////////////////Modal////////////////
    openModal = event => {
        let imageId=event.target.value
        API.getImageInfo(imageId)
        .then(res => {this.setState({selectedImageInfo: res.data.data, isOpen: !this.state.isOpen})})
        .catch(err => console.log(err))
    };

    closeModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
////////////GENERAL///////////////////////
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
            <PictureBox image={image} openModal={this.openModal} closeModal={this.closeModal} processAnswer={this.props.processAnswer} />
        ) 
    }) 

    console.log("SCVNGHJSS", this.state)
        return (
        <div>        
            <div className="container">
                <div className="row">
                <div className="col-md-11">
                <QBox hunt={this.props.hunt} currentClue={this.props.currentClue} gameOver={this.props.gameOver} qDisplay={this.props.qDisplay}  qButton={this.props.qButton} handleQBoxButton={this.props.handleQBoxButton}/>
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