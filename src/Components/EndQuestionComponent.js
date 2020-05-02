import React from 'react';
import '../App.scss';
import {Container, Row, Button} from 'react-bootstrap';
import Lottie from 'react-lottie';
import correctData from '../assets/correct-lottie.json'
import wrongData from '../assets/wrong-lottie.json'

class EndQuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCorrect: this.props.isCorrect
        }
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: this.props.isCorrect ? correctData : wrongData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };
        return(
            <Container className="endQuestionComponent">
                <Row className="justify-content-center endQuestionRow">
                <Lottie options={defaultOptions}
                            height={200}
                            width={200}/>
                </Row>
                {this.props.isCorrect ? <Row className="justify-content-center endQuestionRow">
                    You have earned {this.props.questionScore} points.
                </Row> : <Row className="justify-content-center endQuestionRow">
                    You have earned total {this.props.totalScore}.
                </Row>}
                <Row className="justify-content-center endQuestionRow">
                    <Button onClick={() => this.props.clickNextQuestion()}>{this.props.isCorrect ? "NEXT QUESTION" : "HOME PAGE"}</Button>
                </Row>
            </Container>
        );
    }
}

export default EndQuestionComponent;