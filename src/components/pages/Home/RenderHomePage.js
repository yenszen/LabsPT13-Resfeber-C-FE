import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';

function RenderHomePage(props) {
  const {
    userInfo,
    authService,
    searchResults,
    handleSubmit,
    handleQueryInput,
    handleLocInput,
  } = props;

  return (
    <div>
      <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1>
      <div>
        <p>
          This is an example of a common example of how we'd like for you to
          approach components.
        </p>
        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleQueryInput}
          />
          <input
            type="text"
            placeholder="Located near..."
            onChange={handleLocInput}
          />
          <button type="submit">Search</button>
        </form>

        {searchResults ? (
          <React.Fragment>
            {searchResults[0].items.map(result => {
              return (
                <div key={result.venue.id}>
                  <h4>{result.venue.name}</h4>
                  <p>Category: {result.venue.categories[0].name}</p>
                  <p>Address: {result.venue.location.address}</p>
                </div>
              );
            })}
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <p>
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
