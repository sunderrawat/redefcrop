import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import alertReducer from './alert';
import renderReducer from './render';

const store = configureStore({
  reducer: { auth: authReducer, alert: alertReducer, render: renderReducer },
});

export default store;
