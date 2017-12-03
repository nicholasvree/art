import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'


class HuntScore extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>HUNT SCORE</div>
        <div>CORRECT: {this.props.score}</div>
        <div>OUT OF: {this.props.outOf}</div>
        <Button onClick={this.props.backToChooseHunt}>OK</Button>

      </div>
      
    );
  }
}

export default HuntScore;