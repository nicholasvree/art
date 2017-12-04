import React from 'react';
import CategoryOp from '../../components/CategoryOp/CategoryOp'
// import API from "./utils/API";
import { ButtonGroup, Button} from 'react-bootstrap'



class ChooseHunt extends React.Component {


    render() {

        console.log(this.props.huntList)

        var catOpElements = this.props.huntList.map(cat => {    
            return(<CategoryOp cat={cat} startCategory={this.props.startCategory} />)
             
        }) 

        //console.log(catOpElements)

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center">
                    <h1> Choose a Scavenger Hunt Category: </h1>

                        <ButtonGroup>{catOpElements}</ButtonGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-center">
                    <h1> Draw </h1>
                        <Button onClick={this.props.toGPMC} value="draw">Draw</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-center">
                    <h1> Reflect </h1>
                        <Button onClick={this.props.toReflect} value="101">Reflect</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-center">
                    <h1> Art Collector </h1>
                        <Button onClick={this.props.toGPMC} value="collection">See My Art</Button>
                        <Button onClick={this.props.toGPMC} value="collector">Get Art</Button>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-center">
                    <h1> Scores </h1>
                    <Button onClick={this.props.toGPMC} value="blogScores">Scores</Button>
                    

                    </div>
                </div>
            </div>


        );
    }
}

export default ChooseHunt;