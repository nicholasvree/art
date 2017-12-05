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

 

    console.log
  
    let properVersion
    if(this.props.activeComp === "scavHunt")
    {
      return (<div className='affixed-question' style={{minHeight:"100px" ,maxWidth:1000, marginTop:10}}>
      <Affix offsetTop={65}  affixStyle={{minWidth:1000}} viewportOffsetTop={10} autoWidth={true}>
        <div className="panel panel-default text-center" style={{borderColor:"orange", borderWidth:"thin"}}>
          <div className='panel-body'>
            <div className="row">
              <div className="col-md-10" style={{maxWidth:800, minWidth:800}}>
              {this.props.qDisplay}
               </div>
              <div className="col-md-2">
                <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} value={this.props.qButton} onClick={this.props.handleQBoxButton}> {this.props.qButton}  </button>
              </div>
          </div>
        </div>
      </div>
      </Affix>
      </div>
      )
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