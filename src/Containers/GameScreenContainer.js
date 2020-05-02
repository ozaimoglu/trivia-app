import React from 'react';
import '../App.scss';
import {Container, Col, Row, Button} from 'react-bootstrap';
import HeaderComponent from '../Components/HeaderComponent';
import QuestionComponent from '../Components/QuestionComponent';

class GameScreenContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            questions : [],
            score: 0,
            remainingTime: 15,
            questionNumber: 0,
            shouldUpdateQuestionComponent: false,
            quizDifficulty: sessionStorage.getItem("quizDifficulty"),
            hasJoker: true
        }
        this.clickedAnswer = this.clickedAnswer.bind(this);
        this.useJoker = this.useJoker.bind(this);
        this.headerComponent = React.createRef();
    }

    componentDidMount () {
        fetch("https://opentdb.com/api.php?amount=10" + (this.state.quizDifficulty != "null" ? "&difficulty=" + this.state.quizDifficulty: "")).then(res => res.json()).then( (result) => {
            this.setState({questions: result.results});
            this.headerComponent.current.startCountdown();
            sessionStorage.setItem("quizDifficulty", null);
        });
    }

    clickedAnswer(result) {
        console.log("SCOREEE S" + (this.state.score + (10 * this.headerComponent.current.state.remainingTime)));
        if(result == "correct") {
            this.setState({score: this.state.score + (10 * this.headerComponent.current.state.remainingTime), questionNumber: this.state.questionNumber + 1, remainingTime: 15});
            this.headerComponent.current.resetCountdown();
        } else {
            alert("Game Over, Your Score : " + (this.state.score));
            this.props.history.push("/");
        }
    }

    useJoker(){
        var newData = this.state.questions;
        newData[this.state.questionNumber].incorrect_answers.splice(0, 2);
        this.setState({
            hasJoker: false,
            questions: newData
        })
    }

    render() {
        return(
            <Container className="mainContainer">
                <HeaderComponent ref={this.headerComponent} history={this.props.history} questionNumber={this.state.questionNumber} score={this.state.score} remainingTime={this.state.remainingTime}/>
                <QuestionComponent useJoker={this.useJoker} hasJoker={this.state.hasJoker} clickedAnswer = {this.clickedAnswer} question={this.state.questions[this.state.questionNumber]}/>
            </Container>
        );
    }
}

export default GameScreenContainer;