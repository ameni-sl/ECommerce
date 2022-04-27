import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {shopActions} from "../../store/shop";
import {useHistory} from "react-router-dom";
import {Card, Col, Container, Row} from "react-bootstrap";
import {notificationActions} from "../../store/notif";
import {toast} from "react-toastify";
import globalVariables from "../../store/state";

const UpdatedOrder = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.orders.order);
    const token = useSelector((state) => state.auth.access_token);
    let booking = {
        bookingDetails: {
            customer : {
                firstname : order.bookingDetails.customer.firstName,
                lastname : order.bookingDetails.customer.lastName,
                gender : " ",
                email : " ",
                phone : " "
            },
            number : order.bookingDetails.number,
            pickUpDate : order.bookingDetails.pickUpDate,
            returnDate : order.bookingDetails.returnDate,
            discountCode : order.bookingDetails.discountCode,
            shopId: order.bookingDetails.shopId
        },
        bookingProducts: [
            {
                customerDetails:{
                    name: order.bookingProducts[0].customerDetails.name,
                    height: "",
                    shoesSize: "",
                    weight: "",
                    gender: "",
                    age: ""
                },
                id: order.bookingProducts[0].id,
                price: order.bookingProducts[0].price,
            },
        ],
        bookingServices: {}
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        booking.bookingDetails.number = value;
        console.log(booking)
    };

    const handleSubmit = () => {
        const fetchData = async () => {
           const response = await fetch(
                globalVariables.baseUrl + `bookings/${order.bookingDetails.id}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    },
                    body: JSON.stringify(booking)
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
                dispatch(notificationActions.addNotification({
                    color: "blue",
                    message: "Réservation modifiée"
                }));
                toast.success("Réservation modifiée", {position: toast.POSITION.TOP_CENTER,
                    autoClose: 8000});
                dispatch(notificationActions.setStorageNotificationData());
                history.push('/commandes');
            }
        };
        fetchData();
    };

    return (
        <>
            <div className="line">
                <button id='close' onClick={() => {history.push('/commandes'); dispatch(shopActions.removeProduct())}}>close</button>
                <hr/>
            </div>
            <span className="span">Détails Réservations:</span>
            <Container fluid style={{width:"85%"}}>
                <Row>
                    <Col lg="12" sm="12">
                        <Card className="card-stats" style={{border:"1px solid lightblue", marginTop:"15px", height:"200px"}}>
                            <Card.Body>
                                <Row>
                                    <Col lg="6" style={{marginBottom:"30px"}}>
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="number"  placeholder={order.bookingDetails.number} onChange={(e) => handleChange(e)} required/>
                                                <div className="underline"></div>
                                                <span style={{color:"gray", fontSize:"12px"}}>N° Réservation</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="6">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="discountCode"  placeholder={order.bookingDetails.discountCode} onChange={handleChange} required/>
                                                <div className="underline"></div>
                                                <span style={{color:"gray", fontSize:"12px"}}>Code Promotion</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="6">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="shopId"  placeholder={order.bookingDetails.shopId} onChange={handleChange} required/>
                                                <div className="underline"></div>
                                                <span style={{color:"gray", fontSize:"12px"}}>Magazin</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="3">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="pickUpDate"  placeholder={order.bookingDetails.pickUpDate} onChange={handleChange} required/>
                                                <div className="underline"></div>
                                                <span style={{color:"gray", fontSize:"12px"}}>Date d'arrivée</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="3">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="returnDate"  placeholder={order.bookingDetails.returnDate} onChange={handleChange} required/>
                                                <div className="underline"></div>
                                                <span style={{color:"gray", fontSize:"12px"}}>Date de départ</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <span className="span">Détails Client:</span>
            <Container fluid style={{width:"85%"}}>
                <Row>
                    <Col lg="12" sm="12">
                        <Card className="card-stats" style={{border:"1px solid lightblue", marginTop:"15px"}}>
                            <Card.Body>
                                <Row>
                                    <Col lg="6" style={{marginBottom:"30px"}}>
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="firstName"  placeholder={order.bookingDetails.customer.firstName} onChange={handleChange} required/>
                                                <div className="underline"></div>
                                                <span style={{color:"gray", fontSize:"12px"}}>Prénom</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="6">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="lastName"  placeholder={order.bookingDetails.customer.lastName} onChange={handleChange} required/>
                                                <div className="underline"></div>
                                                <span style={{color:"gray", fontSize:"12px"}}>Nom</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col lg="10">
                </Col>
                <Col lg="1">
                    <button style={{backgroundColor:"blue", width:"100%", borderRadius:"15px", color:"white", border:"1px solid lightblue"}} onClick={handleSubmit}>Editer</button>
                </Col>
                <Col lg="1">
                </Col>
            </Row>
        </>
    );
};

export default UpdatedOrder;
