import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../common/';
import { Layout, Card } from 'antd';
import './Trips.css';

function RenderTripsPage({ myTrips }) {
  return (
    <Layout>
      <Navbar />
      <div className="trips">
        {myTrips.map((trip, index) => (
          <div className="trip-card" key={index}>
            <Link to={`/itinerary/${trip.id}`}>
              <Card title={trip.tripName}>
                <p>{trip.startDate}</p>
                <p>{trip.itinerary.length} featured items</p>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default RenderTripsPage;
