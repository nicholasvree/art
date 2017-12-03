import React from 'react';
import API from "../utils/API";
import ScavengerHunt from "../GPMComp/ScavengerHunt/ScavengerHunt"
import ChooseHunt from "../GPMComp/ChooseHunt/ChooseHunt"
import HuntScore from "../GPMComp/HuntScore/HuntScore"
import Draw from "../GPMComp/Draw/Draw"
import Reflect from "../GPMComp/Reflect/Reflect"
import Collector from "../GPMComp/Collector/Collector"
import Collection from "../GPMComp/Collection/Collection"



import { Redirect } from "react-router-dom";



class GamePlay extends React.Component {

    state = {
        activeComp: "choose",
        selectedCollection: "8",
        collectedImages: [],
        huntList: [],
        hunt: {},

        currentClue:0,
        score:0,
        gameOver: false,

        qDisplay: "",
        qButton: "", 

        searchBoxValue: "dddd"
        };



    componentDidMount(){

        API.getHuntList()
        .then(res=>{
             this.setState({huntList: res.data})
             console.log("STATE>HUNTLIST", this.state.huntList)
        }).catch(err=>console.log(err))

    

        API.getCollectionImages(this.state.selectedCollection)
        .then(res => {
            this.setState({collectedImages : res.data.data})
        })
        .catch(err =>console.log(err))

     
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    getSafe(fn) {
        try {
            return fn();
        } catch (e) {
            return undefined;
        }
    }


    processAnswer = event => {

        let imageValue = event.target.value.split("|")

        if(imageValue[0] === this.state.hunt[0].clue[this.state.currentClue].answer){
            this.setState({
                score: this.state.score +1,
                qDisplay: this.getSafe( () => this.state.hunt[0].clue[this.state.currentClue].correct_message),
                qButton: this.getSafe( () => this.state.hunt[0].clue[this.state.currentClue].button2)
            })
        }
        else{
            this.setState({
                qDisplay: this.getSafe( () => this.state.hunt[0].clue[this.state.currentClue].wrong_message),
                qButton: this.getSafe( () => this.state.hunt[0].clue[this.state.currentClue].button2)                    
            })
        }
    }


    gameOver(){
        let scoreData = {
            total_correct: this.state.score,
            total_questions: this.state.hunt[0].clue.length-2,
            hunt: this.state.hunt[0]._id
        }
        API.saveScore(scoreData)
    }


    handleQBoxButton = event => {
        if(event.target.value === "Start Game" || event.target.value === "Continue" || event.target.value === "Skip"){
            this.setState(
                {currentClue: this.state.currentClue + 1}, () =>    {            
                    this.setState({
                        qDisplay: this.getSafe( () => this.state.hunt[0].clue[this.state.currentClue].clue), 
                        qButton:this.getSafe( () => this.state.hunt[0].clue[this.state.currentClue].button1)
                    })
                }
            )
        }
        else if (event.target.value === "Take Me There!"){
            this.setState({activeComp:"score", currentClue: 0})
            this.gameOver()
        }
        else {
            console.log("BUTTON LOGIC ERROR")
        }
    }

    startCategory = (event) => {
        this.setState({selectedCollection: event.target.value}, () => {

        })

        API.getHunt(this.state.selectedCollection)
        .then(res=> {
            this.setState({hunt: res.data}, () => {
                this.setState({qDisplay: this.state.hunt[0].clue[0].clue, qButton: this.state.hunt[0].clue[0].button1})
                this.setState({activeComp:"scavHunt"})
            })
            
        })
        .catch(err =>console.log(err))   

    }

    backToChooseHunt = () => {
        this.setState({activeComp:"choose"})
    }

    toGPMC = (event) => {
        this.setState({activeComp:event.target.value})
    }


    render() {


        if (!this.props.userEmail) {
            return <Redirect to='/login' />;
          } 

        let activeCompElement;
        
        if(this.state.activeComp === "choose"){
            activeCompElement = <ChooseHunt 
                            huntList={this.state.huntList} 
                            startCategory={this.startCategory}
                            toGPMC={this.toGPMC}/>  
        }
        else if(this.state.activeComp === "scavHunt"){
            activeCompElement = <ScavengerHunt 
                        selectedCollection = {this.state.selectedCollection} 
                        collectedImages = {this.state.collectedImages} 
                        hunt = {this.state.hunt}
                        currentClue = {this.state.currentClue}
                        processAnswer = {this.processAnswer}
                        score = {this.state.score}
                        gameOver = {this.state.gameOver} 
                        qDisplay={this.state.qDisplay}
                        qButton={this.state.qButton}
                        handleQBoxButton = {this.handleQBoxButton}
                        />
        }
        else if(this.state.activeComp === "score"){
            activeCompElement=<HuntScore
                                score={this.state.score}
                                outOf={this.state.hunt[0].clue.length-2}
                                backToChooseHunt={this.backToChooseHunt} />

        }
        else if(this.state.activeComp==="draw"){
            activeCompElement=<Draw
                                backToChooseHunt={this.backToChooseHunt}/>

        }
        else if(this.state.activeComp==="reflect"){
            activeCompElement=<Reflect
            backToChooseHunt={this.backToChooseHunt}/>
        }
        else if(this.state.activeComp==="collector"){
            activeCompElement=<Collector
            handleInputChange={this.handleInputChange}
            searchBoxValue={this.state.searchBoxValue}
            backToChooseHunt={this.backToChooseHunt}/>
        }
        else if(this.state.activeComp==="collection"){
            activeCompElement=<Collection
            backToChooseHunt={this.backToChooseHunt}/>
        }
            

        console.log("ACTIVE", activeCompElement, "STATE", this.state.activeComp)


        

        //     case "choose":
        //         return(<ChooseHunt huntList={this.state.huntList} startCategory={this.startCategory}/>)
        //         break
        //     case "hunt":
        //         return(<ScavengerHunt 
        //             selectedCollection = {this.state.selectedCollection} 
        //             collectedImages = {this.state.collectedImages} 
        //             hunt = {this.state.hunt}
        //             currentClue = {this.state.currentClue}
        //             processAnswer = {this.processAnswer}
        //             score = {this.state.score}
        //             gameOver = {this.state.gameOver} 
        //             qDisplay={this.state.qDisplay}
        //             qButton={this.state.qButton}
        //             handleQBoxButton = {this.handleQBoxButton}
        //             /> )
        //         break
        // }}
         
        return (
            <div>
                    <div className="container">
                         {activeCompElement} 
                    </div>
                </div>
        );
     }
}

export default GamePlay;