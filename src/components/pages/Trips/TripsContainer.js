import React, { useState, useEffect, useMemo } from 'react';
import RenderTripsPage from './RenderTripsPage';
import { getMyTrips } from '../../../api';
import { LoadingComponent, Navbar } from '../../common';
import { useOktaAuth } from '@okta/okta-react';

function TripsContainer() {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    if (userInfo) {
      getMyTrips(userInfo.sub, authState).then(data => {
        if (data.length > 0) {
          setMyTrips(data);
        } else {
          setMyTrips([]);
        }
      });
    }
    // eslint-disable-next-line
  }, [userInfo]);

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

  return (
    <React.Fragment>
      {myTrips.length > 0 ? (
        <RenderTripsPage myTrips={myTrips} />
      ) : (
        <React.Fragment>
          <Navbar />
          <LoadingComponent message="Fetching trips" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default TripsContainer;
