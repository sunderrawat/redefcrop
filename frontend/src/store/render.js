import { createSlice } from '@reduxjs/toolkit';

const initialAlertState = {
  deleteRender: false,
};

const renderSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    deleteRender(state) {
      state.deleteRender = !state.deleteRender;
    },
  },
});

export const renderActions = renderSlice.actions;

export default renderSlice.reducer;
