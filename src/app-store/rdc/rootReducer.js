import { combineReducers } from "@reduxjs/toolkit";
import planningReducer from "../../app-date-pick/rdc/planningSlice";
import roomReducer from "../../app-room-create/rdc/roomSlice";

export default combineReducers({
  planning: planningReducer,
  room: roomReducer,
});
