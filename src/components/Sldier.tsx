import * as React from "react";
import styled from "styled-components";
import interviewData from "../../content/interviewQuestion.json";

const SlideContainer = styled.div`
  width: 100%;
  height: 50vh;
  position: relative;
  margin: auto;
  border: 1px solid black;
`;

const SlideButton = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: black;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;

  &.next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  /* 호버 추가 */
`;

const Slide = styled.p`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  font-size: 2rem;
  text-align: center;
  display: none;

  &.active {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Slider = () => {
  const questionRefs = React.useRef<any>([]);
  const [interviewQuestions, setInterViewQuestions] =
    React.useState(interviewData);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onNext = () => {
    if (currentIndex + 1 === interviewQuestions.length) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const onPrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(interviewQuestions.length - 1);
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    const keyName = e.key;
    switch (keyName) {
      case "ArrowRight": {
        onNext();
        return;
      }
      case "ArrowLeft": {
        onPrev();
        return;
      }
    }
  };

  React.useEffect(() => {
    const questionDOMs = questionRefs.current;

    for (let i = 0; i < interviewQuestions.length; i++) {
      if (i !== currentIndex) {
        questionDOMs[i].classList.remove("active");
      } else {
        questionDOMs[i].classList.add("active");
      }
    }

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  });

  return (
    <SlideContainer>
      {interviewQuestions.map((interviewQuestion, index) => (
        <Slide
          ref={(element) => (questionRefs.current[index] = element)}
          key={index}
        >
          {interviewQuestion}
        </Slide>
      ))}

      <SlideButton className="prev" onClick={onPrev}>
        &#10094;
      </SlideButton>
      <SlideButton className="next" onClick={onNext}>
        &#10095;
      </SlideButton>
    </SlideContainer>
  );
};
