import React from 'react';
import '../App.scss';
import {Container} from 'react-bootstrap';
import HeaderComponent from '../Components/HeaderComponent';
import QuestionComponent from '../Components/QuestionComponent';
import EndQuestionComponent from '../Components/EndQuestionComponent';
import Lottie from 'react-lottie';
import animationData from '../assets/loader-lottie.json';
import Swal from 'sweetalert2';
import questionsJson from '../assets/questions.json';

class GameScreenContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            questions : [],
            score: 0,
            remainingTime: 15,
            questionNumber: 0,
            quizDifficulty: sessionStorage.getItem("quizDifficulty"),
            hasJoker: true,
            showQuestion: true,
            isCorrect: true,
            loaded: false
        }
        this.clickedAnswer = this.clickedAnswer.bind(this);
        this.useJoker = this.useJoker.bind(this);
        this.clickNextQuestion = this.clickNextQuestion.bind(this);
        this.headerComponent = React.createRef();
        sessionStorage.setItem("userScore", 0);
    }

    //fetch questions from opentdb, if success headers countdown starts, and delete difficulty level from session storage because when go back to main screen, user still can select mixed level
    componentDidMount () {
        fetch("https://opentdb.com/api.php?amount=10" + (this.state.quizDifficulty != "null" && this.state.quizDifficulty != null ? "&difficulty=" + this.state.quizDifficulty: "")).then(res => res.json()).then( (result) => {
            this.setState({questions: result.results, loaded: true});
            this.headerComponent.current.startCountdown();
            sessionStorage.setItem("quizDifficulty", null);
        },(error) => {
            Swal.fire({
                title: 'API Error',
                text: 'opentdb API is not working now!, Game will be continue with static questions.',
                icon: 'warning',
              }).then((result) => {
                this.setState({questions: questionsJson.questions, loaded: true});
                this.headerComponent.current.startCountdown();
                sessionStorage.setItem("quizDifficulty", null);
            })
          }
        );
    }

    // update score respect to time, and check answer is true
    clickedAnswer(result) {
        if(result == "correct") {
            sessionStorage.setItem("userScore", this.state.score + (10 * this.headerComponent.current.state.remainingTime));
            this.setState({score: this.state.score + (10 * this.headerComponent.current.state.remainingTime), remainingTime: 15, isCorrect: true, showQuestion: false});
            this.headerComponent.current.resetCountdown();
            this.headerComponent.current.stopCountdown();
        } else {
            this.setState({isCorrect: false, showQuestion: false});
            this.headerComponent.current.stopCountdown();

        }
    }

    // when use joker, questions json is updated, 2 of incorrect answer is deleted
    useJoker(){
        var newData = this.state.questions;
        newData[this.state.questionNumber].incorrect_answers.splice(0, 2);
        this.setState({
            hasJoker: false,
            questions: newData
        })
    }

    clickNextQuestion() {
        if(this.state.isCorrect) {
            this.setState({
                showQuestion: true,
                questionNumber: this.state.questionNumber+1
            })
            this.headerComponent.current.startCountdown();
        } else {
            this.props.history.push("/");
        }
        
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };
        return(
            <Container className="mainContainer">
                <HeaderComponent ref={this.headerComponent} history={this.props.history} questionNumber={this.state.questionNumber} score={this.state.score} remainingTime={this.state.remainingTime}/>
                {this.state.loaded ? this.state.showQuestion ? <QuestionComponent useJoker={this.useJoker} hasJoker={this.state.hasJoker} clickedAnswer = {this.clickedAnswer} question={this.state.questions[this.state.questionNumber]}/> :
                    <EndQuestionComponent totalScore={this.state.score} questionScore={(10 * this.headerComponent.current.state.remainingTime)} clickNextQuestion={this.clickNextQuestion} isCorrect={this.state.isCorrect}/> : 
                    <Lottie options={defaultOptions}
                                height={240}
                                width={240}/>
                }
            </Container>
        );
    }
}

export default GameScreenContainer;