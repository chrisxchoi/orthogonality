/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import QandA from './QandA.jsx';

describe('App component', () => {
  test('it renders', () => {
    render(<QandA />);
 });
})