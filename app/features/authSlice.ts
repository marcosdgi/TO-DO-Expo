
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@/app/store/store";

import AsyncStorage from "@react-native-async-storage/async-storage";


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



// export const login = createAsyncThunk(
//     "auth/login",
//     async (loginForm: { rut: string; clave: string, pushToken: string | null }, { rejectWithValue }) => {
//         try {

//             return { null };
//         } catch (error) {
//             return rejectWithValue(
//                 error instanceof Error ? error.message : "An unknown error occurred",
//             );
//         }
//     },
// );

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
