import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";

const FilterOrders = ({filterOrders, removeFilter, handleChange, filters}) => {

    const shops = useSelector((state) => state.shop.allShops);

    const getShopName = (id) => {
        if (id === null){
            return "-- Magazin --";
        }
        for(let i= 0; i < shops.shops?.length; i++){
            if (shops.shops[i].id === id){
                return(shops.shops[i].name);
            }
        }
    };

    return (
        <Container fluid style={{width:"200%"}}>
            <Row>
                <Col lg="12" sm="12">
                    <Card className="card-stats">
                        <span style={{fontSize:"1.2em", marginLeft:"15px", marginTop:"15px", color:"gray"}} >Filtres</span>
                        <hr/>
                        <Card.Body>
                            <Row>
                                <Col lg="2">
                                    <div className="wrapp">
                                        <div className="input-data">
                                            <input type="text" name="number" value={filters.number} onChange={handleChange} required/>
                                            <div className="underline"></div>
                                            <label style={{fontSize:"0.7em"}}>N° Résevation</label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="2">
                                    <select name="shopId" defaultValue={filters.shopId} className="form-control mb-3 select" onChange={handleChange} required>
                                        <option defaultValue={getShopName(filters.shopId)}>{getShopName(filters.shopId)}</option>
                                        {
                                            shops.shops?.map( (shop,index)=>(
                                                <option key={index} value={shop.id}> {shop.name}</option>
                                            ))
                                        }
                                    </select>
                                </Col>
                                <Col lg="2">
                                    <div className="wrapp">
                                        <div className="input-data">
                                            <select name="status" style={{width: "100%",border:"transparent", borderBottom:"2px solid lightgray", marginTop:"20px", fontSize:"0.9em"}} defaultValue={filters.status} onChange={handleChange}>
                                                <option value="" disabled>Statut</option>
                                                <option value="InProgress">EN COURS</option>
                                                <option value="CANCELED">ANNULÉE</option>
                                                <option value="EXPIRED">EXPIRÉE</option>
                                            </select>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="2">
                                    <div className="wrapp">
                                        <div className="input-data">
                                            <input type="text" name="name" value={filters.name} onChange={handleChange}  required/>
                                            <div className="underline"></div>
                                            <label style={{fontSize:"0.7em"}}>Nom du client</label>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="2">
                                    <div className="wrapp">
                                        <div className="input-data">
                                            <input type="date" className="form-control" name="startDate" value={filters.startDate} onChange={handleChange} required/>
                                            <div className="underline"></div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="2">
                                    <div className="wrapp">
                                        <div className="input-data">
                                            <input type="date" className="form-control" name="endDate" value={filters.endDate} onChange={handleChange} required/>
                                            <div className="underline"></div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                </Col>
                                <Col lg="6" className="butons" >
                                    <button onClick={() => filterOrders()} style={{backgroundColor: "lightblue", width:"90px", border:"1px solid blue", color:"blue"}}>Filtrer</button>
                                    <button onClick={() => removeFilter()}>Réinitialiser les filtres</button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FilterOrders;
