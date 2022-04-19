import {createSlice} from "@reduxjs/toolkit";

const initialAuthState = {
    client_id: "5gqd2onz1eccwgwssokg4wcokw88wogs8c808cwkw400oossws",
    client_secret: "4v769fm1cv40c4sgwko008s8o4sgs4s00sww8kk8w4sc84cokk",
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
        logout(state) {
            window.localStorage.removeItem('authInfo');
            window.localStorage.removeItem('cartInfo');
            window.localStorage.removeItem('catalogInfo');
            window.localStorage.removeItem('notificationInfo');
            window.localStorage.removeItem('ordersInfo');
            window.localStorage.removeItem('shopInfo');
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
