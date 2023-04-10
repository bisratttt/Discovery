import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ArtistSongInfo() {
  return (
    <Container>
      <Row>
        <Col><h3 style={{ color: "rgb(155, 54, 13)" }}>
            📻 Discover new music every day
          </h3>

          <p>
            We believe that every song has the power to inspire and connect
            people. That's why we're committed to bringing you the best music
            every day. 🎧 Our team of expert music curators carefully selects
            each track to ensure that it's high-quality and worth listening to.
          </p>
</Col>
      </Row>
      <Row>
        <Col><h3 style={{ color: "rgb(155, 54, 13)" }}>
            🗣️ Exchange thoughts with other music lovers
          </h3>
          <p>
            We know that discovering new music is more fun when you can share it
            with others. That's why we've built a community of music lovers
            where you can share your thoughts on each song and connect with
            others who share your musical taste. 🤝
          </p></Col>
      </Row>
      <Row>
        <Col>1 of 1</Col>
      </Row>
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
  );
}

export default ArtistSongInfo;