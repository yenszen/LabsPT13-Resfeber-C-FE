import React from 'react';
import { Navbar, Button } from '../../common';
import { Layout, Card } from 'antd';
import './Trips.css';

function RenderItinerary({ trip, removeTrip, onTripRemoval, removeFromTrip }) {
  return (
    <Layout>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>{trip.tripName}</h2>
      <Button
        buttonText="Remove Trip"
        handleClick={() => {
          removeTrip(trip.id);
          onTripRemoval();
        }}
      />
      <div className="destinations">
        {trip.itinerary.map((destination, index) => (
          <Card
            title={destination.name}
            extra={
              <Button
                buttonText="Remove destination"
                handleClick={() => removeFromTrip(destination.id)}
              />
            }
            key={index}
          >
            <p>{destination.category}</p>
            <p>{destination.address}</p>
            <p>
              {destination.city}, {destination.state}
            </p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export default RenderItinerary;
