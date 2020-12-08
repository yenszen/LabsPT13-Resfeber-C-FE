import React from 'react';
import Map from './Map';
import { Link, Route } from 'react-router-dom';
import { FormInput, FormButton } from '../../common';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './MapPage.css';
import '../Home/Homepage.css';
import { Layout, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function RenderMapPage(props) {
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
    <Layout className="map-page">
      <Route path="/map">
        <Map
          handleSubmit={handleSubmit}
          userInfo={userInfo}
          searchResults={searchResults}
          handleQueryInput={handleQueryInput}
          selectedCategory={selectedCategory}
          dropdownOptions={dropdownOptions}
          onCategorySelect={onCategorySelect}
          viewport={viewport}
          setViewport={setViewport}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          tempMarkers={tempMarkers}
          addMarkers={addMarkers}
          removeMarkers={removeMarkers}
          mapView={mapView}
          handleMapView={handleMapView}
        />
      </Route>
      <Layout className="home-body"></Layout>
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
export default RenderMapPage;
