import React from 'react';
import { Button, FormInput, FormButton, Navbar } from '../../common';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Homepage.css';
import { Layout, Modal } from 'antd';

const { Content } = Layout;

function RenderHomePage(props) {
  const {
    userInfo,
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
    mapView,
    handleMapView,
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
            buttonText={mapView ? 'Explore Destinations' : 'Explore Map'}
            handleClick={handleMapView}
            style={{ background: 'black', color: 'white' }}
          />
          <Button
            buttonText="Clear Markers"
            handleClick={removeMarkers}
            type="default"
          />
        </section>

        {mapView ? (
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
        ) : null}

        {searchResults && !mapView ? (
          <React.Fragment>
            <div className="search-results">
              {searchResults.map((result, index) => {
                return (
                  <div key={result.venue.id} className="result-card">
                    <h4>{result.venue.name}</h4>
                    <p>Category: {result.venue.categories[0].name}</p>
                    <p>Address: {result.venue.location.address}</p>
                    <Button
                      buttonText="Show on map"
                      handleClick={() => addMarkers(result)}
                    />
                    <Button
                      buttonText="Add to Trip"
                      handleClick={() => {
                        showModal();
                        handleTripId(index);
                      }}
                    />
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
                  <div>
                    {myTrips.map((trip, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          addToTrip(trip.id, {
                            itinerary: [
                              ...trip.itinerary,
                              {
                                name: searchResults[tripId].venue.name,
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
                            ],
                          })
                        }
                      >
                        {trip.tripName}
                      </div>
                    ))}
                    <div
                      style={{ backgroundColor: 'lightblue' }}
                      onClick={() =>
                        createNewTrip({
                          tripName: `New trip ${myTrips.length + 1}`,
                          itinerary: [
                            {
                              name: searchResults[tripId].venue.name,
                              category:
                                searchResults[tripId].venue.categories[0].name,
                              address:
                                searchResults[tripId].venue.location.address,
                              lat: searchResults[tripId].venue.location.lat,
                              lng: searchResults[tripId].venue.location.lng,
                              city: searchResults[tripId].venue.location.city,
                              state: searchResults[tripId].venue.location.state,
                            },
                          ],
                        })
                      }
                    >
                      <h3>Create new trip</h3>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ backgroundColor: 'lightblue' }}
                    onClick={() =>
                      createNewTrip({
                        tripName: `New trip ${myTrips.length + 1}`,
                        itinerary: [
                          {
                            name: searchResults[tripId].venue.name,
                            category:
                              searchResults[tripId].venue.categories[0].name,
                            address:
                              searchResults[tripId].venue.location.address,
                            lat: searchResults[tripId].venue.location.lat,
                            lng: searchResults[tripId].venue.location.lng,
                            city: searchResults[tripId].venue.location.city,
                            state: searchResults[tripId].venue.location.state,
                          },
                        ],
                      })
                    }
                  >
                    <h3>Create new trip</h3>
                  </div>
                )}
              </Modal>
            </div>
          </React.Fragment>
        ) : null}
      </Content>
    </Layout>
  );
}
export default RenderHomePage;
