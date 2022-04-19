import React from 'react';
import sidebarImage from "../assets/img/img.jpg";
import Sidebar from "../components/Sidebar";
import routes from "../routes";
import Navbar from "../components/NavBar";
import FixedPlugin from "../components/FixedPlugin";
import {Alert, Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const Notifications = () => {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);
    const notification = useSelector((state) => state.notification.notificationList);

    const [showModal, setShowModal] = React.useState(false);
    const notificationAlertRef = React.useRef(null);
    const notify = (place) => {
        var color = Math.floor(Math.random() * 5 + 1);
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        Welcome to <b>Light Bootstrap Dashboard React</b> - a beautiful
                        freebie for every web developer.
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes}/>
                <div className="main-panel" ref={mainPanel}>
                    <Navbar/>
                    <div className="content2">
                        <Container fluid>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Notifications</Card.Title>
                                </Card.Header>
                                <br/>
                                <Card.Body>
                                    <Row>
                                        <Col md="8 text-center" className="offset-md-2 text-center">
                                            {
                                                notification.map((notification, key) => {
                                                    return(
                                                        <Alert variant={notification.typeAlert}>
                                                            <button aria-hidden={true} className="close" ata-dismiss="alert" type="button">X</button>
                                                            <span>{notification.message} </span>
                                                        </Alert>
                                                    )
                                                })
                                            }
                                            {/*<Alert variant="primary">*/}
                                            {/*    <button aria-hidden={true} className="close" ata-dismiss="alert" type="button">X</button>*/}
                                            {/*    <span> <b>Primary -</b> This is a regular notification made with ".alert-primary" </span>*/}
                                            {/*</Alert>*/}
                                            {/*<Alert variant="info">*/}
                                            {/*    <button aria-hidden={true} className="close" data-dismiss="alert" type="button" >X</button>*/}
                                            {/*    <span> <b>Info -</b> This is a regular notification made with ".alert-info </span>*/}
                                            {/*</Alert>*/}
                                            {/*<Alert variant="success">*/}
                                            {/*    <button aria-hidden={true}className="close"data-dismiss="alert"type="button">X</button>*/}
                                            {/*    <span> <b>Success -</b> This is a regular notification made with ".alert-success"</span>*/}
                                            {/*</Alert>*/}
                                            {/*<Alert variant="warning">*/}
                                            {/*    <button aria-hidden={true} className="close" data-dismiss="alert" type="button" >X</button>*/}
                                            {/*    <span> <b>Warning -</b> This is a regular notification made with ".alert-warning"</span>*/}
                                            {/*</Alert>*/}
                                            {/*<Alert variant="danger">*/}
                                            {/*    <button aria-hidden={true} className="close" data-dismiss="alert" type="button" >X</button>*/}
                                            {/*    <span> <b>Danger -</b> This is a regular notification made with ".alert-danger"</span>*/}
                                            {/*</Alert>*/}
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <br></br>
                                    <Row>
                                        <Col className="text-center" md="12">
                                            <Button
                                                className="btn-fill btn-wd"
                                                variant="info"
                                                onClick={() => setShowModal(true)}
                                            >
                                                Supprimer
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            {/* Mini Modal */}
                            <Modal
                                className="modal-mini modal-primary"
                                show={showModal}
                                onHide={() => setShowModal(false)}
                            >
                                <Modal.Header className="justify-content-center">
                                    <div className="modal-profile">
                                        <i className="nc-icon nc-bulb-63"></i>
                                    </div>
                                </Modal.Header>
                                <Modal.Body className="text-center">
                                    <p>Always have an access to your profile</p>
                                </Modal.Body>
                                <div className="modal-footer">
                                    <Button
                                        className="btn-simple"
                                        type="button"
                                        variant="link"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        className="btn-simple"
                                        type="button"
                                        variant="link"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </Modal>
                            {/* End Modal */}
                        </Container>
                    </div>
                </div>
            </div>
            <FixedPlugin
                hasImage={hasImage}
                setHasImage={() => setHasImage(!hasImage)}
                color={color}
                setColor={(color) => setColor(color)}
                image={image}
                setImage={(image) => setImage(image)}
            />
        </>
    );
};

export default Notifications;
