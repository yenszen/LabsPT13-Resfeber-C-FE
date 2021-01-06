import React from 'react';
import { Navbar, Button } from '../../common';
import { Layout, Card } from 'antd';
import './Trips.css';

function RenderItinerary({
  onTripRemoval,
  itinerary,
  removeTrip,
  authState,
  removeFromTrip,
  tripId,
  goToEditForm,
}) {
  return (
    <Layout>
      <Navbar />
      <div>
        <Button
          buttonText="Edit Trip"
          handleClick={() => goToEditForm(parseInt(tripId))}
        />
        <Button
          buttonText="Remove Trip"
          handleClick={() => {
            removeTrip(parseInt(tripId), authState).then(() => onTripRemoval());
          }}
        />
      </div>
      <div className="destinations">
        {itinerary.map((item, index) => (
          <Card
            title={item.destination_name}
            extra={
              <Button
                buttonText="Remove destination"
                handleClick={() =>
                  removeFromTrip(item.id, authState).then(() =>
                    window.location.reload()
                  )
                }
              />
            }
            key={index}
          >
            <p>{item.category}</p>
            <p>{item.address}</p>
            <p>
              {item.city}, {item.state}
            </p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export default RenderItinerary;
