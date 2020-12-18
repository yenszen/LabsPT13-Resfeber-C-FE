import React from 'react';
import Navbar from '../../common/Navbar';
import { Layout } from 'antd';
import './Trips.css';

function RenderItinerary({ trip }) {
  return (
    <Layout>
      <Navbar />
      <h2>{trip.tripName}</h2>
      <div className="destinations">
        {trip.itinerary.map(destination => (
          <div key={destination.id}>
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
