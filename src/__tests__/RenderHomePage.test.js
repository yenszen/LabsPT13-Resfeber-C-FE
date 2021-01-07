import RenderHomePage from '../components/pages/Home/RenderHomePage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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

describe('<RenderHomePage /> test suite', () => {
  test('user info displays successfully', () => {
    const tempMarkers = [];
    const setViewport = () => null;
    const { getByText } = render(
      <Router>
        <RenderHomePage
          userInfo={{ name: 'Sara' }}
          tempMarkers={tempMarkers}
          setViewport={setViewport}
        />
      </Router>
    );
    expect(getByText(/welcome sara/i).innerHTML).toBe('Welcome Sara.');
  });
});
