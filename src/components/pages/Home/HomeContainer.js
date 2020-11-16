import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderHomePage';

import { connect } from 'react-redux';
import { fetchResults } from '../../../state/actions/index';

function HomeContainer({ LoadingComponent, fetchResults, searchResults }) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  const [queryInput, setQueryInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  const handleSubmit = e => {
    e.preventDefault();
    fetchResults(locationInput, queryInput);
  };

  const handleQueryInput = e => {
    const res = e.target.value.split(' ').join('+');
    setQueryInput(res);
  };

  const handleLocInput = e => {
    const res = e.target.value.split(' ').join('+');
    setLocationInput(res);
  };

  const onLocationSelect = pair => {
    setCoordinates(pair);
  };

  return (
    <React.Fragment>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <RenderHomePage
          userInfo={userInfo}
          authService={authService}
          searchResults={searchResults}
          handleSubmit={handleSubmit}
          handleQueryInput={e => handleQueryInput(e)}
          handleLocInput={e => handleLocInput(e)}
          onLocationSelect={onLocationSelect}
        />
      )}

      {coordinates ? console.log('coordinates', coordinates) : null}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults,
  };
};

export default connect(mapStateToProps, { fetchResults })(HomeContainer);
