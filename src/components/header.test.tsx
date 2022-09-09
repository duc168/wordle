import '@testing-library/jest-dom';

import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Header from './Header';

describe('Header component', () => {
  const TEST_IDS = {
    header: 'wordle-header',
  };

  afterEach(() => {
    cleanup();
  });

  describe('Setup', () => {
    test('should render the header content correctly', () => {
      const { getByTestId } = render(<Header />);

      const header = getByTestId(TEST_IDS.header);

      expect(header.textContent).toContain('Wordle');
    });
  });
});
