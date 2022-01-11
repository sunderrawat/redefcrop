import { createSlice } from '@reduxjs/toolkit';

const initialAlertState = {
  showAlert: false,
  alertType: 'success',
  alertMessage: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    showAlert(state) {
      state.showAlert = true;
    },
    hideAlert(state) {
      state.showAlert = false;
    },
    alertType(state, action) {
      state.alertType = action.payload;
    },
    alertMessage(state, action) {
      state.alertMessage = action.payload;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
