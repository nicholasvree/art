import React from 'react';
import API from "../utils/API";
import ScavengerHunt from "../components/ScavengerHunt/ScavengerHunt"
import ChooseHunt from "../components/ChooseHunt/ChooseHunt"
import { Redirect } from "react-router-dom";



class GamePlay extends React.Component {

    state = {
        activeComp:ChooseHunt,
        selectedCollection: "8",
        collectedImages: [],
        huntList: [],
        hunt: {},

        currentClue:0,
        score:0,
        gameOver: false,

        qDisplay: "",
        qButton: ""
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

    getSafe(fn) {
        try {
            return fn();
        } catch (e) {
            return undefined;
        }
    }


    processAnswer = event => {
        if(event.target.value === this.state.hunt[0].clue[this.state.currentClue].answer){
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
            this.setState({activeGame:false, currentClue: 0})
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
                this.setState({activeGame:true})
            })
            
        })
        .catch(err =>console.log(err))   

    }


      

    render() {


        if (!this.props.userEmail) {
            return <Redirect to='/login' />;
          } 
         
        return (
            <div>
                    <div className="container">
                        {this.state.activeGame ? <ScavengerHunt 
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
                        /> : <ChooseHunt huntList={this.state.huntList} startCategory={this.startCategory}/>}


                    </div>
                </div>
        );
     }
}

export default GamePlay;