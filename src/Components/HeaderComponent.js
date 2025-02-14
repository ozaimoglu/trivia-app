import React from 'react';
import '../App.scss';
import {Container, Col, Row, Button} from 'react-bootstrap';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingTime: this.props.remainingTime
        }
    }

    // when last question was true, time is updated to 15
    resetCountdown() {
        this.setState({remainingTime: 15});
    }

    stopCountdown() {
        clearInterval(this.myInterval);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    // go to timesup screen
    timeExpired() {
        clearInterval(this.myInterval);
        this.props.history.push("/timesUp");
    }

    startCountdown() {
        this.myInterval = setInterval(() => {
            this.setState({remainingTime : this.state.remainingTime - 1})
            if(this.state.remainingTime <=0){
                this.timeExpired();
            }
        }, 1000);
    }

    render() {
        return(
            <Container className="headerComponent">
                <Row>
                    <Col>
                        Question {this.props.questionNumber + 1} / 10 
                    </Col>
                    <Col>
                        {this.props.score} Points
                    </Col>
                    <Col>
                        Time: {this.state.remainingTime} 
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HeaderComponent;