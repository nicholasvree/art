import React from 'react';
import {Button, ButtonToolbar, Well} from 'react-bootstrap'
import API from "../../utils/API";

class BlogScores extends React.Component {

    state={

    }

    componentDidMount(){

      }

  render() {
    let imgStyles={
        maxWidth:250,
        maxHeight:250
    }

    

    let scoreSet = this.props.userScores.reverse().map(score =>{
        if(score.type === "reflect"){
            return(
                <div className="row" key={score._id}>
                    <div className="col-md-12">
                    <div className="panel panel-default text-center" style={{borderColor:"light grey", borderWidth:"thin"}}>

                        <h3>{"Reflection "}</h3>
                        <h4>{score.date}</h4>
                        <img  style={imgStyles} alt="900x500" src={score.src}/>
                        <p><b>Question</b></p>
                        <p>{score.question}</p>
                        <p><b>Answer</b></p>
                        <p>{score.response}</p>
                        </div>
                    </div>
                </div>
            )
        }
        else if(score.type === "hunt"){
            return(
                <div className="row" key={score._id}>
                    <div className="col-md-12">
                    <div className="panel panel-default text-center" style={{borderColor:"light grey", borderWidth:"thin"}}>

                        <h3>{"Scavenger Hunt "}</h3>
                        <h4>{score.date}</h4>
                        <p><b>Total Correct</b></p>
                        <p>{score.total_correct}</p>
                        <p><b>Answer</b></p>
                        <p>{score.total_questions}</p>
                    </div>
                    </div>
                </div>
            )
        }

    })

    console.log("REVERSE", scoreSet)
    
    
    return (
      <div className="container">
        <h1> User Results </h1>
          {scoreSet}
          <Button onClick={this.props.backToChooseHunt}>Back to Choose</Button>
          <Button onClick={this.retrieveScores}>Get Scores</Button>

          </div>
    );
  }
}

export default BlogScores;