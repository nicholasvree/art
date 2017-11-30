import React from 'react';
import API from "../utils/API";
import ScavengerHunt from "../components/ScavengerHunt/ScavengerHunt"


class GamePlay extends React.Component {

    state = {
        activeGame:false,
        selectedCollection: "8",
        collectedImages: [],
        hunt: {},
        currentClue:0,
        score:0
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


      

    render() {
        
        return (
            <div>
                    <div className="container">
                        <ScavengerHunt 
                        selectedCollection = {this.state.selectedCollection} 
                        collectedImages = {this.state.collectedImages} 
                        hunt = {this.state.hunt}
                        currentClue = {this.state.currentClue}
                        processAnswer = {this.processAnswer}
                        score = {this.state.score} />
                    </div>
                </div>
        );
     }
}

export default GamePlay;