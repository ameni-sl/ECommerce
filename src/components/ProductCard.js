import React, {useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import UserProfile from "./UserProfile";
import ImageCard from "./ImageCard";
import HandleProduct from "./HandleProduct";
import {useSelector} from "react-redux";

const ProductCard = ({onChangeStep, cart}) => {

    const prod = useSelector((state) => state.cart.booking.bookingProducts);
    const [formValues, setFormValues] = useState(prod);
    const [formErrors, setFormErrors] = useState({});

    const validate = (values) => {
        const errors = {};
        let msg = "Ce champ est obligatoire!";
        if(!values.name){
            errors.name = msg;
        }else if(!values.height){
            errors.height = msg;
        }else if(!values.weight) {
            errors.weight = msg;
        }else if(!values.gender ){
            errors.gender = msg;
        }else if(!values.age) {
            errors.age = msg;
        }else if(!values.shoesSize) {
            errors.shoesSize = msg;
        }
        return errors;
    };

    return (
            <Container fluid>
                {
                    cart.cart?.map((product, index) => {
                        return(
                            <Row key={index}>
                                <Col lg="12" sm="12">
                                    <Card className="card-stats" style={{border:"1px solid blue"}}>
                                        <Card.Body>
                                            <Row>
                                                <ImageCard product={product}/>
                                                <Col lg="1" sm="6">
                                                </Col>
                                                <UserProfile index={index} formErrors={formErrors} setFormErrors={setFormErrors} formValues={formValues} setFormValues={setFormValues} prod={prod}/>
                                                <HandleProduct product={product}/>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                }
                <div className="row">
                    <div className="col-sm-11"></div>
                    <div className="col-sm-1">
                        <button className="btn_Next" onClick={() => {
                            const errors = validate(prod[0].customerDetails);
                            setFormErrors(errors)
                            if(Object.keys(errors).length  === 0){
                                onChangeStep(2);
                            }
                        }}>Suivant</button>
                    </div>
                </div>
           </Container>
    );
};

export default ProductCard;
