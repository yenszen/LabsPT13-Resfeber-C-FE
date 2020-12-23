import React, { useState, useEffect } from 'react';
import { getPins } from '../../../api';
import { Navbar, LoadingComponent } from '../../common';
import RenderPinnedList from './RenderPinnedList';

// Here is an example of using our reusable List component to display some list data to the UI.
const PinnedListContainer = () => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    getPins().then(data => {
      setPins(data);
    });
  }, []);

  return (
    <React.Fragment>
      {pins.length > 0 ? (
        <RenderPinnedList data={pins} />
      ) : (
        <React.Fragment>
          <Navbar />
          <LoadingComponent message="Fetching pinned destinations" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PinnedListContainer;
