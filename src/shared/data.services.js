import * as axios from 'axios';
import { saveToken } from './authServices/auth';
import { API } from './config';

const parseList = (response) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};

const loginUser = async function (credentials) {
  try {
    const response = await axios.post(`${API}/auth/login`, credentials);
    // console.log(response);
    const data = parseList(response);
    saveToken(data);
    return data.username;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const registerUser = async function (user) {
  try {
    const response = await axios.post(`${API}/auth/register`, user);
    // console.log(response);
    const data = parseItem(response, 201);
    saveToken(data);
    return data.username;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getBooks = async function () {
  try {
    const response = await axios.get(`${API}/books`);
    // console.log(response);
    const data = parseList(response);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const deleteBook = async function (book) {
  try {
    const response = await axios.delete(`${API}/books/delete/${book._id}`);
    // console.log(response);
    const deletedBook = parseItem(response, 200);
    return deletedBook._id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const addBook = async function (book) {
  try {
    const response = await axios.post(`${API}/books/add`, book);
    // console.log(response);
    const addedBook = parseItem(response, 201);
    return addedBook;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const updateBook = async function (book) {
  try {
    const response = await axios.post(`${API}/books/update/${book._id}`, book);
    // console.log(response);
    const updatedBook = parseItem(response, 200);
    return updatedBook;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const addUser = async function (user) {
  try {
    const response = await axios.post(`${API}/users/add`, user);
    // console.log(response);
    const addedUser = parseItem(response, 201);
    return addedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getUsers = async function () {
  try {
    const response = await axios.get(`${API}/users`);
    // console.log(response);
    const user = parseList(response);
    return user;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const deleteUser = async function (user) {
  try {
    const response = await axios.delete(`${API}/users/delete/${user._id}`);
    // console.log(response);
    const deletedUser = parseItem(response, 200);
    return deletedUser._id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateUser = async function (user) {
  try {
    const response = await axios.post(`${API}/users/update/${user._id}`, user);
    // console.log(response);
    const updatedUser = parseItem(response, 200);
    return updatedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const dataService = {
  getBooks,
  deleteBook,
  addBook,
  addUser,
  getUsers,
  deleteUser,
  updateBook,
  updateUser,
  loginUser,
  registerUser
};
