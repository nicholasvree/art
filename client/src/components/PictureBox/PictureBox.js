import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'


class PictureBox extends React.Component {

 

  render() {

    let titleStyles = {
        whiteSpace: "nowrap",    
        overflow: "hidden",        
        text0verflow : "ellipsis"
    }

    let wellStyles={
        minHeight:280
    }

    let handleFlow
    if(this.props.qButton === "Start Game" ){
        handleFlow=""
    }else{
        handleFlow=this.props.processAnswer
    }

    let button2
    if(this.props.activeComp === "scavHunt"){
        button2=(<button className={"btn"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} bsSize="small" value={this.props.image.id+"|"+this.props.image.title+"|"+this.props.image.primary_image}  onClick={handleFlow} block>Select Answer</button>)
    }else if(this.props.activeComp === "collector"){
        button2=(<button className={"btn"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} bsSize="small" value={this.props.image.id+"|"+this.props.image.title+"|"+this.props.image.primary_image}  onClick={handleFlow} block>Save Art</button>)
    }
    
    return (
        <div key={this.props.image.id} >
        <div   className="col-md-3 text-center">
            <div className="panel panel-default text-center" style={{borderColor:"light grey", borderWidth:"thin"}}>
            <div className="card" style={{padding:10}}>
                <div className="img-container">
                    <img alt = {this.props.image.title} src = {"https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2_sq/" + this.props.image.primary_image}/>
                    {/* <p>{this.props.image.caption}</p> */}
                </div>
                <div className="content" style={titleStyles}>
                            {this.props.image.title}
                </div>
                
                <button className={"btn"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} bsSize="small"  value={this.props.image.id}  onClick={this.props.openModal} block>Read More</button>
                {button2}
               
            </div>
            </div>
        </div>
    </div>
    );
  }
}

export default PictureBox;