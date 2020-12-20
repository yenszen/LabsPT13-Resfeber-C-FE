import React, { useState, useEffect } from 'react';
// import { useOktaAuth } from '@okta/okta-react';
import { getTestProfileData } from '../../../api';
import RenderProfileListPage from './RenderProfileListPage';
import { LoadingComponent } from '../../common';

// Here is an example of using our reusable List component to display some list data to the UI.
const ProfileList = () => {
  // const { authState } = useOktaAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getTestProfileData().then(data => setProfile(data));
  }, []);

  return profile ? (
    <RenderProfileListPage data={profile} />
  ) : (
    <LoadingComponent message="Loading Profiles..." />
  );
};

export default ProfileList;
