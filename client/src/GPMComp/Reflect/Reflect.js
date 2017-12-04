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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-11">
                        <QBox hunt={this.props.hunt} currentClue={this.props.currentClue} gameOver={this.props.gameOver} qDisplay={this.props.qDisplay}  qButton={this.props.qButton} handleQBoxButton={this.props.handleQBoxButton}/>
                        <h1> Reflect </h1>
                        
                        <ImgCarousel index={this.state.index} direction={this.state.direction} handleSelectParent={this.props.handleSelectParent}/>
                        
                        <ResponseBox selectedIndex={this.props.selectedIndex}
                        selectedIndex0={this.props.selectedIndex0}
                        selectedIndex1={this.props.selectedIndex1}
                        selectedIndex2={this.props.selectedIndex2} 
                        handleInputChange={this.props.handleInputChange}/>
                        <Button onClick={this.props.backToChooseHunt} value="reflect">Back to Choose</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Reflect;