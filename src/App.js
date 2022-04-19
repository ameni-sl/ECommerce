import React, {useEffect} from 'react';
import Login from "./pages/Login";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import routes from "./routes";
import { orderActions } from "./store/orders";
import {authActions} from "./store/auth";
import {cartActions} from "./store/cart";
import {notificationActions} from "./store/notif";
import {shopActions} from "./store/shop";
import {catalogActions} from "./store/catalog";
import Product from "./components/Product";
import Cart from "./components/Cart";

const App = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);


    useEffect(() => {
        dispatch(authActions.getStorageAuthData());
        dispatch(cartActions.getStorageCartData());
        dispatch(catalogActions.getStorageCatalogData());
        dispatch(notificationActions.getStorageNotificationData());
        dispatch(orderActions.getStorageOrdersData());
        dispatch(shopActions.getStorageShopData());
    }, []);


    return (
        <BrowserRouter>
            <Switch>
                {!auth.isLogged &&
                    <Route path="/" exact component={Login} />
                }
                {auth.isLogged &&
                    <>
                        <Route path="/catalogue/:id" component={Product} />
                        <Route path="/cart" component={Cart} />
                        {
                            routes.map((prop, key) => {
                                return (
                                    <Route
                                        key={key}
                                        path={prop.path}
                                        component={prop.component}
                                    />
                                );
                            })
                        }
                    </>
                }
                {/*<Route path="*" component={!auth.isLogged? Login: Dashboard} />*/}
            </Switch>
        </BrowserRouter>
    );
};

export default App;
