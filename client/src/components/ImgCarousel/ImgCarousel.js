
import React from 'react';
import {Carousel} from 'react-bootstrap'
import './ImgCarousel.css'

class ImgCarousel extends React.Component {

  render() {
    return (
        <Carousel>
        <Carousel.Item>
          <img width={200} height={100} alt="600x300" src="https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/51.197.1.jpg" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={200} height={100} alt="600x300" src="https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/51.197.1.jpg" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={200} height={100} alt="600x300" src="https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/51.197.1.jpg" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    );
  }
}

export default ImgCarousel;
