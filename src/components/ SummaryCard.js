import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import globalVariables from "../store/state";
import {notificationActions} from "../store/notif";
import {toast} from "react-toastify";
import {cartActions} from "../store/cart";
import {catalogActions} from "../store/catalog";
import {authActions} from "../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const SummaryCard = ({onChangeStep}) => {

    const cart = useSelector((state) => state.cart);
    const price = useSelector((state) => state.cart.price);
    const token = useSelector((state) => state.auth.access_token);
    const values = useSelector((state) => state.catalog.formValues);
    const dispatch = useDispatch();
    const history = useHistory();
    const shops = useSelector((state) => state.shop.shops);

    const getShopName = (id) => {
        if (id === null){
            return "Magasin";
        }
        for(let i= 0; i < shops.shops?.length; i++){
            if (shops.shops[i].id === id){
                return(shops.shops[i].name);
            }
        }
    };

    const handleSubmit = () => {
        const fetchData = async () => {
            const response = await fetch(
                globalVariables.baseUrl + `bookings`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    },
                    body: JSON.stringify(cart.booking)
                });

            if (!response.ok) {
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })).then(res => {
                    dispatch(notificationActions.addNotification({
                        color: "red",
                        message: res.data.message
                    }));
                    toast.error(res.data.message, {position: toast.POSITION.TOP_CENTER,
                        autoClose: 8000});
                    dispatch(notificationActions.setStorageNotificationData());
                });

            }else{
                await window.localStorage.removeItem('cartInfo');
                dispatch(notificationActions.addNotification({
                    color: "blue",
                    message: "Réservation crée"
                }));
                toast.success("Réservation crée", {position: toast.POSITION.TOP_CENTER,
                    autoClose: 8000});
                dispatch(notificationActions.setStorageNotificationData());
                dispatch(cartActions.clearCart());
                dispatch(catalogActions.clearCatalog());
                window.localStorage.clear();
                dispatch(authActions.setStorageAuthData());
                history.push('/dashboard');
            }
        };
        fetchData();
    };

    return (
        <>
            <span className="span">-- Récapitulatif de la commande --</span>
            <Container fluid style={{width:"85%", marginTop:"10px"}}>
                <Row>
                    <Col lg="12" sm="12">
                        <Card className="card-stats" style={{border:"1px solid blue"}}>
                            <Card.Body>
                                <Row style={{fontSize:"1.4em", color:"black", marginLeft:"15px"}}>
                                    <Col lg="4" sm="4">
                                        <p className="recap">Magasin: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{getShopName(parseInt(values.shop))}</span></p>
                                    </Col>
                                    <Col lg="4" sm="4">
                                        <p className="recap">1er jour de ski: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{values.dateA}</span></p>
                                    </Col>
                                    <Col lg="4" sm="4">
                                        <p className="recap">Dernier jour: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{values.dateD}</span></p>
                                    </Col>
                                </Row>
                                <hr style={{color:"blue"}}/>
                                <Row>
                                    <Col lg="12" sm="12" style={{color:"gray", fontSize:"1.3em"}}>
                                        <span>Infos Client</span>
                                    </Col>
                                </Row>
                                <Row style={{fontSize:"1.4em", color:"black", marginLeft:"15px", marginTop:"15px"}}>
                                    <Col lg="3" sm="3">
                                        <p className="recap">Nom: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{cart.booking.bookingDetails.customer.firstname}  {cart.booking.bookingDetails.customer.lastname}</span></p>
                                    </Col>
                                    <Col lg="3" sm="3">
                                        <p className="recap">Sexe: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{cart.booking.bookingDetails.customer.gender}</span></p>
                                    </Col>
                                    <Col lg="3" sm="3">
                                        <p className="recap">Email: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{cart.booking.bookingDetails.customer.email}</span></p>
                                    </Col>
                                    <Col lg="3" sm="3">
                                        <p className="recap">Tel: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{cart.booking.bookingDetails.customer.phone}</span></p>
                                    </Col>
                                </Row>
                                <hr style={{color:"blue"}}/>
                                <Row>
                                    <Col lg="12" sm="12" style={{color:"gray", fontSize:"1.3em"}}>
                                        <span>Vous avez <span  style={{fontSize:"1.2em", color:"red"}}>{cart.cart.length} </span>produit(s)</span>
                                    </Col>
                                </Row>
                                {
                                    cart.booking.bookingProducts.map((product, index) => {
                                        return(
                                            <div key={index}>
                                                <Row style={{fontSize:"1.4em", color:"black", marginLeft:"15px", marginTop:"15px"}}>
                                                    <Col lg="3" sm="3">
                                                        <p className="recap">Nom: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{product.customerDetails.name}</span></p>
                                                    </Col>
                                                    <Col lg="3" sm="3">
                                                        <p className="recap">Age: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{product.customerDetails.age}</span></p>
                                                    </Col>
                                                    <Col lg="3" sm="3">
                                                        <p className="recap">Sexe: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{product.customerDetails.gender}</span></p>
                                                    </Col>
                                                    <Col lg="3" sm="3">
                                                        <p className="recap">Poids: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{product.customerDetails.weight}</span></p>
                                                    </Col>
                                                    <Col lg="3" sm="3">
                                                        <p className="recap">Taille: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{product.customerDetails.height}</span></p>
                                                    </Col>
                                                    <Col lg="3" sm="3">
                                                        <p className="recap">Pointure: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{product.customerDetails.shoesSize}</span></p>
                                                    </Col>
                                                    <Col lg="3" sm="3">
                                                        <p className="recap">Prix: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{product.price}</span></p>
                                                    </Col>
                                                </Row>
                                                {
                                                    product.optionalItems.length !== 0?  <Row>
                                                        <Col lg="12" sm="12" style={{color:"gray", fontSize:"1.3em"}}>
                                                            <span style={{marginLeft:"100px", color:"lightblue"}}>Vous avez ajouté <span  style={{fontSize:"1.2em", color:"blue"}}>{product.optionalItems.length} </span>produit(s) optionnel(s)</span>
                                                        </Col>
                                                    </Row>: <></>
                                                }
                                                <hr/>
                                            </div>
                                        )
                                    })
                                }
                                <Row>
                                    <Col lg="12" sm="12" style={{color:"gray", fontSize:"1.3em"}}>
                                        <span  style={{marginLeft:"100px", color:"lightblue"}}>Vous avez ajouté <span  style={{fontSize:"1.2em", color:"blue"}}>{cart.booking.bookingServices.length} </span>services(s)</span>
                                    </Col>
                                </Row>
                                <hr style={{color:"blue"}}/>
                                <Row>
                                    <Col lg="12" sm="12" style={{color:"gray", fontSize:"1.3em"}}>
                                        <span>Infos Réservation</span>
                                    </Col>
                                </Row>
                                <Row style={{fontSize:"1.4em", color:"black", marginLeft:"15px", marginTop:"15px"}}>
                                    <Col lg="4" sm="4">
                                        <p className="recap">N° Réservation: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{cart.booking.bookingDetails.number}</span></p>
                                    </Col>
                                    <Col lg="4" sm="4">
                                        <p className="recap">Code Promo: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{cart.booking.bookingDetails.discountCode}</span></p>
                                    </Col>
                                    <Col lg="4" sm="4">
                                        <p className="recap">TOTAL: <span style={{fontSize:"0.8em", color:"black", marginLeft:"15px"}}>{price.toFixed(2)} €</span></p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col lg="2">
                    <button className="btn_Prev" onClick={() => onChangeStep(2)}>Retour</button>
                </Col>
                <Col lg="8">
                </Col>
                <Col lg="2">
                    <button className="btn_Next" onClick={handleSubmit}>Réserver</button>
                </Col>
            </Row>
        </>
    );
};

export default SummaryCard;
