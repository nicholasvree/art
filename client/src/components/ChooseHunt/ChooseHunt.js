import React from 'react';
import CategoryOp from '../CategoryOp/CategoryOp'
// import API from "./utils/API";
import { ButtonGroup} from 'react-bootstrap'



class ChooseHunt extends React.Component {


    render() {

        console.log(this.props.huntList)

        var catOpElements = this.props.huntList.map(cat => {    
            return(<CategoryOp cat={cat} startCategory={this.props.startCategory} />)
             
        }) 

        //console.log(catOpElements)

        return (

            <div className="container">
                <h1> Choose a Scavenger Hunt Category: </h1>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <ButtonGroup>{catOpElements}</ButtonGroup>
                    </div>
                </div>
            </div>


        );
    }
}

export default ChooseHunt;