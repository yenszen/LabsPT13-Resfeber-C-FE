import React from 'react';
import { Navbar, Button, FormButton } from '../../common';
import { Layout, Card, Carousel, Select } from 'antd';
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
  covidStatus,
  numNights,
  handleNumNights,
  handleRoomTypeChange,
  handleAirbnbSubmit,
  airbnbEst,
}) {
  const { Option } = Select;

  return (
    <Layout className="itinerary-layout">
      <Navbar />
      <div className="itinerary-header">
        <h1>Itinerary</h1>
        <div className="buttons">
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

      <div className="dashboard">
        <div className="covid-status">
          <h4>
            Covid Score -{' '}
            <span
              className="covid-block"
              style={{ backgroundColor: `${covidStatus}` }}
            ></span>
          </h4>
          <p>
            <span className="mild" /> Mild <span className="moderate" />{' '}
            Moderate <span className="severe" /> Severe
          </p>
        </div>
        {drivingInfo ? (
          <div className="info">
            <h4>
              {Number.parseFloat(drivingInfo.distance / 1609).toFixed(1)} miles
            </h4>
            <h4>
              {Number.parseFloat(drivingInfo.duration / 60).toFixed(1)} minutes
              total
            </h4>
          </div>
        ) : null}

        {itinerary.length > 0 ? (
          <div className="airbnb">
            <form onSubmit={handleAirbnbSubmit}>
              <div className="num-nights">
                <label htmlFor="num_nights">Number of nights</label>
                <input
                  type="number"
                  value={numNights}
                  onChange={handleNumNights}
                  name="num_nights"
                />
              </div>
              <Select
                defaultValue="Entire home/apt"
                style={{ width: '100%' }}
                onChange={handleRoomTypeChange}
              >
                <Option value="Entire home/apt">Entire home/apt</Option>
                <Option value="Private room">Private room</Option>
                <Option value="Shared room">Shared room</Option>
                <Option value="Hotel room">Hotel room</Option>
              </Select>
              <FormButton buttonText="Get Airbnb estimate" htmlType="submit" />
            </form>
            <div className="airbnb-result">
              <h1>Airbnb estimate</h1>
              <h1>${airbnbEst}</h1>
            </div>
          </div>
        ) : null}
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
