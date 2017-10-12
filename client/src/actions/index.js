import axios from 'axios';

import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data })
};

export const getUserLocation = () => async dispatch => {

  const geolocation = navigator.geolocation;
  const success = async(position) => {
    console.log('position', position);
    const res = await axios.post('/api/current_location', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    dispatch({ type: FETCH_USER, payload: res.data })
  };
  const location = await geolocation.getCurrentPosition(success);


};
