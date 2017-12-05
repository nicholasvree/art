import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'
import ImgCarousel from "../../components/ImgCarousel/ImgCarousel"
import QBox from '../../components/QBox/QBox'
import ResponseBox from "../../components/ResponseBox/ResponseBox"
import './Reflect.css'



class Reflect extends React.Component {
  state={
  }

  componentDidMount(){

  }



  render() {

    let spacer= {
      marginTop:20,
      padding:20
    }

    
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-11">
                        <QBox activeComp={this.props.activeComp} hunt={this.props.hunt} currentClue={this.props.currentClue} gameOver={this.props.gameOver} qDisplay={this.props.qDisplay}  qButton={this.props.qButton} handleQBoxButton={this.props.handleQBoxButton}/>                        
          </div>
        </div>
        <div className="row">
          <div className="col-md-11">
                        <ImgCarousel index={this.state.index} direction={this.state.direction} handleSelectParent={this.props.handleSelectParent}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-11">
                        <ResponseBox className={spacer} selectedIndex={this.props.selectedIndex}
                        selectedIndex0={this.props.selectedIndex0}
                        handleInputChange={this.props.handleInputChange}/>
          </div>
        </div>
                        <Button onClick={this.props.backToChooseHunt} value="reflect">Back to Choose</Button>
      </div>
    );
  }
}

export default Reflect;