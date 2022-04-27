import {createSlice} from "@reduxjs/toolkit";
import {fetchData, fetchData1} from "../response";

const initialShopState = {
    massifs: [],
    stations: [],
    shops: [],
    allShops: [],
    product: {},
};

const shopSlice = createSlice({
    name: 'shop',
    initialState: initialShopState,
    reducers:{
        addMassif(state, action) {
            state.massifs = action.payload;
        },
        addStation(state, action) {
            state.stations = action.payload;
        },
        addShop(state, action) {
            state.shops = action.payload;
        },
        addAllShops(state, action) {
            state.allShops = action.payload;
        },
        addProduct(state, action) {
            state.product = action.payload;
        },
        removeProduct(state) {
            state.product = {};
        },
        setStorageShopData(state) {
            window.localStorage.setItem('shopInfo', JSON.stringify(state));
        },
        getStorageShopData(state) {
            if ('shopInfo' in window.localStorage &&  window.localStorage.getItem('shopInfo').length !== 0) {
                state.massifs = JSON.parse(window.localStorage.getItem('shopInfo')).massifs;
                state.stations = JSON.parse(window.localStorage.getItem('shopInfo')).stations;
                state.shops = JSON.parse(window.localStorage.getItem('shopInfo')).shops;
                state.product = JSON.parse(window.localStorage.getItem('shopInfo')).product;
                state.allShops = JSON.parse(window.localStorage.getItem('shopInfo')).allShops;
            }
        }
    }
});


export const fetchMassifsData = (token) => {
    return async (dispatch) => {
        const response = await fetchData(token, 'massifs', 'GET');
        if (!response.ok) {
            throw new Error('Could not fetch data!');
        }
        const shopData = await response.json();
        dispatch(
            shopActions.addMassif(shopData)
        );
    };
};


export const fetchSopsData = (token) => {
    return async (dispatch) => {
        const response = await fetchData(token, 'Partnershops', 'GET');
        if (!response.ok) {
            throw new Error('Could not fetch data!');
        }
        const shopData = await response.json();
        dispatch(
            shopActions.addAllShops(shopData)
        );
    };
};


export const shopActions = shopSlice.actions;
export default shopSlice.reducer;
