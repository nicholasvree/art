import React from 'react';
import './ScavengerHunt.css'
import Modal from 'react-responsive-modal';
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



    checkState(state) {
                console.log(state)
            }

/////////////////Modal////////////////
    onOpenModal = event => {
        let imageId=event.target.value
        API.getImageInfo(imageId)
        .then(res => {this.setState({selectedImageInfo: res.data.data, isOpen: true})})
        .catch(err => console.log(err))
    };

    onCloseModal = () => {
        this.setState({ isOpen: false });
        console.log("close clicked")
      };

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
            <PictureBox activeComp={this.props.activeComp} image={image} openModal={this.onOpenModal} processAnswer={this.props.processAnswer} />
        ) 
    }) 


    console.log("SCVNGHJSS", this.state)
        return (
        <div>        
            <div className="container">
                <div className="row">
                <div className="col-md-11">
                <QBox activeComp={this.props.activeComp} hunt={this.props.hunt} currentClue={this.props.currentClue} gameOver={this.props.gameOver} qDisplay={this.props.qDisplay}  qButton={this.props.qButton} handleQBoxButton={this.props.handleQBoxButton}/>
                </div>
                </div>

                <div className="row">
                    {elementImages}
                </div>
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
                </div> 
        );
    }
}

export default ScavengerHunt;