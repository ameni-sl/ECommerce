import {createSlice} from "@reduxjs/toolkit";

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
    orders: []
};

const orderSlice = createSlice({
    name: 'orders',
    initialState: initialOrderState,
    reducers:{
        addOrderCount(state, action) {
            state.count = action.payload;
        },
        addOrdersCountStat(state, action) {
            for(let i=0; i<action.payload.length; i++){
                state.ordersCount.unshift(parseInt(action.payload[i].Count));
            }
        },
        addOrders(state, action) {
            state.reservations = action.payload;
        },
        addAllOrders(state, action) {
            state.orders = action.payload;
        },
        addOrdersStat(state, action) {
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

        },
        setStorageOrdersData(state) {
            window.localStorage.setItem('ordersInfo', JSON.stringify(state));
        },
        getStorageOrdersData(state) {
            if ('ordersInfo' in window.localStorage &&  window.localStorage.getItem('ordersInfo').length !== 0) {
                state.count = JSON.parse(window.localStorage.getItem('ordersInfo')).count;
                state.reservations = JSON.parse(window.localStorage.getItem('ordersInfo')).reservations;
                state.ordersStat = JSON.parse(window.localStorage.getItem('ordersInfo')).ordersStat;
                state.ordersCount = JSON.parse(window.localStorage.getItem('ordersInfo')).ordersCount;
                state.orders = JSON.parse(window.localStorage.getItem('ordersInfo')).orders;
            }
        }
    }
});

export const fetchCountOrderData = (token) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'http://commerce.intersport-rent.local/api/bookingsCount', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                throw new Error('Could not fetch orders count data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const orderCountData = await fetchData();
            dispatch(
                orderActions.addOrderCount(orderCountData)
            );
        } catch (error) {
            console.log('error');
        }
    };
};

export const fetchOrdersData = (token) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'http://commerce.intersport-rent.local/api/bookings?limit=10', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                throw new Error('Could not fetch orders data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const ordersData = await fetchData();
            dispatch(
                orderActions.addOrders(ordersData)
            );
        } catch (error) {
            console.log('error');
        }
    };
};

export const fetchOrderStatData = (token) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'http://commerce.intersport-rent.local/api/bookingsStat', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                throw new Error('Could not fetch ordersStat data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const ordersStatData = await fetchData();
            dispatch(
                orderActions.addOrdersStat(ordersStatData)
            );
        } catch (error) {
            console.log('error');
        }
    };
};
export const fetchOrderCountStatData = (token) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'http://commerce.intersport-rent.local/api/bookingsCountStat', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                throw new Error('Could not fetch ordersCountStat data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const ordersCountStatData = await fetchData();
            dispatch(
                orderActions.addOrdersCountStat(ordersCountStatData)
            );
        } catch (error) {
            console.log('error');
        }
    };
};

export const fetchAllOrdersData = (token) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'http://commerce.intersport-rent.local/api/bookings', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });

            if (!response.ok) {
                throw new Error('Could not fetch orders data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const ordersData = await fetchData();
            dispatch(
                orderActions.addAllOrders(ordersData)
            );
        } catch (error) {
            console.log('error');
        }
    };
};

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
