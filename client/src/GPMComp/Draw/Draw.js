import React from 'react';
import ReactPaint from 'react-paint';
import {Button, ButtonToolbar} from 'react-bootstrap'

 
class Draw extends React.Component {

    render(){
        const props = {
            style: {
            background: 'tomato',
            /* Arbitrary css styles */
            },
            brushCol: '#ffffff',
            lineWidth: 10,
            className: 'react-paint',
            height: 500,
            width: 500,
            onDraw: () => { console.log('i have drawn!'); },
            };

        return(
            <div>
                <ReactPaint {...props} />
                <Button onClick={this.props.backToChooseHunt}>Back to Choose</Button>
            </div>

        )
    }

}
 
export default Draw;



// import React from 'react';
// import {Button, ButtonToolbar} from 'react-bootstrap'


// class HuntScore extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <div>HUNT SCORE</div>
//         <div>CORRECT: {this.props.score}</div>
//         <div>OUT OF: {this.props.outOf}</div>
//         <Button onClick={this.props.backToChooseHunt}>OK</Button>

//       </div>
      
//     );
//   }
// }

// export default HuntScore;