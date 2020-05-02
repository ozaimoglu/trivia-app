import React from 'react';
import '../App.scss';
import {Container, Col, Button, Row} from 'react-bootstrap';
import Lottie from 'react-lottie';
import animationData from '../assets/timesup-lottie.json'

class TimesUpScreenContainer extends React.Component {
    gotoHomeScreen = () => {
        this.props.history.push("/");
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
                <Col>
                    <Row>
                        <Lottie options={defaultOptions}
                                height={400}
                                width={400}/>
                    </Row>
                    <Row className="justify-content-center">
                        <Button onClick={this.gotoHomeScreen} variant="primary">HOME SCREEN</Button>
                    </Row>
                </Col>
            </Container>
        );
    }
}

export default TimesUpScreenContainer;