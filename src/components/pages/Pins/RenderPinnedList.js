import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Modal } from 'antd';
import { Navbar, Button } from '../../common';
import './Pins.css';

const RenderPinnedList = ({
  data,
  authState,
  handlePinListUpdate,
  isModalVisible,
  showModal,
  handleOk,
  handleCancel,
  handleTripListUpdate,
  myTrips,
  createNewTrip,
  removePin,
  userInfo,
  addToTrip,
  selectedItem,
  handleSelectedItem,
  getMyTrips,
}) => (
  <Layout style={{ background: 'white' }}>
    <Navbar />
    {data.map((item, index) => (
      <React.Fragment>
        <Card
          title={item.destination_name}
          extra={
            <div>
              <Button
                buttonText="Add to trip"
                type="ghost"
                handleClick={() => {
                  handleSelectedItem(item);
                  showModal();
                }}
              />
              <Button
                buttonText="Remove pin"
                type="danger"
                handleClick={() => {
                  removePin(item.id, authState).then(() =>
                    handlePinListUpdate()
                  );
                }}
              />
            </div>
          }
          key={index}
          style={{ width: '80%', margin: '1rem auto 0' }}
        >
          <p>{item.category}</p>
          <p>{item.address}</p>
          <p>
            {item.city}, {item.state}
          </p>
        </Card>

        <Modal
          title="Add to Trip"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {myTrips.length > 0 ? (
            <div className="trip-modal">
              {myTrips.map((trip, tripIndex) => (
                <div
                  key={tripIndex}
                  className="trip-button"
                  onClick={() =>
                    addToTrip(
                      {
                        trip_id: trip.id,
                        destination_name: selectedItem.destination_name,
                        category: selectedItem.category,
                        address: selectedItem.address,
                        lat: selectedItem.lat,
                        lng: selectedItem.lng,
                        city: selectedItem.city,
                        state: selectedItem.state,
                      },
                      authState
                    )
                      .then(() => removePin(selectedItem.id, authState))
                      .then(() => {
                        handlePinListUpdate();
                        handleTripListUpdate();
                      })
                  }
                >
                  <h4>{trip.tripname}</h4>
                </div>
              ))}
              <div
                className="new-trip-button"
                onClick={() =>
                  createNewTrip(
                    {
                      tripname: `New trip to ${selectedItem.state}`,
                      user_id: userInfo.sub,
                    },
                    authState
                  )
                    .then(() =>
                      getMyTrips(userInfo.sub, authState).then(data => {
                        const newId = data[data.length - 1].id;
                        addToTrip(
                          {
                            trip_id: newId,
                            destination_name: selectedItem.destination_name,
                            category: selectedItem.category,
                            address: selectedItem.address,
                            lat: selectedItem.lat,
                            lng: selectedItem.lng,
                            city: selectedItem.city,
                            state: selectedItem.state,
                          },
                          authState
                        );
                      })
                    )
                    .then(() => {
                      removePin(selectedItem.id, authState).then(() => {
                        handlePinListUpdate();
                        handleTripListUpdate();
                      });
                    })
                }
              >
                <h4>Create New Trip</h4>
              </div>
            </div>
          ) : (
            <div
              className="new-trip-button"
              onClick={() =>
                createNewTrip(
                  {
                    tripname: `New trip to ${selectedItem.state}`,
                    user_id: userInfo.sub,
                  },
                  authState
                )
                  .then(() =>
                    getMyTrips(userInfo.sub, authState).then(data => {
                      const newId = data[data.length - 1].id;
                      addToTrip(
                        {
                          trip_id: newId,
                          destination_name: selectedItem.destination_name,
                          category: selectedItem.category,
                          address: selectedItem.address,
                          lat: selectedItem.lat,
                          lng: selectedItem.lng,
                          city: selectedItem.city,
                          state: selectedItem.state,
                        },
                        authState
                      );
                    })
                  )
                  .then(() => {
                    handleTripListUpdate();
                    removePin(selectedItem.id, authState).then(() => {
                      handlePinListUpdate();
                      handleTripListUpdate();
                    });
                  })
              }
            >
              <h4>Create new trip</h4>
            </div>
          )}
        </Modal>
      </React.Fragment>
    ))}
  </Layout>
);

export default RenderPinnedList;

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
RenderPinnedList.propTypes = {
  data: PropTypes.arrayOf(
    // Here is an example of enforcing an object structure that we expect to receive in our props:
    PropTypes.shape({
      // Here we require an id of type number or string to prevent a "unique key prop" warning
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      destination_name: PropTypes.string,
      category: PropTypes.string,
      address: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
    })
  ),
};
