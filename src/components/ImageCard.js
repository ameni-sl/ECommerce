import React from 'react';
import {Col, Row} from "react-bootstrap";
import globalVariables from "../store/state";

const ImageCard = ({product}) => {

    return (
        <Col lg="2" sm="6">
            <Col className="icon-big text-center icon-warning">
                {
                    product.includedItems.length === 0? <img  className="card_prod" src={globalVariables.imageUrl + product.image} alt={product.code} height="250px" width="100%"/>:
                        <img  className="card_prod" src={globalVariables.imageUrl + product.includedItems[0].image} alt={product.code} height="250px" width="100%"/>
                }
                <Row>
                    <Col className="title_cart">
                        <span style={{fontSize:"0.8em"}}>{product.name} </span>
                    </Col>
                    <Col style={{color:"red" , fontSize:"30px"}}>
                        <span>{product.basePrice.toFixed(2)} €</span>
                    </Col>
                </Row>
            </Col>
        </Col>
    );
};

export default ImageCard;
