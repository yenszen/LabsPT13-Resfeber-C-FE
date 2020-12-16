import React from 'react';
import { Button, FormInput, FormButton, Navbar } from '../../common';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Homepage.css';
import { Layout } from 'antd';

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
              {searchResults.map(result => {
                return (
                  <div key={result.venue.id} className="result-card">
                    <h4>{result.venue.name}</h4>
                    <p>Category: {result.venue.categories[0].name}</p>
                    <p>Address: {result.venue.location.address}</p>
                    <Button
                      buttonText="Show on map"
                      handleClick={() => addMarkers(result)}
                    />
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ) : null}
      </Content>
    </Layout>
  );
}
export default RenderHomePage;
