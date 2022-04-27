import React, {useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {cartActions} from "../store/cart";
import {useDispatch, useSelector} from "react-redux";

const BookingCard = ({onChangeStep}) => {

    const cart = useSelector((state) => state.cart);
    const customer = useSelector((state) => state.cart.booking.bookingDetails.customer);
    const catalog = useSelector((state) => state.catalog.formValues);
    const initialValues = {firstname: "", lastname: "", gender: "", email: "", phone: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const initialVal = {number: "", pickUpDate: catalog.dateA, returnDate: catalog.dateD, discountCode: "", shopId: parseInt(catalog.shop), customer: cart.booking.bookingDetails.customer};
    const [formVal, setFormVal] = useState(initialVal);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();

    const handleChangeBookingDetails = (e) => {
        const {name, value} = e.target;
        setFormVal({...formVal, [name]:value});
        dispatch(cartActions.addBookDetails({...formVal, [name]:value}));
    };

    const handleChangeCustomerDetails = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
        setFormErrors({});
        dispatch(cartActions.addCustomerDetails({...customer, [name]:value}));
    };

    const validate = (values) => {
        const errors = {};
        let msg = "Ce champ est obligatoire!";
        if(!values.firstname){
            errors.firstname = msg;
        }else if(!values.lastname){
            errors.lastname = msg;
        }else if(!values.gender) {
            errors.gender = msg;
        }else if(!values.email ){
            errors.email = msg;
        }else if(!values.phone) {
            errors.phone = msg;
        }
        return errors;
    };

    return (
        <>
            <Container fluid style={{width:"85%", marginTop:"10px"}}>
                <Row>
                    <Col lg="4" sm="12" style={{marginTop:"50px"}}>
                        <Card className="card-stats" style={{paddingTop:"62px"}}>
                            <Card.Body>
                                <Row>
                                    <Col lg="12" style={{marginBottom:"8px"}}>
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="discountCode" value={formValues.discountCode} onChange={handleChangeBookingDetails}/>
                                                <div className="underline"></div>
                                                <label>Code Promo</label>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="number" value={formValues.number} onChange={handleChangeBookingDetails}/>
                                                <div className="underline"></div>
                                                <label>N° Réservation</label>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="8" sm="12">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <span className="span">-- Infos Client --</span>
                                </Row>
                                <hr style={{color:"lightgray"}}/>
                                <Row style={{marginTop:"50px"}}>
                                    <Col lg="4">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="firstname" value={formValues.firstname} onChange={handleChangeCustomerDetails}/>
                                                <div className="underline"></div>
                                                <label>Prénom</label>
                                            </div>
                                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.firstname}</span>
                                        </div>
                                    </Col>
                                    <Col lg="4">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="lastname" value={formValues.lastname} onChange={handleChangeCustomerDetails}/>
                                                <div className="underline"></div>
                                                <label>Nom</label>
                                            </div>
                                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.lastname}</span>
                                        </div>
                                    </Col>
                                    <Col lg="4">
                                        <div className="selct" style={{marginTop:"-17px", marginBottom:"50px"}}>
                                                <label>Sexe</label>
                                                <select name="gender"  defaultValue={formValues.gender} onChange={handleChangeCustomerDetails}>
                                                    <option value="" disabled>Sexe</option>
                                                    <option value="MAN">Homme</option>
                                                    <option value="WOMAN">Femme</option>
                                                </select>
                                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.gender}</span>
                                        </div>
                                    </Col>
                                    <Col lg="4">
                                        <div className="wrapp" style={{marginBottom:"40px"}}>
                                            <div className="input-data">
                                                <input type="text" name="email" value={formValues.email} onChange={handleChangeCustomerDetails}/>
                                                <div className="underline"></div>
                                                <label>Email</label>
                                            </div>
                                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.email}</span>
                                        </div>
                                    </Col>
                                    <Col lg="4">
                                        <div className="wrapp">
                                            <div className="input-data">
                                                <input type="text" name="phone" value={formValues.phone} onChange={handleChangeCustomerDetails}/>
                                                <div className="underline"></div>
                                                <label>Tel</label>
                                            </div>
                                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.phone}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col lg="2">
                    <button className="btn_Prev" onClick={() => onChangeStep(1)}>Retour</button>
                </Col>
                <Col lg="8">
                </Col>
                <Col lg="2">
                    <button className="btn_Next" onClick={() => {
                        console.log(formValues)
                        const errors = validate(formValues);
                        console.log(errors)
                        setFormErrors(errors)
                        if(Object.keys(errors).length  === 0){
                            onChangeStep(3);
                        }
                    }}>Suivant</button>
                </Col>
            </Row>
        </>
    );
};

export default BookingCard;
