import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import Letter from '@/components/common/Letter';
import { useWordleContext } from '@/contexts/wordleContext';
import { ITileProps } from '@/interfaces';
import colors from '@/services/colors';
import { deviceMin } from '@/services/css';

import CloseSvg from './CloseSvg';

const Container = styled(motion.div)`
  display: block;
  padding: 0.5rem 1rem;
  background-color: ${colors.HowToPlay.Container.backgroundColor};
  border-radius: 8px;
  border: 1px solid ${colors.HowToPlay.Container.borderColor};
  color: ${colors.HowToPlay.Container.color};
  box-shadow: 0 4px 23px 0 ${colors.HowToPlay.Container.boxShadowColor};
  position: relative;
  font-size: 12px;
  @media ${deviceMin.laptopL} {
    font-size: 16px;
  }
`;

const CloseButton = styled(motion.a)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background-color: ${colors.HowToPlay.CloseButton.backgroundColor};
  border: none;
  cursor: pointer;
  @media ${deviceMin.laptopL} {
    right: 1rem;
    top: 1rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-size: 2rem;
`;

const Examples = styled.div`
  border-bottom: 1px solid ${colors.HowToPlay.Example.borderColor};
  border-top: 1px solid ${colors.HowToPlay.Example.borderColor};
`;

const Example = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  @media ${deviceMin.laptopL} {
    margin-top: 34px;
    margin-bottom: 34px;
  }
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
        <Title>How To Play</Title>
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
              <Letter letter="W" type="correct" isExample submitted {...tileProps} />
              <Letter letter="E" type="typing" isExample {...tileProps} />
              <Letter letter="A" type="typing" isExample {...tileProps} />
              <Letter letter="R" type="typing" isExample {...tileProps} />
              <Letter letter="Y" type="typing" isExample {...tileProps} />
            </WordContainer>
            <p>
              The letter <strong>W</strong> is in the word and in the correct spot.
            </p>
          </Example>

          <Example>
            <WordContainer>
              <Letter letter="P" type="typing" isExample {...tileProps} />
              <Letter letter="I" type="wrong-spot" isExample submitted {...tileProps} />
              <Letter letter="L" type="typing" isExample {...tileProps} />
              <Letter letter="L" type="typing" isExample {...tileProps} />
              <Letter letter="S" type="typing" isExample {...tileProps} />
            </WordContainer>
            <p>
              The letter <strong>I</strong> is in the word but in the wrong spot.
            </p>
          </Example>

          <Example>
            <WordContainer>
              <Letter letter="V" type="typing" isExample {...tileProps} />
              <Letter letter="A" type="typing" isExample {...tileProps} />
              <Letter letter="G" type="typing" isExample {...tileProps} />
              <Letter letter="U" type="not-include" isExample submitted {...tileProps} />
              <Letter letter="E" type="typing" isExample {...tileProps} />
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
