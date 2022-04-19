import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import routes from "../routes";
import Navbar from "./NavBar";
import sidebarImage from "../assets/img/img.jpg";
import {cartActions} from "../store/cart";
import {notificationActions} from "../store/notif";
import {useDispatch} from "react-redux";
import logo from "../assets/v-shape-v6.jpg";
import {TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Product = (props) => {

    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);
    const [product, setProduct] = React.useState(props.location.product.product);
    const dispatch = useDispatch();
    const [price, setPrice] = React.useState(product.basePrice);
    const [total, setTotal] = React.useState(product.basePrice);
    const [priceService, setPriceService] = React.useState(0);
    const [pricePack, setPricePack] = React.useState(product.basePrice);
    const [tab, setTab] = React.useState([]);
    const [quantity, setQuantity] = React.useState(1);
    const history = useHistory();


    const [state, setState] = useState(false);
    const [optionalItemsEquipment, setOptionalItemsEquipment] = useState([]);
    const [optionalItemsService, setOptionalItemsService] = useState([]);

    const toggleChangeEquip = (e, prix) => {
        if (e.target.checked){
            let pricePak = pricePack + prix;
            let pricetOT = total + prix;
            setTotal(pricetOT);
            setPricePack(pricePak);
         }else{
            let pricePak = pricePack - prix;
            let pricetOT = total - prix;
            setTotal(pricetOT);
            setPricePack(pricePak);
        }
    }

    const toggleChangeServ = (e, prix) => {
        if (e.target.checked){
            let priceSer = priceService + prix;
            let pricetOT = total + prix;
            setTotal(pricetOT);
            setPriceService(priceSer);
        }else{
            let priceSer = priceService - prix;
            let pricetOT = total - prix;
            setTotal(pricetOT);
            setPriceService(priceSer);
        }
    }

    const handleChange = (e) => {
      setQuantity(e.target.value)
    }

    const addProduct = (product) => {
        dispatch(cartActions.addItem(product));
        dispatch(notificationActions.addNotification({
            typeAlert: "primary",
            message: "Un produit est ajouté à votre panier"
        }));
    };

    useEffect(() => {
        setOptionalItemsEquipment(product.optionalItems?.filter((x) =>  x.productItemType === "equipment"));
        setOptionalItemsService(product.optionalItems?.filter((x) =>  x.productItemType === "service"));
        setTab(Array.from(new Array(optionalItemsEquipment.length), x => true));
    });

    useEffect(() => {
        setProduct(props.location.product.product);
    },[]);

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <Navbar />
                    <div className="line">
                        <button id='close' onClick={() => {history.push('/catalogue') }}>close</button>
                        <hr/>
                    </div>
                    <div className="content">
                        <div className="content_product">
                            <p className="text">{product.name}</p>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <img  className="card_prod" src={"http://commerce.intersport-rent.local/media/image/" + product.image} alt={product.code} height="250px" width="100%"/>
                                        </div>
                                        <div className="col-sm-6">
                                            {
                                                optionalItemsEquipment.map((prod, index) => {
                                                    return(
                                                        <div className="row" key={index}>
                                                            <div className="col-sm-12">
                                                                <div className="box-prod">
                                                                    <div className="row">
                                                                        <div className="col-sm-4">
                                                                            <img  className="card_prodItem" src={"http://commerce.intersport-rent.local/media/image/" + product.image} alt={product.code} height="100px" width="100%"/>
                                                                        </div>
                                                                        <div className="col-sm-8">
                                                                            <p>{prod.name}</p>
                                                                            <label className="checkbox_prod">
                                                                                <input type="checkbox"
                                                                                       defaultChecked={state}
                                                                                       onChange={(e) => toggleChangeEquip(e, prod.basePrice)}
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
                                    </div>
                                    <div className="price">
                                        <span className="span_prod">Prix:</span> {price.toFixed(2)} €
                                        <select className="select" defaultValue="1" onChange={handleChange}>
                                            {[1,2,3,4,5,6,7,8,9,10].map((x, i) =>
                                                <option value={x} key={i} >{x}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="total-price">
                                        <span className="span_prod">SOUS-TOTAL PACK:</span> <span className="label_prod">{pricePack.toFixed(2)} €</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 ">
                                    <div className="prod_service">
                                        <span className="span">Services recommandés</span>
                                        {
                                            optionalItemsService.map((prod, index) => {
                                                return(
                                                    <div className="row service" key={index}>
                                                        <div className="col-sm-12">
                                                            <div>
                                                                <div className="row">
                                                                    <div className="col-sm-8">
                                                                        <p>{prod.name}</p>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <label className="checkbox_prod1">
                                                                            <input type="checkbox"
                                                                                   defaultChecked={state}
                                                                                   onChange={(e) => toggleChangeServ(e, prod.basePrice)}
                                                                            /><span className="label_prod">{prod.basePrice.toFixed(2)} €</span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-sm-1">
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
                                    <div className="total-service">
                                        <span className="span_prod">SOUS-TOTAL SERVICES:</span> <span className="label_prod">{priceService.toFixed(2)} €</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order_content">
                            <div className="total">
                                <span className="span_prod">TOTAL:</span> <span className="label_prod">{total.toFixed(2)} €</span>
                                <TextField className="span_code" label="Code Promo" variant="filled" name="discountCode" />
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
