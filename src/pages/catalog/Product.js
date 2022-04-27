import React, {useEffect} from 'react';
import {cartActions} from "../../store/cart";
import {notificationActions} from "../../store/notif";
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {shopActions} from "../../store/shop";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import globalVariables from "../../store/state";
toast.configure();

const Product = () => {

    const dispatch = useDispatch();
    const product = useSelector((state) => state.shop.product);
    const [price, setPrice] = React.useState(product.basePrice);
    const [quantity, setQuantity] = React.useState(1);
    const [toPrice, setToPrice] = React.useState("");
    const history = useHistory();
    const date = new Date();


    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    const addProduct = (product) => {
        const message = quantity.toString() + " Produit(s) ajouté(s) le " + date.getDate().toString() + '/' + date.getMonth().toString() + ' à ' + date.getHours().toString() + "H";
        dispatch(cartActions.addItem([product, quantity, price, [], []]));
        dispatch(cartActions.addPrice([price, quantity]));
        dispatch(notificationActions.addNotification({
            color: "lightblue",
            message: message
        }));
        toast.info(message, {position: toast.POSITION.TOP_CENTER,
            autoClose: 8000});
        dispatch(cartActions.setStorageCartData());
        dispatch(notificationActions.setStorageNotificationData());
        history.push('/catalogue');
    };

    const handlePriceChange = (e) => {
        setToPrice(e.target.value)
    };

    useEffect(() => {
        dispatch(shopActions.setStorageShopData());
    });

    return (
        <>
            <div>
                <div className="line">
                    <button id='close' onClick={() => {history.push('/catalogue'); dispatch(shopActions.removeProduct())}}>close</button>
                    <hr/>
                </div>
                <div className="content">
                    <div className="content mt-5 cart1">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row mb-3">
                                    <div className="form-group col-md-4 mt-4">
                                        <p className="text">{product.name}</p>
                                        <hr/>
                                        <img  className="card_prod" src={globalVariables.imageUrl + product.image} alt={product.code} height="250px" width="100%"/>
                                    </div>
                                    <div className="form-group col-md-2 mt-4">
                                    </div>
                                    <div className="form-group col-md-6 mt-4">
                                        <div className="row mb-3">
                                            <div className="form-group col-md-12 prod">
                                                <span className="span_prod1">Prix:</span> {price.toFixed(2)} €
                                            </div>
                                            <div className="form-group col-md-12 prodQ">
                                                <select className="select" defaultValue="1" onChange={handleChange}>
                                                    {[1,2,3,4,5,6,7,8,9,10].map((x, i) =>
                                                        <option value={x} key={i} >{x}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order_content">
                        <div className="row total">
                            <div className="col-sm-12 tot">
                                <TextField className="span_code" label="Prix" variant="filled" name="prix" onChange={(e) => handlePriceChange(e)}/>
                            </div>
                            <div className="col-sm-12">
                                <button className="btn btn-primary btn_total" onClick={() => addProduct(product)}>Ajouter à mon panier</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
