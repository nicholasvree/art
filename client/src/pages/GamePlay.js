import React from 'react';
import API from "../utils/API";
import ScavengerHunt from "../GPMComp/ScavengerHunt/ScavengerHunt"
import ChooseHunt from "../GPMComp/ChooseHunt/ChooseHunt"
import HuntScore from "../GPMComp/HuntScore/HuntScore"
import Draw from "../GPMComp/Draw/Draw"
import Reflect from "../GPMComp/Reflect/Reflect"
import Collector from "../GPMComp/Collector/Collector"
import Collection from "../GPMComp/Collection/Collection"
import BlogScores from "../GPMComp/BlogScores/BlogScores"
import NavBar from "../components/NavBar/NavBar"
import { Link } from "react-router-dom";




import { Redirect } from "react-router-dom";



class GamePlay extends React.Component {

    state = {
        activeComp: "choose",
        selectedCollection: "",
        collectedImages: [],
        huntList: [],
        hunt: {},

        ////////////////QBox//////////////////////
        currentClue:0,
        gameOver: false,
        qDisplay: "",
        qButton: "", 

        ///////////////Scavenger Hunt/////////////
        score:0,

        ///////////////Collector//////////////////
        searchBoxValue: "",

        ////////////////Reflect//////////////////
        selectedIndex: 0,
        selectedIndex0:"",

        ///////////////Scores///////////////////
        userScores:[]

        };




    componentDidMount(){

        API.getHuntList()
        .then(res=>{
             this.setState({huntList: res.data})
             console.log("STATE>HUNTLIST", this.state.huntList)
        }).catch(err=>console.log(err))
    
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
    
    //Handles the flow of the the QBOX Buttons
    handleQBoxButton = event => {
        if(event.target.value === "Start Game" || event.target.value === "Continue" || event.target.value === "Skip"||event.target.value === "Next"){
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
            this.setState({activeComp:"blogScores", currentClue: 0})            
            this.gameOver()
        }
        else if (event.target.value === "I'm Done"){
             this.setState({activeComp:"blogScores", currentClue: 0})
            this.reflectDone()
        }
        else {
            console.log("BUTTON LOGIC ERROR")
        }
    }

    reflectDone(){
        let imageSrcArray=["https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/2008.6a-j_PS4.jpg", "https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/2008.51_PS6.jpg", "https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/CUR.2014.65_Alexander_Gray_Associates_photograph.jpg"]
        let reflectionResponse = {
            type:"reflect",
            question: this.state.qDisplay,
            response: this.state.selectedIndex0,
            hunt: this.state.hunt[0]._id,
            src: imageSrcArray[this.state.selectedIndex]
        }
        console.log("REF", reflectionResponse)
        API.saveScore(reflectionResponse)
        .then( () => { API.getScores()
        .then(res => {
          console.log(res.data.score)
          this.setState({userScores: res.data.score})
        })})
    }

    gameOver(){
        console.log("GAME OVER")
        let scoreData = {
            type:"hunt",
            total_correct: this.state.score,
            total_questions: this.state.hunt[0].clue.length-1,
            hunt: this.state.hunt[0]._id
        }
        API.saveScore(scoreData)
        .then( () => { API.getScores()
        .then(res => {
          console.log(res.data.score)
          this.setState({userScores: res.data.score})
        })})
    }

    startCategory = (event) => {
        this.setState({selectedCollection: event.target.value}, () => {
            API.getHunt(this.state.selectedCollection)
            .then(res=> {
                this.setState({hunt: res.data}, () => {
                    API.getCollectionImages(this.state.selectedCollection)
                    .then(res => {
                        this.setState({collectedImages : res.data.data})
                        this.setState({qDisplay: this.state.hunt[0].clue[0].clue, qButton: this.state.hunt[0].clue[0].button1})
                        this.setState({activeComp:"scavHunt"})
                    })
                    .catch(err =>console.log(err))
                })
            })
            .catch(err =>console.log(err))  
        })
    }

    backToChooseHunt = () => {
        this.setState({activeComp:"choose"})
    }

    toGPMC = (event) => {
        this.setState({activeComp:event.target.value})
    }

    toReflect = (event) => {            
        API.getHunt(event.target.value)
        .then(res=> {
            this.setState({hunt: res.data}, () => {
                this.setState({qDisplay: this.state.hunt[0].clue[0].clue, qButton: this.state.hunt[0].clue[0].button1})
                this.setState({activeComp:"reflect"})
            })
        })
        .catch(err =>console.log(err))          
    }
    
    handleSelectParent(index) {
        this.setState({selectedIndex:index}, ()=>console.log("GP SELECTEDINDEX", this.state.selectedIndex));  
      }

    toBlogScores = (event) =>{
        API.getScores()
        .then(res => {
          console.log(res.data.score)
          this.setState({userScores: res.data.score, activeComp:"blogScores"})
        })

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
                            toGPMC={this.toGPMC}
                            toReflect={this.toReflect}
                            toBlogScores={this.toBlogScores}/>  
        }
        else if(this.state.activeComp === "scavHunt"){
            activeCompElement = <ScavengerHunt
                        activeComp={this.state.activeComp}
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
            activeComp={this.state.activeComp}
            backToChooseHunt={this.backToChooseHunt}
            handleSelectParent={this.handleSelectParent.bind(this)}
            handleInputChange={this.handleInputChange}
            selectedIndex={this.state.selectedIndex}
            selectedIndex0={this.state.selectedIndex0}
            hunt = {this.state.hunt}
            currentClue = {this.state.currentClue}
            qDisplay={this.state.qDisplay}
            qButton={this.state.qButton}
            handleQBoxButton = {this.handleQBoxButton}
            reflectDone = {this.reflectDone}/>
        }
        else if(this.state.activeComp==="collector"){
            activeCompElement=<Collector
            activeComp={this.state.activeComp}
            handleInputChange={this.handleInputChange}
            searchBoxValue={this.state.searchBoxValue}
            backToChooseHunt={this.backToChooseHunt}/>
        }
        else if(this.state.activeComp==="collection"){
            activeCompElement=<Collection
            activeComp={this.state.activeComp}            
            backToChooseHunt={this.backToChooseHunt}/>
        }else if(this.state.activeComp==="blogScores"){
            activeCompElement=<BlogScores
            backToChooseHunt={this.backToChooseHunt}
            userScores={this.state.userScores}
            />
        }
            

        console.log("ACTIVE", activeCompElement, "STATE", this.state.activeComp)


        
        return (
            <div>  
                
                         {activeCompElement} 
                    
                </div>
        );
     }
}

export default GamePlay;