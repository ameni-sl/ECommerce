import {createSlice} from "@reduxjs/toolkit";

const initialCatalogState = {
    formValues: {
        massif: null,
        station: null,
        shop: null,
        dateA: "",
        dateD: "",
    },
    catalogList: [],
    cat : [],
    error: {},
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: initialCatalogState,
    reducers:{
        addFormValues(state, action) {
            state.formValues = action.payload;
        },
        addCatalog(state, action) {

            state.catalogList = action.payload;
            state.error = {};
        },
        addMassif(state, action) {
            state.formValues.massif = action.payload;
        },
        addStation(state, action) {
            state.formValues.station = action.payload;
        },
        addCat(state){
            const catList = [];
            catList.push(state.formValues);
            catList.push(state.catalogList);
            state.cat.push(catList);
        },
        addError(state, action) {
            state.error = action.payload;
            state.catalogList = [];
        },
        setStorageCatalogData(state) {
            window.localStorage.setItem('catalogInfo', JSON.stringify(state));
        },
        getStorageCatalogData(state) {
            if ('catalogInfo' in window.localStorage &&  window.localStorage.getItem('catalogInfo').length !== 0) {
                state.catalogList = JSON.parse(window.localStorage.getItem('catalogInfo')).catalogList;
                state.error = JSON.parse(window.localStorage.getItem('catalogInfo')).error;
                state.formValues = JSON.parse(window.localStorage.getItem('catalogInfo')).formValues;
            }
        }
    }
});

export const fetchCatalogData = (token, formValues) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                `http://commerce.intersport-rent.local/api/catalog/${formValues.shop}?startDate=${formValues.dateA}&endDate=${formValues.dateD}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                dispatch(catalogActions.addError(await response.json()));
            }else{
                const catalogData = await response.json();
                dispatch(catalogActions.addCatalog(catalogData));
            }
        };
        await fetchData();
        dispatch(catalogActions.addCat());
    };
};

export const catalogActions = catalogSlice.actions;
export default catalogSlice.reducer;
