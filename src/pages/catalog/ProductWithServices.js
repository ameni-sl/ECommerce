import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {cartActions} from "../../store/cart";
import {notificationActions} from "../../store/notif";
import {shopActions} from "../../store/shop";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import globalVariables from "../../store/state";
toast.configure();

const ProductWithServices = () => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.shop.product);
    const [price, setPrice] = useState(product.basePrice);
    const [total, setTotal] = useState(product.basePrice);
    const [priceService, setPriceService] = useState(0);
    const [pricePack, setPricePack] = useState(product.basePrice);
    const [quantity, setQuantity] = useState(1);
    const history = useHistory();
    const date = new Date();
    const [state, setState] = useState(false);
    const [optionalItemsEquipment, setOptionalItemsEquipment] = useState([]);
    const [optionalItemsService, setOptionalItemsService] = useState([]);
    const [item, setItem] = useState([]);
    const [services, setServices] = useState([]);


    const toggleChangeEquip = (e, prix, id) => {
        if (e.target.checked){
            let pricePak = pricePack + prix;
            let pricetOT = total + prix;
            setTotal(pricetOT);
            setPricePack(pricePak);
            item.push({id: id, price: prix })
        }else{
            let pricePak = pricePack - prix;
            let pricetOT = total - prix;
            setTotal(pricetOT);
            setPricePack(pricePak);
            setItem(item.filter((x) =>  x.id !== id));
        }
    };

    const toggleChangeServ = (e, prix, id) => {
        if (e.target.checked){
            let priceSer = priceService + prix;
            let pricetOT = total + prix;
            setTotal(pricetOT);
            setPriceService(priceSer);
            services.push({id: id, price: prix })
        }else{
            let priceSer = priceService - prix;
            let pricetOT = total - prix;
            setTotal(pricetOT);
            setPriceService(priceSer);
            setServices(item.filter((x) =>  x.id !== id));
        }
    };

    const handleChange = (e) => {
        setQuantity(e.target.value)
    };

    const addProduct = (product) => {
        const message = quantity.toString() + " Produit(s) ajouté(s) le " + date.getDate().toString() + '/' + date.getMonth().toString() + ' à ' + date.getHours().toString() + "H";
        dispatch(cartActions.addItem([product, quantity, total, item, services]));
        dispatch(cartActions.addPrice([total, quantity]));
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

    useEffect(() => {
        dispatch(shopActions.setStorageShopData());
        setOptionalItemsEquipment(product.optionalItems?.filter((x) =>  x.productItemType === "equipment"));
        setOptionalItemsService(product.optionalItems?.filter((x) =>  x.productItemType === "service"));
    });

    return (
        <div>
            <div className="line">
                <button id='close' onClick={() => {history.push('/catalogue'); dispatch(shopActions.removeProduct())}}>close</button>
                <hr/>
            </div>
              <div className="content">
               <div className="content mt-5 cart">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row mb-3">
                            <div className="form-group col-md-2 mt-4">
                                <p className="text">{product.name}</p>
                                <hr/>
                                <img  className="card_prod" src={globalVariables.imageUrl + product.includedItems[0].image} alt={product.code} height="250px" width="100%"/>
                            </div>
                            <div className="form-group col-md-4 mt-4">
                                <div className="row mb-3">
                                    <div className="form-group col-md-10 ">
                                        <span className="span_prod">Prix:</span> {price.toFixed(2)} €
                                    </div>
                                    <div className="form-group col-md-2 ">
                                        <select className="select" defaultValue="1" onChange={handleChange}>
                                            {[1,2,3,4,5,6,7,8,9,10].map((x, i) =>
                                                <option value={x} key={i} >{x}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <hr/>
                                {
                                    optionalItemsEquipment.map((prod, index) => {
                                        return(
                                            <div key={index} className="content">
                                                <div className="row" >
                                                    <div className="col-sm-4 mt-1">
                                                        <img  className="card_prodItem" src={globalVariables.imageUrl + prod.image} alt={prod.code} height="100px" width="100%"/>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="row">
                                                            <div className="col-sm-12 mt-4">
                                                                <p>{prod.name}</p>
                                                            </div>
                                                            <div className="col-sm-12 mt-2">
                                                                <label className="checkbox_prod">
                                                                    <input type="checkbox"
                                                                           defaultChecked={state}
                                                                           onChange={(e) => toggleChangeEquip(e, prod.basePrice, prod.id)}
                                                                    /><span className="label_prod">{prod.basePrice.toFixed(2)} €</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="form-group col-md-6 mt-4 prod_service">
                                <span className="span ">Services recommandés</span>
                                {
                                    optionalItemsService.map((prod, index) => {
                                        return(
                                            <div className="row service" key={index}>
                                                <div className="form-group col-sm-12">
                                                    <div>
                                                        <div className="row">
                                                            <div className="form-group col-sm-8">
                                                                <p>{prod.name}</p>
                                                            </div>
                                                            <div className="form-group col-sm-3">
                                                                <label className="checkbox_prod1">
                                                                    <input type="checkbox"
                                                                           defaultChecked={state}
                                                                           onChange={(e) => toggleChangeServ(e, prod.basePrice, prod.id)}
                                                                    /><span className="label_prod">{prod.basePrice.toFixed(2)} €</span>
                                                                </label>
                                                            </div>
                                                            <div className="form-group col-sm-1">
                                                                <i className='bx bx-search-alt-2'></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="total-service">
                            <span className="span_prod">SOUS-TOTAL PACK:</span> <span className="label_prod">{pricePack.toFixed(2)} €</span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="total-ser">
                            <span className="span_prod">SOUS-TOTAL SERVICES:</span> <span className="label_prod">{priceService.toFixed(2)} €</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order_content">
                <div className="row total">
                    <div className="col-sm-12">
                        <div className="row total">
                            <div className="col-sm-8">
                                <span className="span_prod">TOTAL:</span>
                            </div>
                            <div className="col-sm-4">
                                <span className="label_prod">{total.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <TextField className="span_code" label="Prix" variant="filled" name="prix" />
                    </div>
                    <div className="col-sm-12">
                        <button className="btn btn-primary btn_total" onClick={() => addProduct(product)}>Ajouter à mon panier</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
};

export default ProductWithServices;
