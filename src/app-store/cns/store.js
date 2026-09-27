import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../rdc/rootReducer";
export const store = configureStore({ reducer: rootReducer });
