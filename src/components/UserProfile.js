import React from 'react';
import {Col, Row} from "react-bootstrap";
import {cartActions} from "../store/cart";
import {useDispatch} from "react-redux";

const UserProfile = ({index, formErrors, setFormErrors, formValues, setFormValues, prod}) => {

    const dispatch = useDispatch();

    const handleChangeProductDetails = (e, index) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormErrors({});
        setFormValues({...formValues[index], [name]:value});
        dispatch(cartActions.addProductDetails( [index,{...prod[index].customerDetails, [name]:value}]));
    };

    return (
        <>
            <Col lg="4" sm="12" style={{marginTop:"3%"}}>
                <Row>
                    <Col lg="12">
                        <div className="wrapp">
                            <div className="input-data">
                                <input type="text" name="name" value={prod[index]?.customerDetails.name} onChange={(e) => handleChangeProductDetails(e,index)} />
                                <div className="underline"></div>
                                <label>Nom</label>
                            </div>
                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.name}</span>
                        </div>
                    </Col>
                    <Col lg="12">
                        <div className="selct">
                                <label>Taille</label>
                                <select name="height" defaultValue={prod[index]?.customerDetails.height} onChange={(e) => handleChangeProductDetails(e,index)}>
                                    <option value="" disabled>Taille</option>
                                    <option value="95">&lt;=0,95</option>
                                    <option value="100">0,96m à 1m</option>
                                    <option value="105">1,01m à 1,05m</option>
                                    <option value="110">1,06m à 1,1m</option>
                                    <option value="115">1,11m à 1,15m</option>
                                    <option value="120">1,16m à 1,2m</option>
                                    <option value="125">1,21m à 1,25m</option>
                                    <option value="130">1,26m à 1,3m</option>
                                    <option value="135">1,31m à 1,35m</option>
                                    <option value="140">1,36m à 1,4m</option>
                                    <option value="145">1,41m à 1,45m</option>
                                    <option value="150">1,46m à 1,5m</option>
                                    <option value="155">1,51m à 1,55m</option>
                                    <option value="160">1,56m à 1,6m</option>
                                    <option value="165">1,61m à 1,65m</option>
                                    <option value="170">1,66m à 1,7m</option>
                                    <option value="175">1,71m à 1,75m</option>
                                    <option value="180">1,76m à 1,8m</option>
                                    <option value="185">1,81m à 1,85m</option>
                                    <option value="190">1,86m à 1,9m</option>
                                    <option value="195">1,91m à 1,95m</option>
                                    <option value="196">&gt;=1,96m</option>
                                </select>
                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.height}</span>
                        </div>
                    </Col>
                    <Col lg="12">
                        <div className="wrapp">
                            <div className="input-data">
                                <input type="number" name="weight" min="0" max="200" value={prod[index]?.customerDetails.weight} onChange={(e) => handleChangeProductDetails(e,index)}/>
                                <div className="underline"></div>
                                <label>Poids</label>
                            </div>
                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.weight}</span>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col lg="4" sm="12" style={{marginTop:"3%"}}>
                <Row>
                    <Col lg="12">
                        <div className="selct">
                                <label>Sexe</label>
                                <select name="gender" defaultValue={prod[index]?.customerDetails.gender} onChange={(e) => handleChangeProductDetails(e,index)}>
                                    <option value="" disabled>Sexe</option>
                                    <option value="MAN">Homme</option>
                                    <option value="WOMAN">Femme</option>
                                    <option value="CHILDREN">Enfant</option>
                                </select>
                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.gender}</span>
                        </div>
                    </Col>
                    <Col lg="12">
                        <div className="wrapp">
                            <div className="input-data">
                                <input type="number" name="age" min="0" max="100" value={prod[index]?.customerDetails.age} onChange={(e) => handleChangeProductDetails(e,index)}/>
                                <div className="underline"></div>
                                <label>Age</label>
                            </div>
                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.age}</span>
                        </div>
                    </Col>
                    <Col lg="12">
                        <div className="wrapp">
                            <div className="input-data">
                                <input type="number" min="20" max="60" name="shoesSize" value={prod[index]?.customerDetails.shoesSize} onChange={(e) => handleChangeProductDetails(e,index)}/>
                                <div className="underline"></div>
                                <label>Pointure</label>
                            </div>
                            <span style={{color:"red", fontSize:"0.8em"}}>{formErrors.shoesSize}</span>
                        </div>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default UserProfile;
