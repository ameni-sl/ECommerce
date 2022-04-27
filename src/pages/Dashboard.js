import React, {useEffect, useRef, useState} from "react";
import ChartistGraph from "react-chartist";
import { Card, Table, Container,  Row, Col } from "react-bootstrap";
import sidebarImage from "../assets/img/img.jpg";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import routes from "../routes";
import {fetchCountOrderData, fetchOrderCountStatData, fetchOrdersData, fetchOrderStatData} from "../store/orders";

const Dashboard = () => {
    const [image, setImage] = useState(sidebarImage);
    const [color, setColor] = useState("black");
    const [hasImage, setHasImage] = useState(true);
    const mainPanel = useRef(null);
    const orders = useSelector((state) => state.orders);
    const auth = useSelector((state) => state.auth);
    let year = new Date().getFullYear();
    let max = [Math.max(...orders.ordersStat[0]),Math.max(...orders.ordersStat[1]),Math.max(...orders.ordersStat[2])];
    let high = useState(Math.max(...max));
    const labels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Juil", "Aou", "Sep", "Oct", "Nov", "Déc"];
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchOrderStatData(auth.access_token));
        dispatch(fetchOrderCountStatData(auth.access_token));
        dispatch(fetchCountOrderData(auth.access_token));
        dispatch(fetchOrdersData(auth.access_token));
    },[]);

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <NavBar />
                    <div className="content">
                        <>
                            <Container fluid>
                                <Row>
                                    <Col lg="3" sm="6">
                                        <Card className="card-stats">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs="5">
                                                        <div className="icon-big text-center icon-warning">
                                                            <i className="bx bxl-shopify text-warning"></i>
                                                        </div>
                                                    </Col>
                                                    <Col xs="7">
                                                        <div className="numbers">
                                                            <p className="card-category">Reservations</p>
                                                            <Card.Title as="h4">{orders.count[0].CountOrders}</Card.Title>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg="3" sm="6">
                                        <Card className="card-stats">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs="5">
                                                        <div className="icon-big text-center icon-warning">
                                                            <i className="bx bx-user  text-success"></i>
                                                        </div>
                                                    </Col>
                                                    <Col xs="7">
                                                        <div className="numbers">
                                                            <p className="card-category">Clients</p>
                                                            <Card.Title as="h4">{orders.count[0].CountCustomers}</Card.Title>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg="3" sm="6">
                                        <Card className="card-stats">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs="5">
                                                        <div className="icon-big text-center icon-warning">
                                                            <i className="bx bx-store text-danger"></i>
                                                        </div>
                                                    </Col>
                                                    <Col xs="7">
                                                        <div className="numbers">
                                                            <p className="card-category">Magasins Utilisés</p>
                                                            <Card.Title as="h4">{orders.count[0].CountShops}</Card.Title>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg="3" sm="6">
                                        <Card className="card-stats">
                                            <Card.Body>
                                                <Row>
                                                    <Col xs="5">
                                                        <div className="icon-big text-center icon-warning">
                                                            <i className="bx bxs-cart-download text-primary"></i>
                                                        </div>
                                                    </Col>
                                                    <Col xs="7">
                                                        <div className="numbers">
                                                            <p className="card-category" style={{size:"10px"}}>Promotions Utilisées</p>
                                                            <Card.Title as="h4">{orders.count[0].CountPromotions}</Card.Title>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col  md="8">
                                        <Card  className="card1">
                                            <Card.Header>
                                                <Card.Title as="h4">Reservations</Card.Title>
                                                <p></p>
                                            </Card.Header>
                                            <Card.Body>
                                                <div className="ct-chart" id="chartHours">
                                                    <ChartistGraph
                                                        data={{labels: labels, series: orders.ordersStat }}
                                                        type="Line"
                                                        options={{
                                                            low: 0,
                                                            high: {high},
                                                            showArea: false,
                                                            height: "245px",
                                                            axisX: {
                                                                showGrid: false,
                                                            },
                                                            lineSmooth: true,
                                                            showLine: true,
                                                            showPoint: true,
                                                            fullWidth: true,
                                                            chartPadding: {
                                                                right: 50,
                                                            },
                                                        }}
                                                        responsiveOptions={[
                                                            [
                                                                "screen and (max-width: 640px)",
                                                                {
                                                                    axisX: {
                                                                        labelInterpolationFnc: function (value) {
                                                                            return value[0];
                                                                        },
                                                                    },
                                                                },
                                                            ],
                                                        ]}
                                                    />
                                                </div>
                                            </Card.Body>
                                            <Card.Footer>
                                                <div className="legend">
                                                    <i className="fas fa-circle text-info"></i>
                                                    {year-1} <i className="fas fa-circle text-danger"></i>
                                                    {year} <i className="fas fa-circle text-warning"></i>
                                                    {year+1}
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card>
                                            <Card.Header>
                                                <Card.Title as="h4">Statistiques de réservations</Card.Title>
                                            </Card.Header>
                                            <Card.Body>
                                                <div
                                                    className="ct-chart ct-perfect-fourth"
                                                    id="chartPreferences"
                                                >
                                                    <ChartistGraph
                                                        data={{labels: orders.ordersCount, series: orders.ordersCount }}
                                                        type="Pie"
                                                    />
                                                </div>
                                                <div className="legend card2">
                                                    <i className="fas fa-circle text-danger"></i>
                                                    Annulée<i className="fas fa-circle text-info"></i>
                                                    En cours<i className="fas fa-circle text-warning"></i>
                                                    Expirée
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Card className="strpied-tabled-with-hover">
                                            <Card.Header>
                                                <Card.Title as="h4">Dernières réservations</Card.Title>

                                            </Card.Header>
                                            <Card.Body className="table-full-width table-responsive px-0">
                                                <Table className="table-hover table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th className="border-0">Numéro</th>
                                                        <th className="border-0">Devise</th>
                                                        <th className="border-0">Statut</th>
                                                        <th className="border-0">Client</th>
                                                        <th className="border-0">Produits</th>
                                                        <th className="border-0">Date Récupération</th>
                                                        <th className="border-0">Prix Total</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {orders.reservations.map((prop, key) => {
                                                        return (
                                                            <tr  key={key}>
                                                                <td>{prop.bookingDetails.number}</td>
                                                                <td>{prop.bookingDetails.currency}</td>
                                                                {
                                                                    (prop.bookingDetails.bookingStatus === "CURRENT" )? <td>En COURS</td> :
                                                                        ((prop.bookingDetails.bookingStatus === "CANCEL") ? <td>ANNULÉE</td> :
                                                                        <td>EXPIRÉE</td>)
                                                                }
                                                                <td>{prop.bookingDetails.customer.firstName}</td>
                                                                <td>{prop.bookingProducts.length}</td>
                                                                <td>{prop.bookingDetails.pickUpDate}</td>
                                                                <td>{prop.bookingDetails.totalPrice}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;



