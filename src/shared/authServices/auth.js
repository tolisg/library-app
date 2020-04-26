import axios from 'axios';

axios.interceptors.response.use((response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  });

const getToken = () => {
  const userString = JSON.parse(localStorage.getItem('user'));
  if (!userString) return '';
  return userString.token || '';
};
const checkAuth = () => {
  const userString = JSON.parse(localStorage.getItem('user'));
  if (!userString) return '';
  return userString.username || '';
};
const saveToken = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
};
export { getToken, saveToken, checkAuth };
