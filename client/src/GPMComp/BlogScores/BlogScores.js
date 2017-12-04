import React from 'react';
import {Button, ButtonToolbar, Well} from 'react-bootstrap'
import API from "../../utils/API";

class BlogScores extends React.Component {

    state={
        userScores:[]

    }

    componentDidMount(){
        API.getScores()
        .then(res => {
          console.log(res.data.score)
          this.setState({userScores: res.data.score})
        })
      }

    
 



    

  render() {
    let imgStyles={
        maxWidth:250,
        maxHeight:250
    }
    let scoreSet = this.state.userScores.reverse().map(score =>{
        if(score.type === "reflect"){
            return(
                <div className="row" key={score._id}>
                    <div className="col-md-12">
                        <h3>{"Reflection "+score.date}</h3>
                        <img  style={imgStyles} alt="900x500" src="https://d1lfxha3ugu3d4.cloudfront.net/images/opencollection/objects/size2/2008.51_PS6.jpg" />
                        <p><b>Question</b></p>
                        <p>{score.question}</p>
                        <p><b>Answer</b></p>
                        <p>{score.response}</p>
                    </div>
                </div>
            )
        }
        else if(score.type === "hunt"){
            return(
                <div className="row" key={score._id}>
                    <div className="col-md-12">
                        <h3>{"Scavenger Hunt "+score.date}</h3>
                        <p><b>Total Correct</b></p>
                        <p>{score.total_correct}</p>
                        <p><b>Answer</b></p>
                        <p>{score.total_questions}</p>
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