import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    massif: null,
    station: null,
    shop: null,
    dateA: null,
    dateD: null,
};

const initialCatalogState = {
    formValues: initialState,
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: initialCatalogState,
    reducers:{
        addFormValues(state, action) {
            state.formValues = action.payload;
        },
        addProduct(state, action) {
            state.product = action.payload;
        },
        addMassif(state, action) {
            state.formValues.massif = action.payload;
            state.formValues.station = null;
            state.formValues.shop = null;
            state.formValues.dateA = null;
            state.formValues.dateD = null;
        },
        addStation(state, action) {
            state.formValues.station = action.payload;
            state.formValues.shop = null;
            state.formValues.dateA = null;
            state.formValues.dateD = null;
        },
        addShop(state, action) {
            state.formValues.shop = action.payload;
        },
        clearCatalog(state) {
            state.formValues = initialState;
        },
        setStorageCatalogData(state) {
            window.localStorage.setItem('catalogInfo', JSON.stringify(state));
        },
        getStorageCatalogData(state) {
            if ('catalogInfo' in window.localStorage &&  window.localStorage.getItem('catalogInfo').length !== 0) {
                state.formValues = JSON.parse(window.localStorage.getItem('catalogInfo')).formValues;
                state.product = JSON.parse(window.localStorage.getItem('catalogInfo')).product;
            }
        }
    }
});

export const catalogActions = catalogSlice.actions;
export default catalogSlice.reducer;
