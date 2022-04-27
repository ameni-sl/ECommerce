import { configureStore } from '@reduxjs/toolkit';

import authReducer from "./auth";
import ordersReducer from './orders';
import catalogReducer from './catalog';
import cartReducer from './cart';
import notificationReducer from './notif';
import shopReducer from './shop';

const store = configureStore({
    reducer: { auth: authReducer, orders: ordersReducer, catalog: catalogReducer, cart: cartReducer, notification: notificationReducer, shop: shopReducer},
});

export default store;
