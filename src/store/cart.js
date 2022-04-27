import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    bookingDetails: {
        customer : {
            firstname : "",
            lastname : "",
            gender : "",
            email : "",
            phone : ""
        },
        number : "" ,
        pickUpDate : "",
        returnDate : "",
        discountCode : "",
        shopId: ""
    },
    bookingProducts: [],
    bookingServices: [],
};

const initialCartState = {
    cart: [],
    price: 0,
    booking: initialState
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers:{
        addCustomerDetails(state, action) {
            state.booking.bookingDetails.customer = action.payload;
        },
        addBookDetails(state, action) {
            state.booking.bookingDetails = action.payload;
        },
        addProductDetails(state, action) {
            const i = action.payload[0];
            state.booking.bookingProducts[i].customerDetails = action.payload[1];
        },
        addItem(state, action) {
            const bookProduct = { customerDetails:{ name: "", height: "", shoesSize: "", weight: "", gender: "", age: ""}, id: null, price: null, optionalItems:null};
            for(let i=0; i< action.payload[1]; i++){
                const product = action.payload[0];
                state.cart.push(product);
                bookProduct.id = product.id;
                bookProduct.price = product.basePrice;
                bookProduct.optionalItems = action.payload[3];
                state.booking.bookingProducts.push(bookProduct);
                for(let i=0; i< action.payload[4].length; i++){
                    state.booking.bookingServices.push(action.payload[4][i]);
                }
            }
        },
        addPrice(state, action) {
            const len = state.cart.length;
            for(let i=(len -action.payload[1]); i< len; i++) {
                state.cart[i].basePrice = action.payload[0];
                state.price = state.price + action.payload[0];
            }
        },
        deleteItem(state, action) {
            const product = action.payload;
            if( state.cart.find((x) => (x.id === product.id))){
                const found = state.cart.find((x) => (x.id === product.id));
                state.price = state.price - product.basePrice;
                const index = state.cart.indexOf(found);
                state.cart.splice(index, 1)
                const found2 = state.booking.bookingProducts.find((x) => (x.id === product.id))
                const index1 = state.cart.indexOf(found2);
                state.booking.bookingProducts.splice(index1, 1)
            }

        },
        clearCart(state) {
            state.cart = [];
            state.price = 0;
            state.booking = initialState;
        },
        setStorageCartData(state) {
            window.localStorage.setItem('cartInfo', JSON.stringify(state));
        },
        getStorageCartData(state) {
            if ('cartInfo' in window.localStorage &&  window.localStorage.getItem('cartInfo').length !== 0) {
                state.cart = JSON.parse(window.localStorage.getItem('cartInfo')).cart;
                state.price = JSON.parse(window.localStorage.getItem('cartInfo')).price;
                state.booking = JSON.parse(window.localStorage.getItem('cartInfo')).booking;
            }
        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
