import React, {useEffect, useRef, useState} from 'react';
import sidebarImage from "../../assets/img/img.jpg";
import Sidebar from "../../components/Sidebar";
import routes from "../../routes";
import Navbar from "../../components/NavBar";
import {Card, Container, Col, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {notificationActions} from "../../store/notif";
import {orderActions} from "../../store/orders";
import {fetchData} from "../../response";
import Paginate from "../../components/Paginate";
import FilterOrders from "../../components/FilterOrders";

toast.configure();

const Orders = () => {
    const [image, setImage] = useState(sidebarImage);
    const [color, setColor] = useState("black");
    const [hasImage, setHasImage] = useState(true);
    const mainPanel = useRef(null);
    const orders = useSelector((state) => state.orders);
    const initialState = {number: "", shopId: null, status: "", name: "", startDate: "", endDate: ""};
    const [filters, setFilters] = useState(initialState);
    const auth = useSelector((state) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const total = orders.count[0].CountOrders;
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [message, setMessage] = useState("");
    const [load, setLoad] = useState(false);
    let limit = 10;
    let offset= 0;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFilters({...filters, [name]:value});
    };

    const filterOrders = async () => {
        setError('');
        const response = await fetchData(auth.access_token, `bookings?number=${filters.number}&shopId=${filters.shopId}&startDate=${filters.startDate}&endDate=${filters.endDate}&state=${filters.status}&customer=${filters.name}`, 'GET');
        if (!response.ok) {
            const msg = "Il n'y a aucune réservation"
            setError(msg);
        }else {
            const data = await response.json();
            setItems(data);
        }
    };

    const removeFilter = async (e) => {
        setFilters(initialState);
        setError("");
        const ordersData = await fetchOrders(1);
        setItems(ordersData);
    };

    const handleMessage = (message) => {
        switch(message){
            case "Reservation already canceled":
                return "Réservation déjà annulée";
            case "You can't cancel this reservation. The reservation cancellation deadline has expired":
                return "Vous ne pouvez pas annuler cette réservation. Le délai d'annulation de la réservation est expiré";
            case "Reservation canceled":
                return "Réservation annulée";
            default:
                return "Une erreur est survenue veuillez réessayer ultérieurement";
        }
    };

    const cancelOrder = async (id) => {
        const cancel = async () => {
            const res = await fetchData(auth.access_token, `bookings/${id}`, 'DELETE');
            const data = await res.json();
            setMessage(handleMessage(data.message))
        };
        await cancel();
        await toast.warn(message, {position: toast.POSITION.TOP_CENTER,
        autoClose: 8000});
        const addNotification = () => {
            if(message === "Réservation déjà annulée"){
                dispatch(notificationActions.addNotification({
                    color: "indianred",
                    message: message
                }));
                dispatch(notificationActions.setStorageNotificationData());
            }
        }
        await addNotification();
    };

    const addOrder = () => {
        history.push('/catalogue');
    };

    const fetchOrders = async (currentPage) => {
        const res = await fetchData(auth.access_token, `bookings?limit=${limit}&offset=${currentPage*10}`, 'GET');
        const data = await res.json();
        return data;
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const ordersData = await fetchOrders(currentPage);
        setItems(ordersData);
    };

    const editOrder = (prod) => {
        if(prod.bookingDetails.bookingStatus === "CURRENT"){
            dispatch(orderActions.addOrder(prod));
            history.push('/edit');
        }else{
            const msg = "Cette réservation est déja annulée, vous pouvez pas la modifier!";
            toast.warn(msg, {position: toast.POSITION.TOP_CENTER,
                autoClose: 8000});
        }
    };

    useEffect(() => {
        const getOrders = async () => {
            const res = await fetchData(auth.access_token, `bookings?limit=${limit}&offset=${offset}`, 'GET');
            const data = await res.json();
            setPageCount(Math.ceil((total / limit)-1));
            setItems(data);
        };
        getOrders();
    }, [limit]);

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <Navbar />
                    <div className="content">
                        <Container fluid>
                            <Row>
                                <Col lg="12" sm="12">
                                    <Card.Body>
                                        <Row>
                                            <Col lg="4" sm="4">
                                                <i className='bx bx-filter' style={{fontSize:"3em", marginTop:"10%", color:"gray"}} onClick={() => setLoad(!load)}></i>
                                                {
                                                    load? <FilterOrders filterOrders={filterOrders} removeFilter={removeFilter} handleChange={handleChange} filters={filters}/>: <p></p>
                                                }
                                            </Col>
                                            <Col lg="7" sm="4">
                                            </Col>
                                            <Col lg="1" sm="4" >
                                                <i className='bx bxs-plus-circle' style={{fontSize:"2.5em", marginTop:"52%", color:"gray"}} onClick={addOrder}></i>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Container>
                         {error === "" ?
                                <>
                                  <Row>
                                    <Col md="12">
                                        <Card className="strpied-tabled-with-hover">
                                            <Card.Header>
                                                <Card.Title as="h4">Liste des réservations</Card.Title>
                                            </Card.Header>
                                            <Card.Body className="table-full-width table-responsive px-0">
                                                <Table className="table-hover table-striped">
                                                    {items.length !== 0?
                                                    <>
                                                        <thead>
                                                        <tr>
                                                            <th className="border-0">Numéro</th>
                                                            <th className="border-0">Devise</th>
                                                            <th className="border-0">Statut</th>
                                                            <th className="border-0">Client</th>
                                                            <th className="border-0">Produits</th>
                                                            <th className="border-0">Date Récupération</th>
                                                            <th className="border-0">Prix Total</th>
                                                            <th className="border-0">Actions</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {items?.map((prop, key) => {
                                                            return (
                                                                <tr  key={key}>
                                                                    <td>{prop.bookingDetails.number}</td>
                                                                    <td>{prop.bookingDetails.currency}</td>
                                                                    {
                                                                        (prop.bookingDetails.bookingStatus === "CURRENT" )? <td>EN COURS</td> :
                                                                            ((prop.bookingDetails.bookingStatus === "CANCEL") ? <td>ANNULÉE</td> :
                                                                                <td>EXPIRÉE</td>)
                                                                    }
                                                                    <td>{prop.bookingDetails.customer.lastName}</td>
                                                                    <td>{prop.bookingProducts.length}</td>
                                                                    <td>{prop.bookingDetails.pickUpDate}</td>
                                                                    <td>{prop.bookingDetails.totalPrice}</td>
                                                                    <td>
                                                                        <button className="icon_edit" onClick={() => editOrder(prop)}>Modifier</button>
                                                                        <button className="icon_delete" onClick={() => cancelOrder(prop.bookingDetails.id)}>Annuler</button>
                                                                    </td>
                                                                </tr>

                                                            );
                                                        })}
                                                        </tbody>
                                                    </>: <></>}
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Paginate handlePageClick={handlePageClick} items={items} pageCount={pageCount}/>
                            </>
                            :
                             <Row style={{marginLeft:"3%", width:"60%"}}>
                                 <Col md="12">
                                    <Card className="strpied-tabled-with-hover">
                                        <Card.Header>
                                            <Card.Title as="h4" style={{color:"red"}}>{error} ...</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="table-full-width table-responsive px-0"> </Card.Body>
                                    </Card>
                                </Col>
                             </Row>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;
