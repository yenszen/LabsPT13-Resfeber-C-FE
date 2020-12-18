import React, { useState, useEffect } from 'react';
import RenderTripsPage from './RenderTripsPage';
import { getMyTrips } from '../../../api';
import { LoadingComponent } from '../../common';

function TripsContainer() {
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    getMyTrips().then(data => setMyTrips(data));
  }, []);

  return (
    <React.Fragment>
      {myTrips.length > 0 ? (
        <RenderTripsPage myTrips={myTrips} />
      ) : (
        <LoadingComponent message="Fetching trips" />
      )}
    </React.Fragment>
  );
}

export default TripsContainer;
