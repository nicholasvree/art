
import React from 'react';
import ReactDOM from'react-dom'
import {Carousel} from 'react-bootstrap'
import Reflect from '../../GPMComp/Reflect/Reflect'
import './ImgCarousel.css'

class ImgCarousel extends React.Component {

    state={
      index: 0,
      direction: null,
    }


    handleSelect(selectedIndex, e) {
      this.props.handleSelectParent(selectedIndex)
      this.setState({
        index: selectedIndex,
        direction: e.direction
      });
    }
    
  render() {

    let imgStyles={
      height:300,
      maxWidth:"100%",
      maxHeight:"200"
    }

    let carouselStyle={
      maxWidth:"100%"
    }

    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
        <Carousel.Item>
          <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4'>
              <img style={imgStyles}  alt="900x500" src="https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/2008.6a-j_PS4.jpg" />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <img  style={imgStyles} alt="900x500" src="https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/2008.51_PS6.jpg" />
          </div>
        </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
          <img style={imgStyles} alt="900x500" src="https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/CUR.2014.65_Alexander_Gray_Associates_photograph.jpg" />
          </div>
        </div>
        </Carousel.Item>
      </Carousel>
    );
  }
};

export default ImgCarousel;