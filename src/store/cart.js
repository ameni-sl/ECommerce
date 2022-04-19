import {createSlice} from "@reduxjs/toolkit";

const initialCartState = {
    cart: [],
    price: 0,
    booking: {
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
        bookingServices: {}
    }
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
            const bookProduct = { customerDetails:{ name: "", height: "", shoesSize: "", weight: "", gender: "", age: ""}, id: null, price: null};
            const product = action.payload;
            state.cart.push(product);
            state.price = state.price + product.basePrice;
            bookProduct.id = product.id;
            bookProduct.price = product.basePrice;
            state.booking.bookingProducts.push(bookProduct);
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
        setStorageCartData(state) {
            window.localStorage.setItem('cartInfo', JSON.stringify(state));
        },
        getStorageCartData(state) {
            if ('cartInfo' in window.localStorage &&  window.localStorage.getItem('cartInfo').length !== 0) {
                state.cart = JSON.parse(window.localStorage.getItem('cartInfo')).cart;
                state.price = JSON.parse(window.localStorage.getItem('cartInfo')).price;
            }
        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
