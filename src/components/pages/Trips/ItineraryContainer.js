import React, { useState, useEffect } from 'react';
import RenderItinerary from './RenderItinerary';
import {
  getItinerary,
  removeTrip,
  removeFromTrip,
  getFuelData,
  getDrivingDistance,
} from '../../../api';
import { LoadingComponent } from '../../common';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

function ItineraryContainer(props) {
  const { authState } = useOktaAuth();
  const [itinerary, setItinerary] = useState([]);
  const [gasPrices, setGasPrices] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [drivingInfo, setDrivingInfo] = useState(null);

  useEffect(() => {
    let tripId = parseInt(props.match.params.id);
    getItinerary(tripId, authState).then(data => setItinerary(data));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('itinerary', itinerary);
    if (itinerary.length > 0) {
      let joined = coordinates;
      itinerary.map(destination => {
        const stringified =
          destination.lng.toString() + ',' + destination.lat.toString();
        return (joined = [...joined, stringified]);
      });
      setCoordinates(joined);
    }
    // eslint-disable-next-line
  }, [itinerary]);

  useEffect(() => {
    if (coordinates.length > 1) {
      getDrivingDistance(coordinates)
        .then(data =>
          setDrivingInfo({
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
          })
        )
        .then(() =>
          getFuelData(itinerary[0].state).then(fuelData =>
            setGasPrices(fuelData)
          )
        );
    } else if (itinerary.length > 0) {
      getFuelData(itinerary[0].state).then(fuelData => setGasPrices(fuelData));
    }
    // eslint-disable-next-line
  }, [coordinates]);

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
        gasPrices={gasPrices}
        drivingInfo={drivingInfo}
      />
    );
  } else {
    return (
      <LoadingComponent message="There are no destinations added to this itinerary" />
    );
  }
}

export default ItineraryContainer;
