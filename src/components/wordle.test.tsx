import '@testing-library/jest-dom';

import React from 'react';
import { cleanup, fireEvent, getAllByTestId, getByTestId, render } from '@testing-library/react';

import HeaderComponent from './Header';

describe('Wordle component', () => {
  const TEST_IDS = {
    header: 'wordle-header',
  };

  afterEach(() => {
    cleanup();
  });

  describe('Initial Setup', () => {
    test('should render the header correctly', () => {
      const { getByTestId } = render(<HeaderComponent />);

      const header = getByTestId(TEST_IDS.header);

      expect(header.textContent).toContain('Wordle');
    });
  });
});
