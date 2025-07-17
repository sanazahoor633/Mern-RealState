import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
///persist store import in redux-peerist
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer( persistConfig, rootReducer )



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);
