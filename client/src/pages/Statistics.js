import React from 'react';



class Statistics extends React.Component {

    state = {
        show:false
    }


    toggleModal(){
        console.log(this.state.show)
        let oppVal = this.state.show
        this.setState({show :oppVal})
    }

    render() {

        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.toggleModal}>
                     Launch demo modal
                 </button>
            </div>
        )
    
    }
}

export default Statistics;




