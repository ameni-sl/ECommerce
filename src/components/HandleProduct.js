import React from 'react';
import {Col} from "react-bootstrap";
import {cartActions} from "../store/cart";
import {notificationActions} from "../store/notif";
import {toast} from "react-toastify";
import {shopActions} from "../store/shop";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const HandleProduct = ({product}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const removeProduct = (product) => {
        const message = "Un produit est suprimé de votre panier";
        dispatch(cartActions.deleteItem(product));
        dispatch(cartActions.setStorageCartData());
        dispatch(notificationActions.addNotification({
            color: "black",
            message: message
        }));
        toast.warn(message, {position: toast.POSITION.TOP_CENTER,
            autoClose: 8000});
        dispatch(notificationActions.setStorageNotificationData());

    }

    const  searchProduct =(product)=>{
        dispatch(cartActions.deleteItem(product));
        dispatch(cartActions.setStorageCartData());
        dispatch(shopActions.addProduct(product));
        if(product.includedItems.length === 0){
            history.push('/product');
        }else {
            const list = product.optionalItems?.filter((x) => x.productItemType === "service");
            if (list.length === 0) {
                history.push('/product_without_services');
            } else {
                history.push('/product_services');
            }
        }
    };

    return (
        <Col lg="1">
            <div className="numbers">
                <i className='bx bx-edit-alt icon_cart' onClick={() => searchProduct(product)} style={{color:"lightblue", marginRight:"20px"}}></i>
                <i className='bx bxs-trash icon_cart' onClick={() => removeProduct(product)}></i>
            </div>
        </Col>
    );
};

export default HandleProduct;
