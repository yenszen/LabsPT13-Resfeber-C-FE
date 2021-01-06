import React, { useState, useEffect } from 'react';
import RenderItinerary from './RenderItinerary';
import { getItinerary, removeTrip, removeFromTrip } from '../../../api';
import { LoadingComponent } from '../../common';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

function ItineraryContainer(props) {
  const { authState } = useOktaAuth();
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    let tripId = parseInt(props.match.params.id);
    getItinerary(tripId, authState).then(data => setItinerary(data));
    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  const onTripRemoval = () => {
    history.push('/trips');
  };

  const goToEditForm = tripId => {
    history.push(`/edit-trip/${tripId}`);
  };

  if (itinerary) {
    return (
      <RenderItinerary
        removeTrip={removeTrip}
        onTripRemoval={onTripRemoval}
        removeFromTrip={removeFromTrip}
        itinerary={itinerary}
        authState={authState}
        tripId={props.match.params.id}
        goToEditForm={goToEditForm}
      />
    );
  } else {
    return (
      <LoadingComponent message="There are no destinations added to this itinerary" />
    );
  }
}

export default ItineraryContainer;
