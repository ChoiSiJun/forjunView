import { Row, Col } from 'react-bootstrap';
import { RootContainer, Footer } from '@common_components_ui';

function Main() {
  return (
    <RootContainer>
      <div className="wrapper" />
      <Row>
        <Col className="text-center">1 of 1</Col>
      </Row>
      <Footer>COPYRIGHT © MIRTECH ALL RIGHTS RESERVED.</Footer>
    </RootContainer>
  );
}

export default Main;
