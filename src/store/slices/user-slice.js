import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            console.log("User logged in state:", state); // Log user state
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            console.log("User logged out state:", state); // Log user state
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
