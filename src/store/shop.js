import {createSlice} from "@reduxjs/toolkit";

const initialShopState = {
    massifs: [],
    stations: [],
    shops: [],
};

const shopSlice = createSlice({
    name: 'shop',
    initialState: initialShopState,
    reducers:{
        addMassif(state, action) {
            state.massifs= action.payload;
        },
        addStation(state, action) {
            state.stations= action.payload;
        },
        addShop(state, action) {
            state.shops= action.payload;
        },
        setStorageShopData(state) {
            window.localStorage.setItem('shopInfo', JSON.stringify(state));
        },
        getStorageShopData(state) {
            if ('shopInfo' in window.localStorage &&  window.localStorage.getItem('shopInfo').length !== 0) {
                state.massifs = JSON.parse(window.localStorage.getItem('shopInfo')).massifs;
                state.stations = JSON.parse(window.localStorage.getItem('shopInfo')).stations;
                state.shops = JSON.parse(window.localStorage.getItem('shopInfo')).shops;
            }
        }
    }
});

export const fetchShopsData = (token, id) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                `http://commerce.intersport-rent.local/api/${id}/shops`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                throw new Error('Could not fetch shops data!');

            }

            const data = await response.json();

            return data;
        };

        try {
            const shopData = await fetchData();
            dispatch(
                shopActions.addShop(shopData)
            );
        } catch (error) {
            console.log('error');
        }
    };
};

export const fetchMassifsData = (token) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                `http://commerce.intersport-rent.local/api/massifs`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                throw new Error('Could not fetch massifs data!');
            }
            const data = await response.json();
            return data;
        };

        try {
            const shopData = await fetchData();
            dispatch(
                shopActions.addMassif(shopData)
            );
        } catch (error) {
            console.log('error');
        }
    };
};

export const fetchStationsData = (token, id) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                `http://commerce.intersport-rent.local/api/${id}/stations`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                throw new Error('Could not fetch shops data!');

            }

            const data = await response.json();

            return data;
        };

        try {
            const shopData = await fetchData();
            dispatch(
                shopActions.addStation(shopData)
            );
        } catch (error) {
            console.log('error');
        }
    };
};

export const shopActions = shopSlice.actions;
export default shopSlice.reducer;
