import React from 'react';
import { Navbar, Button } from '../../common';
import { Layout } from 'antd';
import './Trips.css';

function RenderItinerary({ trip, removeTrip, onTripRemoval }) {
  return (
    <Layout>
      <Navbar />
      <h2>{trip.tripName}</h2>
      <Button
        buttonText="Remove Trip"
        handleClick={() => {
          removeTrip(trip.id);
          onTripRemoval();
        }}
      />
      <div className="destinations">
        {trip.itinerary.map((destination, index) => (
          <div key={index}>
            <h4>{destination.name}</h4>
            <p className="category">{destination.category}</p>
            <p className="address">{destination.address}</p>
            <p>
              {destination.city}, {destination.state}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default RenderItinerary;
