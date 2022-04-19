import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { Nav } from "react-bootstrap";

const Sidebar = ({ color, image, routes }) => {
    const location = useLocation();
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    return (
        <div className="sidebar" data-image={image} data-color={color}>
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: "url(" + image + ")",
                }}
            />
            <div className="sidebar-wrapper">
                <div className="logo">
                    <img
                        src={logo}
                        alt="..."
                    />
                    <div className="simple-text logo-mini mx-1 logo-img" >

                    </div>
                </div>
                <Nav>
                    {routes.map((prop, key) => {
                        if (!prop.redirect)
                            return (
                                <li
                                    className={activeRoute(prop.path)}
                                    key={key}
                                >
                                    <NavLink
                                        to={prop.path}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        <i className={prop.icon} />
                                        <p>{prop.name}</p>
                                    </NavLink>
                                </li>
                            );
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;

