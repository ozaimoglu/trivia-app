import React from 'react';
import '../App.scss';
import {Container, Row, Button} from 'react-bootstrap';

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasJoker: this.props.hasJoker
        }
        this.useJoker = this.useJoker.bind(this);
    }

    //decode the question strings
    decodeText(text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    // shuffle answers button
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    generateAnswerButtons() {
        let answers = [];
        answers.push(
            <Row key={0} className="justify-content-center answerButton">
                <Button className="shadow-none deneme" onClick={() => this.props.clickedAnswer("correct")}>{this.decodeText(this.props.question.correct_answer)}</Button>
            </Row>);
        for(var i = 0; i < this.props.question.incorrect_answers.length; i++){
            answers.push(
                <Row id={i+1} key={i+1} className="justify-content-center answerButton">
                    <Button className="deneme" onClick={() => this.props.clickedAnswer("wrong")}>{this.decodeText(this.props.question.incorrect_answers[i])}</Button>
                </Row>);
            
        }
        return this.shuffle(answers);
    }

    useJoker() {
        this.props.useJoker();
    }

    render() {
        return(
            <Container className="questionComponent">
                <Row className="justify-content-center">
                    {this.props.question ? this.decodeText(this.props.question.question) : null}
                </Row>
                {this.props.question ? this.generateAnswerButtons() : null}
                {this.props.hasJoker && this.props.question != null && this.props.question.incorrect_answers.length > 2 ? <Button variant="danger" onClick={this.useJoker} className="jokerButton">USE 50% JOKER</Button> 
                : null}
                
            </Container>
        );
    }
}

export default QuestionComponent;