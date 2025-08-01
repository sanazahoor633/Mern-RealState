import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
///persist store import in redux-peerist
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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
    serializableCheck: true

    }),
});


export const persistor = persistStore(store);
