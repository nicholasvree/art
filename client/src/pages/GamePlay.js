import React from 'react';
import API from "../utils/API";
import ScavengerHunt from "../components/ScavengerHunt/ScavengerHunt"
import { Redirect } from "react-router-dom";



class GamePlay extends React.Component {

    state = {
        activeGame:false,
        selectedCollection: "8",
        collectedImages: [],
        hunt: {},
        numClues:0,
        currentClue:0,
        score:0,
        gameOver: false
        };

    componentDidMount(){
        API.getCollectionImages(this.state.selectedCollection)
    .then(res => {
        this.setState({collectedImages : res.data.data})
    })
    .catch(err =>console.log(err))

    API.getHunt(this.state.selectedCollection)
    .then(res=> {
        this.setState({hunt: res.data})
        this.setState({numClues: this.state.hunt[0].clue.length})
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

        if(this.state.currentClue <= this.state.numClues){

            console.log(this.state.hunt)
    
            let imageId=event.target.value
            let correctAnswer = this.getSafe( () => this.state.hunt[0].clue[this.state.currentClue].answer)
    
            console.log("imageid:", imageId, "correctAnswer:", correctAnswer)
    
            if(imageId === correctAnswer){
                console.log("true")
                this.setState({score: this.state.score+1})
            }
            
            this.setState({currentClue: this.state.currentClue+1})

            console.log(this.state.score)
        }
        else{

            let scoreData = {
                total_correct: this.state.score,
                total_questions: this.state.numClues,
                hunt: this.state.hunt[0]._id
            }

            API.saveScore(scoreData)

        }
    }


      

    render() {

        console.log(this.state.hunt)
        console.log(this.state.numClues)

        if (!this.props.userEmail) {
            return <Redirect to='/login' />;
          } 
        
        
        return (
            <div>
                    <div className="container">
                        <ScavengerHunt 
                        selectedCollection = {this.state.selectedCollection} 
                        collectedImages = {this.state.collectedImages} 
                        hunt = {this.state.hunt}
                        currentClue = {this.state.currentClue}
                        processAnswer = {this.processAnswer}
                        score = {this.state.score}
                        numClues = {this.state.numClues}
                        gameOver = {this.state.gameOver} />
                    </div>
                </div>
        );
     }
}

export default GamePlay;