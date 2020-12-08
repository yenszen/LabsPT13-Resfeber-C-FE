import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormInput, FormButton } from '../../common';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Homepage.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function RenderHomePage(props) {
  const {
    userInfo,
    authService,
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
  } = props;

  return (
    <Layout className="home-page">
      <Layout className="home-body">
        <h1>
          <small>Hi sara welcome to</small>Resfeber
        </h1>

        <h2>Plan your next road trip!</h2>
        <div className="home-logout">
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </div>

        <section>
          <Button buttonText="Explore" />
          <Button buttonText="Plan your trip!" />
        </section>

        <form onSubmit={handleSubmit}>
          <section>
            <Dropdown
              options={dropdownOptions}
              onChange={onCategorySelect}
              value={selectedCategory ? selectedCategory.label : null}
              placeholder="Select a category"
            />
            <FormInput
              labelId="Search"
              name="Search"
              placeholder="Attractions, Food etc..."
              onChange={handleQueryInput}
            />
          </section>
          <FormInput
            labelId=""
            name="Located"
            placeholder="WHERE TO?"
            onChange={handleLocationInput}
          />
          <FormButton buttonText="Explore!" isDisabled={false} />
        </form>

        <Button
          buttonText={mapView ? 'List View' : 'Map View'}
          handleClick={handleMapView}
        />
        <Button buttonText="Clear map markers" handleClick={removeMarkers} />

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
                    ></div>
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
            {searchResults.map(result => {
              return (
                <div key={result.venue.id}>
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
          </React.Fragment>
        ) : null}
      </Layout>
      <p>{userInfo.name}</p>
      <Footer className="home-footer">
        <div>
          <svg width="50" height="50">
            <circle cx="80" cy="80" r="50" fill="red" />
          </svg>
          <Link to="/profile-list">Data Visualizations Example</Link>
        </div>
        <div>
          <svg width="50" height="50">
            <circle cx="80" cy="80" r="50" fill="red" />
          </svg>
          <Link to="/profile-list">Trips</Link>
        </div>
        <div>
          <svg width="50" height="50">
            <circle cx="80" cy="80" r="50" fill="red" />
          </svg>
          <Link to="/example-list">Pins</Link>
        </div>
        <div>
          <svg width="50" height="50">
            <circle cx="80" cy="80" r="50" fill="red" />
          </svg>
          <Link to="/datavis">Profile</Link>
        </div>
      </Footer>
    </Layout>
  );
}
export default RenderHomePage;
