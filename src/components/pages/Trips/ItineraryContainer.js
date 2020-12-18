import React, { useState, useEffect } from 'react';
import RenderItinerary from './RenderItinerary';
import { getMyTrips } from '../../../api';
import { LoadingComponent } from '../../common';

function ItineraryContainer(props) {
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    getMyTrips().then(data => setItinerary(data));
  }, []);

  if (itinerary.length > 0) {
    let tripId = parseInt(props.match.params.id);
    let foundTrip = itinerary.find(tripObj => tripObj.id === tripId);

    return <RenderItinerary trip={foundTrip} />;
  }

  return <LoadingComponent message="Fetching itinerary" />;
}

export default ItineraryContainer;
