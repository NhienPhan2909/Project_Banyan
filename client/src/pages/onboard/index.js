import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Onboard() {
  return (
    <div className="onboarding">
      <Container>
        <Row>
          <Col> 
            <h1 className="text-center">Welcome to Your App</h1>
          </Col>
        </Row>
        <Row>
          <Row>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/slides/banyan_slide1.png"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Still need?
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://picsum.photos/800/400?text=Slide%202"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed non risus. Suspendisse lectus tortor, dignissim sit
                    amet, adipiscing nec, ultricies sed, dolor. Cras elementum
                    ultrices diam. Maecenas ligula massa, varius a, semper
                    congue, euismod non, mi.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://picsum.photos/800/400?text=Slide%203"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed non risus. Suspendisse lectus tortor, dignissim sit
                    amet, adipiscing nec, ultricies sed, dolor. Cras elementum
                    ultrices diam. Maecenas ligula massa, varius a, semper
                    congue, euismod non, mi.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row>
            <div className="features">
              <h2>Features</h2>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor incididunt</li>
              </ul>
              <Button variant="primary" type="submit" block>
                Sign up
              </Button>
            </div>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default Onboard;
