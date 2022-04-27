import {createSlice} from "@reduxjs/toolkit";
import globalVariables from "./state";

const initialAuthState = {
    client_id: globalVariables.clientId,
    client_secret: globalVariables.clientSecret,
    username: "",
    password: "",
    access_token: "",
    error: "Combinaison username et mot de passe invalide !",
    isLogged: false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers:{
        login(state) {
            state.isLogged = true;
        },
        logout() {
            window.localStorage.clear();
        },
        setToken(state, action) {
            state.access_token = action.payload;
        },
        setUsername(state, action) {
            state.username = action.payload;
        },
        setPassword(state, action) {
            state.password = action.payload;
        },
        setStorageAuthData(state) {
            window.localStorage.setItem('authInfo', JSON.stringify(state));
        },
        getStorageAuthData(state) {
            if ('authInfo' in window.localStorage &&  window.localStorage.getItem('authInfo').length !== 0) {
                state.access_token = JSON.parse(window.localStorage.getItem('authInfo')).access_token;
                state.username = JSON.parse(window.localStorage.getItem('authInfo')).username;
                state.password = JSON.parse(window.localStorage.getItem('authInfo')).password;
                state.isLogged = true;
            }
        }

    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
