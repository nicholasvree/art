import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'


class PictureBox extends React.Component {

  render() {
    return (
        <div key={this.props.image.id}>
        <div   className="col-md-3 well text-center">
            <div className="card">
                <div className="img-container">
                    <img alt = {this.props.image.title} src = {"https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2_sq/" + this.props.image.primary_image}/>
                    <p>{this.props.image.caption}</p>
                </div>
                <div className="content">
                            {this.props.image.title}
                </div>
                <ButtonToolbar>
                    <Button bsSize="small"  value={this.props.image.id}  onClick={this.props.openModal} block>Read More</Button>
                    <Button bsSize="small" value={this.props.image.id}  onClick={this.props.processAnswer} block>Select Answer</Button>
                </ButtonToolbar>
            </div>
        </div>
    </div>
    );
  }
}

export default PictureBox;