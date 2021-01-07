import React, { useState, useEffect, useMemo } from 'react';
import {
  getPins,
  getMyTrips,
  createNewTrip,
  removePin,
  addToTrip,
} from '../../../api';
import { Navbar, LoadingComponent } from '../../common';
import RenderPinnedList from './RenderPinnedList';
import { useOktaAuth } from '@okta/okta-react';

// Here is an example of using our reusable List component to display some list data to the UI.
const PinnedListContainer = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);
  const [pins, setPins] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const handleSelectedItem = item => {
    setSelectedItem(item);
  };

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  const handlePinListUpdate = () => {
    if (userInfo) {
      getPins(userInfo.sub, authState).then(data => {
        if (data.length > 0) {
          setPins(data);
        } else {
          setPins([]);
        }
      });
    }
  };

  const handleTripListUpdate = () => {
    if (userInfo) {
      getMyTrips(userInfo.sub, authState).then(data => {
        if (data.length > 0) {
          setMyTrips(data);
        } else {
          setMyTrips([]);
        }
      });
    }
  };

  useEffect(() => {
    handlePinListUpdate();
    handleTripListUpdate();
    // eslint-disable-next-line
  }, [userInfo]);

  // handles adding Pins to Trips
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment>
      {pins.length > 0 ? (
        <RenderPinnedList
          data={pins}
          authState={authState}
          handlePinListUpdate={handlePinListUpdate}
          isModalVisible={isModalVisible}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          handleTripListUpdate={handleTripListUpdate}
          myTrips={myTrips}
          createNewTrip={createNewTrip}
          removePin={removePin}
          userInfo={userInfo}
          addToTrip={addToTrip}
          selectedItem={selectedItem}
          handleSelectedItem={handleSelectedItem}
          getMyTrips={getMyTrips}
        />
      ) : (
        <React.Fragment>
          <Navbar />
          <LoadingComponent message="There are currently no pinned destinations" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PinnedListContainer;
