import axios from 'axios';
const environment = process.env.ENV || 'development';

const ApiUrl =
  environment !== 'development'
    ? process.env.REACT_APP_API_URI
    : 'http://localhost:8000/';

// needs to be set in Amplify you want this to work
// set to your "Product Node Server URI"... heroku app
export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'))?.idToken
    ?.value;
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },

    baseURL: ApiUrl,

    // baseURL: 'https://family-promise-spokane-be-b.herokuapp.com/',
    // baseURL: 'https://family-pomise-spokane.herokuapp.com',

  });
};
