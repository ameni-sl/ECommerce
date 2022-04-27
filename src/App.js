import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import routes from "./routes";
import {authActions} from "./store/auth";
import {cartActions} from "./store/cart";
import {notificationActions} from "./store/notif";
import {shopActions} from "./store/shop";
import {catalogActions} from "./store/catalog";
import Login from "./pages/Login";
import Product from "./pages/catalog/Product";
import Cart from "./pages/catalog/Cart";
import ProductWithServices from "./pages/catalog/ProductWithServices";
import ProductWithoutServices from "./pages/catalog/ProductWithoutServices";
import UpdatedOrder from "./pages/orders/UpdatedOrder";
import axios from "axios";
import globalVariables from "./store/state";

const App = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(authActions.getStorageAuthData());
        dispatch(cartActions.getStorageCartData());
        dispatch(catalogActions.getStorageCatalogData());
        dispatch(notificationActions.getStorageNotificationData());
        dispatch(shopActions.getStorageShopData());
    }, []);

    useEffect(() => {
        setTimeout(() => {
            axios
                .get(globalVariables.baseUrl + `oauth/v2/token?client_id=${auth.client_id}&client_secret=${auth.client_secret}&grant_type=password&username=${auth.username}&password=${auth.password}`)
                .then((response) => {
                    dispatch(authActions.setToken(response.data.access_token));

                    const fetchOrderData = async () => {
                        await dispatch(authActions.setStorageAuthData());
                    }
                    fetchOrderData();
                })
                .catch(() => {
                })
        },3e+6);
    });

    return (
        <BrowserRouter>
            <Switch>
                {!auth.isLogged &&
                    <Route path="/" exact component={Login} />
                }
                {auth.isLogged &&
                    <>
                        <Route path="/product_services" component={ProductWithServices} />
                        <Route path="/product_without_services" component={ProductWithoutServices} />
                        <Route path="/product" component={Product} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/edit" component={UpdatedOrder} />
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
