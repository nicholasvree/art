import React, { Component } from 'react';
import Affix from 'react-overlays/lib/Affix';
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

    console.log("QBOX HUNT", this.props.hunt)

    let qDisplay=this.getSafe( () => this.props.hunt[0].clue[this.props.currentClue].clue)

    console.log("QDISPLAY", qDisplay)


    return (
      <div className='affixed-question'>
        <Affix viewportOffsetTop={0} container={this} autoWidth={false}>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className="row">
                <div className="col-md-9">
                {qDisplay}
                 </div>
                 <div className="col-md-3">
                  <button> TEST BUTTON </button>
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