import React, { useState, useEffect } from 'react';
import RenderTripsPage from './RenderTripsPage';
import { getMyTrips } from '../../../api';
import { LoadingComponent, Navbar } from '../../common';
import { useOktaAuth } from '@okta/okta-react';

function TripsContainer() {
  const { authState } = useOktaAuth();
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    getMyTrips(authState).then(data => setMyTrips(data));
    // eslint-disable-next-line
  }, []);

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
