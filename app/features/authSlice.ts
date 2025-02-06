
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@/app/store/store";


interface AuthState {
    user: any | null;
    token: string | null;
    isLoggedIn: boolean;
}

export interface ILoginResponse {
    token: {
        type: string;
        token: string;
        refreshToken: any;
    }
    error: any
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {


    },
});

export const {

} = authSlice.actions;

export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
