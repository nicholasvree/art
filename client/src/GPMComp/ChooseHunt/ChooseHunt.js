import React from 'react';
import CategoryOp from '../../components/CategoryOp/CategoryOp'
// import API from "./utils/API";
import { ButtonGroup, Button} from 'react-bootstrap'




class ChooseHunt extends React.Component {


    render() {


        let headingStyle ={
            fontSize: "30",
            color: "#EAA047"
        }
        
        var filteredForScav = this.props.huntList.filter(cat => cat.category.toString().length===1)
        
        var scavengerOptions = filteredForScav.map(cat => {    
            return(<CategoryOp cat={cat} startCategory={this.props.startCategory} />)
             
        }) 

        let backgroundImg ={
            // backgroundImage: "url(http://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size4/CUR.2003.16_Candida_Hofer_VG_Bild-Kunst_photo.jpg)",
            backgroundPosition: "center",
            minHeight:"100px"
        }

        //console.log(catOpElements)

        return (
           
            <div style={backgroundImg}>
            
            <div className="container">
                <div className="row">
                <div className="col-md-3 text-center"></div>

                    <div className="col-md-6 text-center">
                    
                    <h1 style={headingStyle}> Scavenger Hunt </h1>
                        {scavengerOptions}
                    </div>
                </div>
                {/* <div className="row">
                <div className="col-md-3 text-center"></div>

                    <div className="col-md-6 text-center">
                    <h1 style={headingStyle}> Draw </h1>
                        <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} onClick={this.props.toGPMC} value="draw">Draw</button>
                    </div>
                </div> */}
                <div className="row">
                <div className="col-md-3 text-center"></div>

                    <div className="col-md-6 text-center">
                    <h1 style={headingStyle}> Written Analysis and Reflection </h1>
                        <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} onClick={this.props.toReflect} value="101">Identity</button>
                        <button className={"btn btn-lg disabled"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} onClick={this.props.toReflect} value="101">Society and Culture</button>
                        <button className={"btn btn-lg disabled"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} onClick={this.props.toReflect} value="101">Charaters</button>

                    </div>
                </div>
                <div className="row">
                <div className="col-md-3 text-center"></div>

                    <div className="col-md-6 text-center">
                    <h1 style={headingStyle} > Art Collector </h1>
                        <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} onClick={this.props.toGPMC} value="collection">My Art Collection</button>
                        <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} onClick={this.props.toGPMC} value="collector">Search for Art</button>

                    </div>
                </div>
                <div className="row">
                <div className="col-md-3 text-center"></div>

                    <div className="col-md-6 text-center">
                    <h1 style={headingStyle}> Scores </h1>
                    <button className={"btn btn-lg"} style={{marginLeft:"10px", backgroundColor:"darkgrey"}} onClick={this.props.toBlogScores} value="blogScores">Scores</button>
                    

                    </div>
                </div>
            </div>
            </div>


        );
    }
}

export default ChooseHunt;