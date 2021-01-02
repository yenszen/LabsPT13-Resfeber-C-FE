import React from 'react';
import { Button, FormInput, FormButton, Navbar } from '../../common';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Homepage.css';
import { Layout, Modal } from 'antd';
import { getMyTrips } from '../../../api';

const { Content } = Layout;

function RenderHomePage(props) {
  const {
    userInfo,
    authState,
    searchResults,
    handleSubmit,
    handleQueryInput,
    handleLocationInput,
    selectedCategory,
    dropdownOptions,
    onCategorySelect,
    viewport,
    setViewport,
    selectedResult,
    setSelectedResult,
    tempMarkers,
    addMarkers,
    removeMarkers,
    manual,
    setManual,
    isModalVisible,
    showModal,
    handleOk,
    handleCancel,
    myTrips,
    addToTrip,
    createNewTrip,
    tripId,
    handleTripId,
    addPin,
    tripUpdate,
    setTripUpdate,
  } = props;

  return (
    <Layout>
      <Navbar />

      <Content className="home-body">
        <div style={{ textAlign: 'center' }}>
          <h2>Welcome {userInfo.name}.</h2>
          <h3>Let's plan your next road trip!</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <Button
            buttonText={manual ? 'Browse By Categories' : 'Browse Manually'}
            handleClick={() => setManual(!manual)}
            type="ghost"
          />
          <section>
            {manual ? (
              <React.Fragment>
                <FormInput
                  labelId=""
                  name="Search"
                  placeholder="Attractions, Food etc..."
                  onChange={handleQueryInput}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Dropdown
                  options={dropdownOptions}
                  onChange={onCategorySelect}
                  value={selectedCategory ? selectedCategory.label : null}
                  placeholder="Select a category"
                />
              </React.Fragment>
            )}
            <FormInput
              labelId=""
              name="Located"
              placeholder="WHERE TO?"
              onChange={handleLocationInput}
            />
          </section>

          <FormButton
            buttonText="Explore!"
            isDisabled={false}
            htmlType="submit"
          />
        </form>

        <section>
          <Button
            buttonText="Explore!"
            style={{ background: 'black', color: 'white' }}
          />
          <Button
            buttonText="Clear Markers"
            handleClick={removeMarkers}
            type="default"
          />
        </section>

        {searchResults ? (
          <div className="search-results">
            {searchResults.map((result, index) => {
              return (
                <div key={result.venue.id} className="result-card">
                  <h4>{result.venue.name}</h4>
                  <p>Category: {result.venue.categories[0].name}</p>
                  <p>Address: {result.venue.location.address}</p>
                  <div className="button-controls">
                    <Button
                      buttonText="Show on map"
                      handleClick={() => addMarkers(result)}
                    />
                    <Button
                      buttonText="Pin destination"
                      handleClick={() =>
                        addPin(
                          {
                            destination_name: result.venue.name,
                            category: result.venue.categories[0].name,
                            address: result.venue.location.address,
                            lat: result.venue.location.lat,
                            lng: result.venue.location.lng,
                            city: result.venue.location.city,
                            state: result.venue.location.state,
                            user_id: userInfo.sub,
                          },
                          authState
                        )
                          .then(() => alert('Pin added!'))
                          .catch(err => console.log('/Pin POST error', err))
                      }
                    />
                    <Button
                      buttonText="Add to Trip"
                      handleClick={() => {
                        showModal();
                        handleTripId(index);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <Modal
              title="Add to a Trip"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {myTrips.length > 0 ? (
                <div className="trip-modal">
                  {myTrips.map((trip, index) => (
                    <div
                      key={index}
                      className="trip-button"
                      onClick={() => {
                        addToTrip(
                          {
                            trip_id: trip.id,
                            destination_name: searchResults[tripId].venue.name,
                            category:
                              searchResults[tripId].venue.categories[0].name,
                            address:
                              searchResults[tripId].venue.location.address,
                            lat: searchResults[tripId].venue.location.lat,
                            lng: searchResults[tripId].venue.location.lng,
                            city: searchResults[tripId].venue.location.city,
                            state: searchResults[tripId].venue.location.state,
                          },
                          authState
                        ).then(() => alert('Destination added to trip!'));
                      }}
                    >
                      <h4>{trip.tripname}</h4>
                    </div>
                  ))}
                  <div
                    className="new-trip-button"
                    onClick={() => {
                      createNewTrip(
                        {
                          tripname: `New trip to ${searchResults[tripId].venue.location.state}`,
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
                                destination_name:
                                  searchResults[tripId].venue.name,
                                category:
                                  searchResults[tripId].venue.categories[0]
                                    .name,
                                address:
                                  searchResults[tripId].venue.location.address,
                                lat: searchResults[tripId].venue.location.lat,
                                lng: searchResults[tripId].venue.location.lng,
                                city: searchResults[tripId].venue.location.city,
                                state:
                                  searchResults[tripId].venue.location.state,
                              },
                              authState
                            );
                          })
                        )
                        .then(() => setTripUpdate(!tripUpdate));
                    }}
                  >
                    <h4>Create new trip</h4>
                  </div>
                </div>
              ) : (
                <div
                  className="new-trip-button"
                  onClick={() => {
                    createNewTrip(
                      {
                        tripname: `New trip to ${searchResults[tripId].venue.location.state}`,
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
                              destination_name:
                                searchResults[tripId].venue.name,
                              category:
                                searchResults[tripId].venue.categories[0].name,
                              address:
                                searchResults[tripId].venue.location.address,
                              lat: searchResults[tripId].venue.location.lat,
                              lng: searchResults[tripId].venue.location.lng,
                              city: searchResults[tripId].venue.location.city,
                              state: searchResults[tripId].venue.location.state,
                            },
                            authState
                          );
                        })
                      )
                      .then(() => setTripUpdate(!tripUpdate));
                  }}
                >
                  <h4>Create new trip</h4>
                </div>
              )}
            </Modal>
          </div>
        ) : null}

        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => setViewport(viewport)}
        >
          {tempMarkers.length > 0 ? (
            <React.Fragment>
              {tempMarkers.map(result => (
                <Marker
                  key={result.venue.id}
                  latitude={result.venue.location.lat}
                  longitude={result.venue.location.lng}
                >
                  <div
                    onClick={e => {
                      e.preventDefault();
                      setSelectedResult(result);
                    }}
                    className="marker"
                  >
                    <span></span>
                  </div>
                </Marker>
              ))}
            </React.Fragment>
          ) : null}

          {selectedResult ? (
            <Popup
              latitude={selectedResult.venue.location.lat}
              longitude={selectedResult.venue.location.lng}
              onClose={() => setSelectedResult(null)}
            >
              <div>
                <h4>{selectedResult.venue.name}</h4>
                <p>Category: {selectedResult.venue.categories[0].name}</p>
                <p>Address: {selectedResult.venue.location.address}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </Content>
    </Layout>
  );
}
export default RenderHomePage;
