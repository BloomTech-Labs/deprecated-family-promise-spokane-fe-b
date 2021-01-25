// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Import action TYPES at the top of the file

import { axiosWithAuth } from '../../api/axiosWithAuth';

export const setCurrentUser = () => async dispatch => {
  dispatch({ type: 'LOG_IN' });
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    let currentUser = await axiosWithAuth()
      .get('/users/me')
      .then(res => res.data.user);

    currentUser.role = 'guest';

    dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
  } catch (error) {
    alert('Error logging in');
    console.log(error);
    console.log(error?.response);
  } finally {
    console.log('LOGIN ACTION: FINALLY: SET_LOADING');
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const getFamily = () => {};
