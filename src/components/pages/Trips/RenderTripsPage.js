import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import { Layout } from 'antd';
import './Trips.css';

function RenderTripsPage({ myTrips }) {
  return (
    <Layout>
      <Navbar />
      <div className="trips">
        {myTrips.map(trip => (
          <div key={trip.id} className="trip-card">
            <Link to={`/itinerary/${trip.id}`}>
              <h2>{trip.tripName}</h2>
              <p>{trip.startDate}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default RenderTripsPage;
