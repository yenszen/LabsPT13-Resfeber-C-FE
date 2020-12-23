import React, { useState, useEffect } from 'react';
import RenderItinerary from './RenderItinerary';
import { getMyTrips, removeTrip, removeFromTrip } from '../../../api';
import { LoadingComponent } from '../../common';
import { useHistory } from 'react-router-dom';

function ItineraryContainer(props) {
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    getMyTrips().then(data => setItinerary(data));
  }, []);

  const history = useHistory();

  const onTripRemoval = () => {
    history.push('/trips');
  };

  if (itinerary.length > 0) {
    let tripId = parseInt(props.match.params.id);
    let foundTrip = itinerary.find(tripObj => tripObj.id === tripId);

    return (
      <RenderItinerary
        trip={foundTrip}
        removeTrip={removeTrip}
        onTripRemoval={onTripRemoval}
        removeFromTrip={removeFromTrip}
      />
    );
  }

  return <LoadingComponent message="Fetching itinerary" />;
}

export default ItineraryContainer;
