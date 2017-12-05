import React, { Component } from 'react';
import Affix from 'react-overlays/lib/Affix';
import {Button, ButtonToolbar} from 'react-bootstrap'
import './QBox.css'


class QBox extends Component {

  getSafe(fn) {
    try {
        return fn();
    } catch (e) {
        return undefined;
    }
  }




  render() {

    // let qDisplay=this.getSafe( () => this.props.hunt[0].clue[this.props.currentClue].clue)
    let topStyles={
      marginTop:20,
      minWidth:"80%"
    }


    let testStyle={
      marginTop: "0.5em",
      marginBottom: "0.5em",
      display: "inline-block",
      border: "2px #09b5c4 solid",
      color: "#09b5c4",
      fontFamily: "Avenir Next",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontWeight: "700",
      outline: "none",
      backgroundColor: "transparent",
      padding: "0 27px",
      borderRadius: "100px",
      fontSize: "17.28px",
      lineHeight: "50px",
      transition: "backgroundColor cubic-bezier(0.23,1,0.32,1) 0.3s,color cubic-bezier(0.23,1,0.32,1) 0.3s",
      marginLeft:"10px"
      }

 

    console.log
  
    let properVersion
    if(this.props.activeComp === "scavHunt")
    {
      return (<div className='affixed-question'>
      <Affix offsetTop={65} topStyle={topStyles} affixStyle={{minWidth:1000}} viewportOffsetTop={0} container={this} autoWidth={false}>
        <div className="panel panel-default text-center" style={{borderColor:"orange", borderWidth:"thin"}}>
          <div className='panel-body'>
            <div className="row">
              <div className="col-md-10">
              {this.props.qDisplay}
               </div>
              <div className="col-md-2">
                <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} value={this.props.qButton} onClick={this.props.handleQBoxButton}> {this.props.qButton}  </button>
              </div>
          </div>
        </div>
      </div>
      </Affix>
      </div>)
    } else{
     return  ( <div className='affixed-question'>
       <div className="panel panel-default text-center" style={{borderColor:"orange", borderWidth:"thin"}}>
         <div className='panel-body'>
           <div className="row">
             <div className="col-md-10">
             {this.props.qDisplay}
              </div>
             <div className="col-md-2">
               <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} value={this.props.qButton} onClick={this.props.handleQBoxButton}> {this.props.qButton}  </button>
             </div>
         </div>
       </div>
     </div>
     </div>)
    }





  }
}

export default QBox;