import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../common/';
import { Layout, Card } from 'antd';
import { Briefcase } from 'react-feather';
import './Trips.css';

function RenderTripsPage({ myTrips }) {
  return (
    <Layout className="trips-layout">
      <Navbar />
      <div className="trips-header">
        <Briefcase className="trips-icon" />
        <span>Trips</span>
      </div>
      <div className="trips">
        {myTrips.map((trip, index) => (
          <div className="trip-card" key={index}>
            <Link to={`/itinerary/${trip.id}`}>
              <Card title={trip.tripname}>
                {!trip.start_date && !trip.end_date ? (
                  <p>Dates unspecified</p>
                ) : (
                  <p>
                    {trip.start_date} to {trip.end_date}
                  </p>
                )}
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default RenderTripsPage;
