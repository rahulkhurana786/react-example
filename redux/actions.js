import axios from 'axios';

import { BASE_URL } from '../config';

// Define action types
export const GET_USERS = 'GET_USERS';
export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';

// Define action creators

export const getUsers = (page) => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL + page}`);
      // console.log('DATA ========>', response.data);
      if (response.data) {
        dispatch({
          type: GET_USERS,
          payload: response.data.results,
          page: page
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

export const addBookmark = user => dispatch => {
  dispatch({
    type: ADD_TO_BOOKMARK_LIST,
    payload: user
  });
};

export const removeBookmark = user => dispatch => {
  dispatch({
    type: REMOVE_FROM_BOOKMARK_LIST,
    payload: user
  });
};
