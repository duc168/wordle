import constants from "@/constants";
import keyCodes from "@/constants/keycodes";
import { useWordleContext } from "@/contexts/wordleContext";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import BackspaceSvg from "./BackspaceSvg";
interface Props {
  letter: string;
}

const K = styled.button`
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: ${constants.KEY_HEIGHT};
  padding-left: ${constants.KEY_PADDING};
  padding-right: ${constants.KEY_PADDING};
  border-radius: 4px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #d3d6da;
  color: #000000;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
`;

const KEY_CODES = keyCodes;
const Key: React.FC<Props> = ({ letter }) => {
  const { addLetter, removeLetter } = useWordleContext();
  const keyInteractHandler = (inputLetter: string) => {
    console.log("Click " + inputLetter);
    if (inputLetter === "backspace") {
      console.log("Backspace");
      removeLetter();
      return;
    }
    if (inputLetter === "enter") {
      console.log("Enter");
      return;
    }
    addLetter(inputLetter);
  };
  useEffect(() => {
    const LETTER = letter as string;
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode == KEY_CODES[LETTER]) {
        keyInteractHandler(letter);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [letter]);
  if (letter === "backspace") {
    return (
      <K onClick={() => keyInteractHandler(letter)}>
        <BackspaceSvg />
      </K>
    );
  }
  return <K onClick={() => keyInteractHandler(letter)}>{letter}</K>;
};

export default Key;
