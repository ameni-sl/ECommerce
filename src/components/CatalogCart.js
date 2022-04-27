import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import globalVariables from "../store/state";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import HandleProduct from "./HandleProduct";

const CatalogCart = () => {

    const cart = useSelector((state) => state.cart);
    const history = useHistory();

    return (
        <Col lg="3" sm="0" style={{backgroundColor:"lightgray", height:"50%"}}>
            <Row>
                <Col lg="12">
                    <p style={{marginLeft:"30%", fontSize:"1.4em"}}>MON PANIER</p>
                </Col>
                {
                    cart.cart.length === 0? <Col lg="12">
                            <Card className="card-stats" style={{border:"1px solid gray", height:"200px"}}>
                                <Card.Body>
                                    <p style={{marginTop:"15%", marginLeft:"9%", fontSize:"1.2em", color:"lightgray"}}>Aucun produit dans votre panier</p>
                                </Card.Body>
                            </Card>
                        </Col>:
                        cart.cart.map((product, index) => {
                            return (
                                <Col lg="12" key={index}>
                                    <Card className="card-stats" style={{border:"1px solid gray"}}>
                                        <Card.Body>
                                            <Row>
                                                <Col xs="5">
                                                    <div className="icon-big text-center icon-warning">
                                                        {
                                                            product.includedItems[0]? <img src={globalVariables.imageUrl + product.includedItems[0].image} className="card-img-top" alt={product.name}/>:
                                                                <img src={globalVariables.imageUrl + product.image} className="card-img-top" alt={product.name} />
                                                        }
                                                    </div>
                                                </Col>
                                                <Col xs="5">
                                                    <div>
                                                        <p className="card-category">Prix:</p>
                                                        <Card.Title as="h4">{product.basePrice} €</Card.Title>
                                                    </div>
                                                </Col>
                                                {/*<Col xs="2">*/}
                                                {/*    <div className="numbers">*/}
                                                {/*        <i className='bx bxs-trash icon_cart' onClick={() => removeProduct(product)}></i>*/}
                                                {/*    </div>*/}
                                                {/*</Col>*/}
                                                <HandleProduct product={product}/>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                }
                <Col lg="12">
                    <Card className="card-stats" style={{border:"1px solid blue"}}>
                        <Card.Body>
                            <Row>
                                <Col lg="12" className="numbers">
                                    <span style={{fontSize:"0.7em"}}>TOTAL: <span style={{color:"blue"}}>{cart.price.toFixed(2)} €</span></span>
                                </Col>
                                <Col lg="12">
                                    <button onClick={() => history.push('/cart')} className="btn_card">Valider ma réservation</button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>
    );
};

export default CatalogCart;
