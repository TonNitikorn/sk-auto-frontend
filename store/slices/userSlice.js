import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as serverService from "../../services/serverService";

const initialState = {
  accessToken: "",
  isAuthenticated: false,
  isAuthenticating: true,
  isLoading: false,
};

export const signIn = createAsyncThunk("user/signin", async (credential) => {
  const response = await serverService.signIn(credential);
  if (!response) {
    throw new Error("login failed");
  }
  return response;
});

export const changePassword = createAsyncThunk("user/changePassword", async (credential) => {
  const response = await serverService.changePassword(credential);
  if (!response) {
    throw new Error("login failed");
  }
  return response;
});

export const register = createAsyncThunk("user/register", async (credential) => {
  const response = await serverService.register(credential);
  if (!response) {
    throw new Error("login failed");
  }
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUsername: (state, action) => {
      state.isLoading = true;
    },
    signOut: (state, action) => {
      state.isLoading = true;
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    },
    getToken: (state, action) => {
      state.isAuthenticating = false;
      if (action.payload && action.payload.token) {
        state.accessToken = action.payload.token
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      // state.accessToken = action.payload.accessToken;
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      // state.accessToken = "";
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });
  },
  // extraReducers: (builder) => {
  //     builder.addCase(getSession.fulfilled, (state, action) => {
  //         state.isAuthenticating = false;
  //         if (action.payload && action.payload.user && action.payload.user.token) {
  //             state.accessToken = action.payload.user.token;
  //             state.user = action.payload.user;
  //             state.isAuthenticated = true;
  //         }
  //     });
  // },
});

export const { resetUsername, signOut, getToken } = userSlice.actions;
// export common user selector
export const userSelector = (store) => store.user;
export const isAuthenticatedSelector = (store) => store.user.isAuthenticated;
export const isAuthenticatingSelector = (store) => store.user.isAuthenticating;
// // export reducer
export default userSlice.reducer;
