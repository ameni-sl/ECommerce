import React, {useEffect, useRef, useState} from 'react';
import sidebarImage from "../assets/img/img.jpg";
import Sidebar from "../components/Sidebar";
import routes from "../routes";
import Navbar from "../components/NavBar";
import {fetchData} from "../response";
import {useSelector} from "react-redux";
import {Card, Col, Row, Table} from "react-bootstrap";

const Promotions = () => {
    const [image, setImage] = useState(sidebarImage);
    const [color, setColor] = useState("black");
    const [hasImage, setHasImage] = useState(true);
    const mainPanel = useRef(null);
    const auth = useSelector((state) => state.auth);
    const [error, setError]= useState('');
    const [coupons, setCoupons]= useState([]);

    useEffect(() =>{
        const fetchCoupons = async ()=>{
            const response = await fetchData(auth.access_token, `coupons`, 'GET');
            if (!response.ok) {
                throw new Error('Error!');
            }
            const getCoupons = await response.json();
            if(getCoupons.coupons.length === 0){
                let msg = "Vous n'avez aucune promotion aujourdhui"
                setError(msg);
            }else {
                setCoupons(getCoupons.coupons);
                // setCoupons([
                //         {
                //             "code": "LTRVM21"
                //         }
                //     ]
                // );
            }
        };
        fetchCoupons();
    });

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <Navbar />
                    <div className="content">
                        {
                            error !== '' ?
                                <Row style={{marginTop:"7%", marginLeft:"17%", width:"60%", textAlign: "center"}}>
                                    <Col md="12">
                                        <Card className="strpied-tabled-with-hover">
                                            <Card.Header>
                                                <Card.Title as="h4" style={{color:"red"}}>{error}</Card.Title>
                                            </Card.Header>
                                            <Card.Body className="table-full-width table-responsive px-0">
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                             : <></>
                        }
                        {
                            coupons.length !== 0 ?
                                        <Row style={{marginTop:"7%"}}>
                                            <Col md="12">
                                                <Card className="strpied-tabled-with-hover">
                                                    <Card.Header>
                                                        <Card.Title as="h4">Liste des promotions</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body className="table-full-width table-responsive px-0">
                                                        <Table className="table-hover table-striped">
                                                                    <thead>
                                                                    <tr>
                                                                        <th className="border-0"></th>
                                                                        <th className="border-0">Code</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {coupons.map((coupon, index) => {
                                                                        return (
                                                                            <tr  key={index}>
                                                                                <td>{index+1}</td>
                                                                                <td>{coupon.code}</td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                    </tbody>
                                                        </Table>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                             : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Promotions;
