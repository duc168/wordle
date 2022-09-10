import '@testing-library/jest-dom';

import React from 'react';
import { cleanup, fireEvent, getAllByTestId, getByTestId, render } from '@testing-library/react';

import { WordleContextProvider } from '@/contexts/wordleContext';

import HowToPlay from './Wordle/HowToPlay';

const hoverIn = (element: any, hoverIndex: number, options: any) => {
  fireEvent.mouseMove(element[hoverIndex], options);

  fireEvent.mouseOver(element[hoverIndex], options);

  fireEvent.mouseEnter(element[hoverIndex], options);
};

const hoverOut = (element: any, hoverIndex: number) => {
  fireEvent.mouseOut(element[hoverIndex]);

  fireEvent.mouseLeave(element[hoverIndex]);
};

describe('Wordle component', () => {
  const TEST_IDS = {
    howToPlayTitle: 'how-to-play-title',
    howToPlayExample: 'how-to-play-example',
    wordleRow: 'wordle-row',
  };

  afterEach(() => {
    cleanup();
  });

  describe('Initial Setup', () => {
    test('should render the how to play correctly', () => {
      const howToPlayDefaultValue = undefined;

      const { getByTestId, getAllByTestId } = render(
        <WordleContextProvider>
          <HowToPlay
            defaultValue={howToPlayDefaultValue}
            tileProps={{
              letterHeight: '40px',
              letterWidth: '40px',
              processingSeconds: 4,
            }}
          />
        </WordleContextProvider>,
      );

      const title = getByTestId(TEST_IDS.howToPlayTitle);

      expect(title.textContent).toContain('How To Play');

      const examples = getAllByTestId(TEST_IDS.howToPlayExample);

      expect(examples.length).toEqual(3);
    });
  });
});
