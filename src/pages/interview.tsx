import { Link } from "gatsby";
import * as React from "react";
import { Container } from "../components/Container";
import { Slider } from "../components/Sldier";
import { Title } from "../components/Title";

const InterViewPage = () => {
  return (
    <Container>
      <Title style={{ marginBottom: "4rem" }}>인터뷰 연습</Title>
      <Link to="/">채용공고 보러가기</Link>
      <Slider />
    </Container>
  );
};

export default InterViewPage;
