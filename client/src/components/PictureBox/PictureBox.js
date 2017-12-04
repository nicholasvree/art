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
    if(this.props.qButton === "Start Game"){
        ""
    }else{
        this.props.processAnswer
    }

    
    return (
        <div key={this.props.image.id} >
        <div   className="col-md-3 well text-center" style={wellStyles}>
            <div className="card">
                <div className="img-container">
                    <img alt = {this.props.image.title} src = {"https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2_sq/" + this.props.image.primary_image}/>
                    {/* <p>{this.props.image.caption}</p> */}
                </div>
                <div className="content" style={titleStyles}>
                            {this.props.image.title}
                </div>
                HIIIII
                <ButtonToolbar>
                    <Button bsSize="small"  value={this.props.image.id}  onClick={this.props.openModal} block>Read More</Button>
                    <Button bsSize="small" value={this.props.image.id+"|"+this.props.image.title+"|"+this.props.image.primary_image}  onClick={handleFlow} block>Select Answer</Button>
                </ButtonToolbar>
            </div>
        </div>
    </div>
    );
  }
}

export default PictureBox;