import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

// Redux setup
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducers } from './state/reducers/index';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import 'antd/dist/antd.less';

import './app.css';

import { NotFoundPage } from './components/pages/NotFound';
import { PinnedList } from './components/pages/Pins';
import { HomePage } from './components/pages/Home';
import { ProfileListPage, ProfileForm } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import { TripsList, Itinerary, TripForm } from './components/pages/Trips';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path="/"
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute path="/pins" component={PinnedList} />
        <SecureRoute path="/profile" component={ProfileListPage} />
        <SecureRoute path="/edit-form" component={ProfileForm} />
        <SecureRoute path="/datavis" component={ExampleDataViz} />
        <SecureRoute path="/trips" component={TripsList} />
        <SecureRoute
          path="/itinerary/:id"
          render={renderProps => <Itinerary {...renderProps} />}
        />
        <SecureRoute
          path="/edit-trip/:id"
          render={renderProps => <TripForm {...renderProps} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
