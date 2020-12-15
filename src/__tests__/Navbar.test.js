import React from 'react';
import Navbar from '../components/common/Navbar';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {
        getUser: () => Promise.resolve({ name: 'sara' }),
      },
    };
  },
}));

describe('<Navbar /> test suite', () => {
  test('navbar renders', () => {
    const { getByText } = render(<Navbar />);
    const title = getByText(/resfeber/i);
    expect(title).toBeInTheDocument();
  });
});
