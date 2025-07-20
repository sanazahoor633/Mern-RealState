import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = null;
    },
    deleteUserStart: (state) => {
        state.loading = true;
    },
    deleteUserSucess: (state) => {
state.currentUser = null;
state.loading = false;
state.error = null;
    },
    deleteUserFailed: (state, action) => {
state.error = action.payload;
state.loading = false
    },
      signOutUserStart: (state) => {
        state.loading = true;
    },
    signOutUserSucess: (state) => {
state.currentUser = null;
state.loading = false;
state.error = null;
    },
    signOutUserFailed: (state, action) => {
state.error = action.payload;
state.loading = false
    },
    clearError: (state) =>{
      state.error = null
    }


  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserFailure,
  updateUserSucess,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFailed,
  signOutUserStart,
  signOutUserSucess,
  signOutUserFailed,
  clearError
} = userSlice.actions;
export default userSlice.reducer;
