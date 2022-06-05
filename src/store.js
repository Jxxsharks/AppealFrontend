import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {combineReducers} from "redux"
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    userInfo: userReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})