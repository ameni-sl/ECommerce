import {createSlice} from "@reduxjs/toolkit";
import {fetchData} from "../response";

const initialOrderState = {

    count: [{
        CountOrders: 0,
        CountCustomers: 0,
        CountShops: 0,
        CountPromotions: 0,
    }],
    reservations: [],
    ordersStat: [[], [], []],
    ordersCount: [],
    order: {},
};

const orderSlice = createSlice({
    name: 'orders',
    initialState: initialOrderState,
    reducers:{
        addOrderCount(state, action) {
            state.count = action.payload;
        },
        addOrdersCountStat(state, action) {
            state.ordersCount = [];
            for(let i=0; i<action.payload.length; i++){
                state.ordersCount.unshift(parseInt(action.payload[i].Count));
            }
        },
        addOrders(state, action) {
            state.reservations = action.payload;
        },
        addOrder(state, action) {
            state.order = action.payload;
        },
        addAllOrders(state, action) {
            state.orders = action.payload;
        },
        addOrdersStat(state, action) {
            state.ordersStat = [[], [], []];
            const dict1 = { '01': '0','02': '0','03': '0','04': '0','05': '0','06': '0','07': '0','08': '0','09': '0','10': '0','11': '0','12': '0'};
            const dict2 = { '01': '0','02': '0','03': '0','04': '0','05': '0','06': '0','07': '0','08': '0','09': '0','10': '0','11': '0','12': '0'};
            const dict3 = { '01': '0','02': '0','03': '0','04': '0','05': '0','06': '0','07': '0','08': '0','09': '0','10': '0','11': '0','12': '0'};
            let year= new Date().getFullYear();
            for(let i=0; i<action.payload.length; i++){
                if(action.payload[i].Year == year-1) {
                    dict1[action.payload[i].Month] = action.payload[i].Count;
                }else if(action.payload[i].Year == year){
                    dict2[action.payload[i].Month] = action.payload[i].Count;
                }else {
                    dict3[action.payload[i].Month] = action.payload[i].Count;
                }
            }
            for(let key in dict1){
                state.ordersStat[0].push(parseInt(dict1[key]));
            }
            for(let key in dict2){
                state.ordersStat[1].push(parseInt(dict2[key]));
            }
            for(let key in dict3){
                state.ordersStat[2].push(parseInt(dict3[key]));
            }
        }
    }
});

export const fetchCountOrderData = (token) => {
    return async (dispatch) => {
        const response = await fetchData(token, 'bookingsCount', 'GET');
        if (!response.ok) {
            throw new Error('Could not fetch data!');
        }
        const orderCountData = await response.json();
        dispatch(
            orderActions.addOrderCount(orderCountData)
        );
    };
};

export const fetchOrderStatData = (token) => {
    return async (dispatch) => {
        const response = await fetchData(token, 'bookingsStat', 'GET');
        if (!response.ok) {
            throw new Error('Could not fetch data!');
        }
        const ordersStatData = await response.json();
        await dispatch(orderActions.addOrdersStat(ordersStatData));
    };
};
export const fetchOrderCountStatData = (token) => {
    return async (dispatch) => {
        const response = await fetchData(token, 'bookingsCountStat', 'GET');
        if (!response.ok) {
            throw new Error('Could not fetch data!');
        }
        const ordersCountStatData = await response.json();
        dispatch(orderActions.addOrdersCountStat(ordersCountStatData));
    };
};


export const fetchOrdersData = (token) => {
    return async (dispatch) => {
        const response = await fetchData(token, 'bookings?limit=10', 'GET');
        if (!response.ok) {
            throw new Error('Could not fetch data!');
        }
        const ordersData = await response.json();
        dispatch(
            orderActions.addOrders(ordersData)
        );
    };
};

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
