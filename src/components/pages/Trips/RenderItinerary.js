import React from 'react';
import { Navbar, Button } from '../../common';
import { Layout, Card, Carousel } from 'antd';
import './Trips.css';

function RenderItinerary({
  onTripRemoval,
  itinerary,
  removeTrip,
  authState,
  removeFromTrip,
  tripId,
  goToEditForm,
  gasPrices,
  drivingInfo,
}) {
  return (
    <Layout className="itinerary-layout">
      <Navbar />
      <div className="dashboard">
        <div className="info">
          <h3>Trip Itinerary</h3>
          {drivingInfo ? (
            <div className="driving-info">
              <p>
                {Number.parseFloat(drivingInfo.distance / 1609.344).toPrecision(
                  3
                )}{' '}
                miles
              </p>
              <p>
                {Number.parseFloat(drivingInfo.duration / 60).toPrecision(3)}{' '}
                minutes total
              </p>
            </div>
          ) : null}
        </div>
        <div>
          <Button
            buttonText="Edit Trip"
            type="ghost"
            handleClick={() => goToEditForm(parseInt(tripId))}
          />
          <Button
            buttonText="Remove Trip"
            type="danger"
            handleClick={() => {
              removeTrip(parseInt(tripId), authState).then(() =>
                onTripRemoval()
              );
            }}
          />
        </div>
      </div>

      <div>
        {gasPrices ? (
          <div>
            <h2 className="carousel-header">
              {gasPrices.name} Gas Prices per Gallon
            </h2>
            <Carousel autoplay>
              <div>
                <p className="carousel-item">Gasoline ${gasPrices.gasoline}</p>
              </div>
              <div>
                <p className="carousel-item">Mid Grade ${gasPrices.midGrade}</p>
              </div>
              <div>
                <p className="carousel-item">Premium ${gasPrices.premium}</p>
              </div>
              <div>
                <p className="carousel-item">Diesel ${gasPrices.diesel}</p>
              </div>
            </Carousel>
          </div>
        ) : null}
      </div>

      <div className="destinations">
        {itinerary.map((item, index) => (
          <Card
            title={item.destination_name}
            extra={
              <Button
                buttonText="Remove item"
                type="ghost"
                handleClick={() =>
                  removeFromTrip(item.id, authState).then(() =>
                    window.location.reload()
                  )
                }
              />
            }
            key={index}
          >
            <h4>{item.category}</h4>
            <p>
              {item.address}, {item.city}, {item.state}
            </p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export default RenderItinerary;
