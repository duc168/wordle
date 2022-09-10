import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import Letter from '@/components/common/Letter';
import { useWordleContext } from '@/contexts/wordleContext';
import { ITileProps } from '@/interfaces';

import CloseSvg from './CloseSvg';

const Container = styled(motion.div)`
  display: block;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #f6f7f8;
  color: #000000;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
  position: relative;
`;

const CloseButton = styled(motion.a)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const H1 = styled.h1`
  text-align: center;
  text-transform: uppercase;
`;

const Examples = styled.div`
  border-bottom: 1px solid #d3d6da;
  border-top: 1px solid #d3d6da;
`;

const Example = styled.div`
  margin-top: 34px;
  margin-bottom: 34px;
`;

const WordContainer = styled.div`
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  column-gap: 4px;
  align-items: center;
`;

const HowToPlay: React.FC<{
  tileProps: ITileProps;
  defaultValue: boolean | undefined;
}> = ({ tileProps, defaultValue }) => {
  const { howToPlayPopupStatus, updateHowToPlayPopupStatus } = useWordleContext();

  const closeHandler = () => {
    updateHowToPlayPopupStatus(false);
  };

  useEffect(() => {
    updateHowToPlayPopupStatus(defaultValue);
  }, []);

  return (
    <Popup open={howToPlayPopupStatus} onClose={closeHandler} position="top center">
      <Container
        initial={{
          opacity: 0,
          y: 200,
        }}
        animate={{
          opacity: 1,
          y: -50,
        }}
        exit={{
          y: 200,
        }}
        transition={{
          duration: 1,
        }}
      >
        <CloseButton
          onClick={(e) => {
            e.preventDefault();

            e.stopPropagation();

            closeHandler();
          }}
        >
          <CloseSvg />
        </CloseButton>
        <H1>How To Play</H1>
        <p>
          Guess the <strong>WORDLE</strong> in six tries.
        </p>
        <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
        <p>
          After each guess, the color of the tiles will change to show how close your guess was to
          the word.
        </p>
        <Examples>
          <p>
            <strong>Examples</strong>
          </p>
          <Example>
            <WordContainer>
              <Letter letter="W" type="correct" submitted={true} {...tileProps} />
              <Letter letter="E" type="typing" {...tileProps} />
              <Letter letter="A" type="typing" {...tileProps} />
              <Letter letter="R" type="typing" {...tileProps} />
              <Letter letter="Y" type="typing" {...tileProps} />
            </WordContainer>
            <p>
              The letter <strong>W</strong> is in the word and in the correct spot.
            </p>
          </Example>

          <Example>
            <WordContainer>
              <Letter letter="P" type="typing" {...tileProps} />
              <Letter letter="I" type="wrong-spot" submitted={true} {...tileProps} />
              <Letter letter="L" type="typing" {...tileProps} />
              <Letter letter="L" type="typing" {...tileProps} />
              <Letter letter="S" type="typing" {...tileProps} />
            </WordContainer>
            <p>
              The letter <strong>I</strong> is in the word but in the wrong spot.
            </p>
          </Example>

          <Example>
            <WordContainer>
              <Letter letter="V" type="typing" {...tileProps} />
              <Letter letter="A" type="typing" {...tileProps} />
              <Letter letter="G" type="typing" {...tileProps} />
              <Letter letter="U" type="not-include" submitted={true} {...tileProps} />
              <Letter letter="E" type="typing" {...tileProps} />
            </WordContainer>
            <p>
              The letter <strong>U</strong> is not in the word in any spot.
            </p>
          </Example>
        </Examples>
        <p>
          <strong>A new WORDLE will be available each 10min!</strong>
        </p>
      </Container>
    </Popup>
  );
};

export default HowToPlay;
