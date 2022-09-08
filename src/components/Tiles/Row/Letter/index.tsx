import constants from "@/constants";
import { LetterType } from "@/interfaces";
import React from "react";
import styled from "styled-components";

interface Props {
  letter: string;
  type: LetterType;
}

const colorHandler = (type: LetterType) => {
  if (type === "typing") return "#000000";
  return "white";
};

const backgroundColorHandler = (status: LetterType) => {
  if (status === "correct") return "#6aaa64";
  if (status === "wrong-spot") return "#c9b458";
  if (status === "not-include") return "#787c7e";
  return "transparent";
};

const L = styled.div<{ type: LetterType; letter: string }>`
  border: 2px solid
    ${(props) => (props.letter.length > 0 ? "#878a8c" : "#d3d6da")};
  width: ${constants.LETTER_WIDTH};
  line-height: 2rem;
  user-select: none;
  height: ${constants.LETTER_HEIGHT};
  color: ${(props) => colorHandler(props.type)};
  background-color: ${(props) => backgroundColorHandler(props.type)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  user-select: none;
`;
const Letter: React.FC<Props> = ({ letter, type }) => {
  return (
    <L type={type} letter={letter}>
      {letter}
    </L>
  );
};

export default Letter;
