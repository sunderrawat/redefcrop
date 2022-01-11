import { createSlice } from '@reduxjs/toolkit';
import getCookie from './../utils/getCookie';
let user = localStorage.getItem('user');
let userData = JSON.parse(user);
let loginState =
  userData &&
  userData.name &&
  getCookie('token') &&
  getCookie('token').length > 1
    ? true
    : false;
const initialAuthState = {
  isAuthenticated: loginState,
  isOpen: false,
  modelSelect: 'signup',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      localStorage.removeItem('user');
    },
    loginModel(state) {
      state.isOpen = !state.isOpen;
    },
    loginModelCustom(state, action) {
      state.isOpen = action.payload;
    },
    modalSelection(state, action) {
      state.modelSelect = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
