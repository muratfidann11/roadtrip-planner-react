import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: null,
  participant: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,

  reducers: {
    createRoomStart(state) {
      state.loading = true;
      state.error = null;
    },

    createRoomSuccess(state, action) {
      state.loading = false;
      state.room = action.payload.room;
      state.participant = action.payload.participant;
      state.error = null;
    },

    createRoomFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearRoom(state) {
      state.room = null;
      state.participant = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  createRoomStart,
  createRoomSuccess,
  createRoomFailure,
  clearRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
