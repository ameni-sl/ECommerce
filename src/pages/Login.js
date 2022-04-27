import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {authActions} from "../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {fetchMassifsData, fetchSopsData} from "../store/shop";
import {shopActions} from "../store/shop";
import globalVariables from "../store/state";

const Login = () => {
    const initialValues = { username: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
        setFormErrors({});
        setIsAuth(false);
    };

    const fetchData = async () => {
        axios
            .get(globalVariables.baseUrl + `oauth/v2/token?client_id=${auth.client_id}&client_secret=${auth.client_secret}&grant_type=password&username=${formValues.username}&password=${formValues.password}`)
            .then((response) => {
                setIsAuth(false);
                dispatch(authActions.setToken(response.data.access_token));
                dispatch(authActions.setUsername(formValues.username));
                dispatch(authActions.setPassword(formValues.password));
                dispatch(authActions.login());
                history.push('/dashboard');
                dispatch(authActions.setStorageAuthData());
                const fetchOrderData = async () => {
                    await dispatch(fetchMassifsData(response.data.access_token));
                    await dispatch(fetchSopsData(response.data.access_token));
                    await dispatch(shopActions.setStorageShopData());
                }
                fetchOrderData();
            })
            .catch(() => {
                setIsAuth(true);
            })

    };

    const validate = (values) => {
        const errors = {};
        if(!values.username){
            errors.username = "Ce champ est obligatoire!"
        }else if(!values.password){
            errors.password = "Ce champ est obligatoire!"
        } else if(values.password.length < 5){
            errors.password = "5 caractères minimum"
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        fetchData();
    };

    useEffect(() => {
        dispatch(authActions.logout());
    });

    return (
        <div className="body">
            <div className="loginBox">
                <div className="avatar">
                   <h3>ME CONNECTER</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    {isAuth  && Object.keys(formErrors).length === 0 &&(
                           <p>{auth.error} !</p>
                    )}
                    <div className="pass">
                        <input type="text"
                               name="username"
                               placeholder="Username"
                               value={formValues.username}
                               onChange={handleChange}/>
                        <FontAwesomeIcon icon={faUser} className="icon"/>
                    </div>
                    <p>{formErrors.username}</p>
                    <div className="pass">
                        <input type="password"
                               name="password"
                               placeholder="Mot de passe"
                               value={formValues.password}
                               onChange={handleChange}/>
                        <FontAwesomeIcon icon={faLock} className="icon"/>
                    </div>
                    <p>{formErrors.password}</p>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
