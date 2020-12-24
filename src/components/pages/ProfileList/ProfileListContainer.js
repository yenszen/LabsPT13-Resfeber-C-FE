import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { getProfileData } from '../../../api';
import RenderProfileListPage from './RenderProfileListPage';
import { LoadingComponent } from '../../common';

const ProfileList = () => {
  const { authState, authService } = useOktaAuth();
  const [profile, setProfile] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
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

  useEffect(() => {
    if (userInfo) {
      getProfileData(userInfo.sub, authState).then(data => setProfile(data));
    }
    // eslint-disable-next-line
  }, [userInfo]);

  return profile ? (
    <RenderProfileListPage data={profile} />
  ) : (
    <LoadingComponent message="Loading Profiles..." />
  );
};

export default ProfileList;
