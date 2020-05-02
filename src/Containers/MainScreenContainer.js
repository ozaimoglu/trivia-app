import React from 'react';
import '../App.scss';
import {Container, Col, Row, Button, Dropdown} from 'react-bootstrap';
import Lottie from 'react-lottie';
import animationData from '../assets/logo_lottie.json'

class MainScreenContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizDifficulty : null,
            quizCategoty: null
        }
    }

    gotoGameScreen = () => {
        this.props.history.push("/game");
    }

    setDifficulty(value) {
        sessionStorage.setItem("quizDifficulty", value);
        this.setState({quizDifficulty: value})
    }

    setCategory(value) {
        sessionStorage.setItem("quizCategoty", value);
        this.setState({quizCategoty: value})
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
                <Col className="centerColumn justify-content-center">
                    <Row className="imageRow justify-content-center">
                        <Lottie options={defaultOptions}
                            height={200}
                            width={200}/>
                    </Row>
                    <Row className="nameRow justify-content-center">
                        A TRIVIA GAME
                    </Row>
                    <Row className="dropdownButton justify-content-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.quizDifficulty ? this.state.quizDifficulty : "Difficulty" }
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.setDifficulty("easy")}>Easy</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setDifficulty("medium")}>Medium</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setDifficulty("hard")}>Hard</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    <Row className="startButtonRow justify-content-center">
                        <Button onClick={this.gotoGameScreen} variant="primary" className="startButton">
                            START GAME
                        </Button>
                    </Row>
                </Col>
            </Container>
        );
    }
}

export default MainScreenContainer;