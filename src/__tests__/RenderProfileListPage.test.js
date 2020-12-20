import React from 'react';
import RenderProfileListPage from '../components/pages/ProfileList/RenderProfileListPage';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

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

test('loads profile information', () => {
  const data = {
    id: '1',
    user_name: 'John Wick',
    status: 'Single',
    address_1: 'The Continental',
    address_2: 'Fictional',
    carType: 'Sedan',
    budget: 1000,
    accommodationType: 'Entire Place',
  };
  const { getByText } = render(
    <Router>
      <RenderProfileListPage data={data} />
    </Router>
  );
  const element = getByText(/john wick/i);
  expect(element).toBeInTheDocument();
});
