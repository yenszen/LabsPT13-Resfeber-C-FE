import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderHomePage';

import { connect } from 'react-redux';
import {
  fetchSearchResults,
  fetchCategoryResults,
} from '../../../state/actions/index';

function HomeContainer({
  LoadingComponent,
  fetchSearchResults,
  fetchCategoryResults,
  searchResults,
}) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  const [queryInput, setQueryInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    value: 'topPicks',
    label: 'Top Picks',
  });

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

    if (queryInput === '') {
      fetchCategoryResults(locationInput, selectedCategory.value);
    } else {
      fetchSearchResults(locationInput, queryInput);
    }
  };

  const handleQueryInput = e => {
    const res = e.target.value.split(' ').join('+');
    setQueryInput(res);
  };

  const handleLocationInput = e => {
    const res = e.target.value.split(' ').join('+');
    setLocationInput(res);
  };

  const onLocationSelect = pair => {
    setCoordinates(pair);
  };

  const dropdownOptions = [
    { value: 'topPicks', label: 'Top Picks' },
    { value: 'food', label: 'Food' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'shops', label: 'Shops' },
    { value: 'arts', label: 'Arts' },
    { value: 'outdoors', label: 'Outdoors' },
    { value: 'sights', label: 'Sights' },
    { value: 'trending', label: 'Trending' },
  ];

  const onCategorySelect = option => {
    setSelectedCategory(option);
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
          handleLocationInput={e => handleLocationInput(e)}
          onLocationSelect={onLocationSelect}
          selectedCategory={selectedCategory}
          dropdownOptions={dropdownOptions}
          onCategorySelect={onCategorySelect}
        />
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults,
  };
};

export default connect(mapStateToProps, {
  fetchSearchResults,
  fetchCategoryResults,
})(HomeContainer);
