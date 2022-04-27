import React from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Navbar, Container, Nav, Dropdown, Button} from "react-bootstrap";
import routes from "../routes";
import {useDispatch, useSelector} from "react-redux";
import {notificationActions} from "../store/notif";


const NavBar = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.notification);

    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        var node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Dashboard";
    };

    return (
        <Navbar  bg="light" expand="lg">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    <Button
                        variant="dark"
                        className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        onClick={mobileSidebarToggle}
                    >
                        <i className="fas fa-ellipsis-v"></i>
                    </Button>
                    <Navbar.Brand
                        href="#home"
                        onClick={(e) => e.preventDefault()}
                        className="mr-2"
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                </Navbar.Toggle>
                <Navbar.Collapse className="navCol" id="basic-navbar-nav">
                    <Nav className="ml-auto" navbar>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle
                                as={Nav.Link}
                                data-toggle="dropdown"
                                id="dropdown-67443507"
                                variant="default"
                                className="m-0"
                            >
                                <i className='bx bxs-bell fa-2xl'></i>
                                <span className="notification">{notification.notificationList.length}</span>
                                <span className="d-lg-none ml-1">Notification</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    notification.notificationList?.map((notification, index) => {
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                style={{color:notification.color}}
                                            >
                                                {notification.message}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                                {
                                    notification.notificationList?.length !== 0? <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <span style={{color:"blue", width:"20%" , marginLeft:"40%", backgroundColor:"transparent",  borderRadius:"5px"}} onClick={()=>{dispatch(notificationActions.deleteAll())}} >Vider</span>
                                    </Dropdown.Item> : <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                    </Dropdown.Item>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                href="/cart"
                                onClick={(e) => e.preventDefault()}
                            >
                                <i onClick={() => history.push('/cart')} className='bx bx-cart fa-2xl'></i>
                                <span className="notification">{cart.cart.length}</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                href="/"
                            >
                                <i className='bx bx-log-out-circle fa-2xl'></i>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;

