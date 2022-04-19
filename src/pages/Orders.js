import React, {useState} from 'react';
import sidebarImage from "../assets/img/img.jpg";
import Sidebar from "../components/Sidebar";
import routes from "../routes";
import Navbar from "../components/NavBar";
import {Card, Col, Row, Table} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";
import {TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Orders = () => {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);
    const orders = useSelector((state) => state.orders);
    const [filter, setFilter] = useState(orders.orders);
    const initialValues = {number: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const history = useHistory();

    const filterProduct = (e) => {
        e.preventDefault();
        const updatedList = orders.orders.filter((x) =>  x.bookingDetails.number === formValues.number);
        // const updatedList = props.products.filter((x) =>  gender in x.genders);
        if(updatedList !== []){
            setFilter(updatedList);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    };

    const handlePageClick = (data) => {
      console.log(data.selected);
    };

    const cancelOrder = () => {

    };

    const addOrder = () => {
        history.push('/catalogue');
    }

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <Navbar />
                    <div className="content">
                        <div className="row">
                            <div className="col-sm-8">
                                    <button className="row pro_add" onClick={addOrder}>Créer</button>
                            </div>
                            <div className="col-sm-4">
                                <div className="row pro_cart3">
                                    <div className="col-sm-6">
                                        <TextField label="N° Réservation" variant="standard" className="textField" name="number" value={formValues.number} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <button type="submit" onClick={filterProduct}>Rechercher</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Row>
                            <Col md="12">
                                <Card className="strpied-tabled-with-hover">
                                    <Card.Header></Card.Header>
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
                                                <th className="border-0">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orders.orders?.map((prop, key) => {
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
                                                        <td>
                                                            <i className='bx bx-edit-alt icon_edit'></i>
                                                            <i className='bx bxs-trash icon_delete' onClick={() => cancelOrder(prop.bookingDetails.number)}></i>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <ReactPaginate previousLabel={"previous"}
                                       nextLabel={"next"}
                                       breakLabel={"..."}
                            // pageCount={pageCount}
                                       pageCount={100}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={3}//binet les points
                                       onPageChange={handlePageClick}
                                       containerClassName={"pagination justify-content-center"}
                                       pageClassName={"page-item"}
                                       pageLinkClassName={"page-link"}
                                       previousClassName={"page-item"}
                                       previousLinkClassName={"page-link"}
                                       nextClassName={"page-item"}
                                       nextLinkClassName={"page-link"}
                                       breakClassName={"page-item"}
                                       breakLinkClassName={"page-link"}
                                       activeClassName={"active"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;
