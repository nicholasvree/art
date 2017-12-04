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
      maxWidth:1000
    }
  
    let affixedStyles={
      minWidth:800
    }
    return (
      <div className='affixed-question' style={topStyles}>
        <Affix offsetTop={65} affixStyle={{minWidth:1000, marginTop:10}} viewportOffsetTop={0} container={this} autoWidth={false}>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className="row">
                <div className="col-md-9">
                {this.props.qDisplay}
                 </div>
                 <div className="col-md-3">
                  <Button value={this.props.qButton} onClick={this.props.handleQBoxButton}> {this.props.qButton}  </Button>
                </div>
            </div>
            </div>
          </div>
        </Affix>
      </div>
    );
  }
}

export default QBox;