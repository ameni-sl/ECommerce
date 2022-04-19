import React, {useEffect, useState} from 'react';
import sidebarImage from "../assets/img/img.jpg";
import Sidebar from "../components/Sidebar";
import routes from "../routes";
import Navbar from "../components/NavBar";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../assets/v-shape-v6.jpg";
import {catalogActions, fetchCatalogData} from "../store/catalog";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {authActions} from "../store/auth";
import { fetchShopsData, fetchStationsData, shopActions} from "../store/shop";
import {Container} from "react-bootstrap";


import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';


const Catalog = () => {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const [loading, setLoading] = useState(true);
    const mainPanel = React.useRef(null);
    const formValues = useSelector((state) => state.catalog.formValues);
    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shop.shops);
    const massifs = useSelector((state) => state.shop.massifs);
    const stations = useSelector((state) => state.shop.stations);
    const catalog = useSelector((state) => state.catalog);
    const [filter, setFilter] = useState(catalog.catalogList);
    const auth = useSelector((state) => state.auth);

    const [massifId, setMassifId]= useState('');
    const [stationId, setStationId]= useState('');
    const [station, setStation]= useState([]);
    const [shop, setShop]= useState([]);
    const [value, setValue] = React.useState([null, null]);

    let minDate = new Date('1/15/2017');
    let maxDate = new Date('12/20/2017');

    const SelectHandleChangeShop = (e) => {
        const {name, value} = e.target;
        const value1 = getShopId(value);
        dispatch(catalogActions.addFormValues({...formValues, [name]:value1}));
        dispatch(shopActions.setStorageShopData());
    };

    const SelectHandleChange = (e) => {
        dispatch(fetchStationsData(auth.access_token, e.target.value));
        dispatch(catalogActions.addMassif(e.target.value));
    };

    const SelectHandleChangeStation = (e) => {
        dispatch(fetchShopsData(auth.access_token, e.target.value));
        dispatch(catalogActions.addStation(e.target.value));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(catalogActions.addFormValues({...formValues, [name]:value}));
    };

    const fetchData = async () => {
        const username = "4286-alp-1551";
        const password = "admin";
        axios
            .get(`http://commerce.intersport-rent.local/api/oauth/v2/token?client_id=${auth.client_id}&client_secret=${auth.client_secret}&grant_type=password&username=${username}&password=${password}`)
            .then((response) => {
                dispatch(authActions.setToken(response.data.access_token));

                const fetchOrderData = async () => {
                    await dispatch(authActions.setStorageAuthData());
                }
                fetchOrderData();
            })
            .catch(() => {
            })

    }


    const getShopName = (id) => {
        if (id === null){
            return "Magasin";
        }
        for(let i= 0; i < shops.shops?.length; i++){
            if (shops.shops[i].id === id){
                return(shops.shops[i].name);
            }
        }
    };

    const getShopId = (name) => {
        for(let i= 0; i < shops.shops.length; i++){
            if (shops.shops[i].name === name){
                return(shops.shops[i].id);
            }
        }
    };

    const getStationName = (id) => {
        if (id === null){
            return "Station";
        }
        for(let i= 0; i < stations.stations?.length; i++){
            if (stations.stations[i].id === id){
                return(stations.stations[i].name);
            }
        }
    };

    const getStationId = (name) => {
        for(let i= 0; i < shops.shops.length; i++){
            if (shops.shops[i].name === name){
                return(shops.shops[i].id);
            }
        }
    };

    const getMassifName = (id) => {
        if (id === null){
            return "Massif";
        }
        for(let i= 0; i < massifs.massifs?.length; i++){
            if (massifs.massifs[i].id === id){
                return(massifs.massifs[i].name);
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(fetchCatalogData(auth.access_token, formValues));
        setLoading(false);
        dispatch(catalogActions.setStorageCatalogData());
        await fetchData();
        dispatch(authActions.getStorageAuthData());
    };

    const filterProduct = (gender) => {
        const updatedList = catalog.catalogList.filter((x) =>  x.id === 6);
        // const updatedList = props.products.filter((x) =>  gender in x.genders);
        setFilter(updatedList);
    };

    const getErrorMessage = (message) => {
        switch (message){
            case "Start date should be before end date":
                return "La date d'arrivée doit être antérieure à la date de départ !"
            case "Booking duration should be less than 14 days":
                return "La durée de réservation doit être inférieure à 14 jours !"
            case "Shop is closed":
                return "Magasin est fermé !"
            case "startDate is missing.":
                return "La date d'arrivée est manquante !"
            case "endDate is missing.":
                return "La date de départ est manquante !"
            default:
                // return "Une erreur est survenue veuillez réessayer ultérieurement"
                return ""
        }
    }

    useEffect(() => {
        dispatch(catalogActions.setStorageCatalogData());
    });

    const handleMassif=(event)=>{
        setStation([]);
        setShop([]);
        const massifId = event.target.value;
        setMassifId(massifId);
        event.preventDefault();
    };

    const handleStation=(event)=>{
        setShop([]);
        const stationId = event.target.value;
        setStationId(stationId);
        event.preventDefault();
    };

    useEffect( ()=>{

        const fetchStations= async ()=>{
            const response= await fetch(
                `http://commerce.intersport-rent.local/api/${massifId}/stations`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${auth.access_token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });
            const getStations= await response.json();
            setStation(getStations);

        }
        fetchStations();
    },[massifId]);

    useEffect( ()=>{

        const fetchShops= async ()=>{
            const response= await fetch(
                `http://commerce.intersport-rent.local/api/${stationId}/shops`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${auth.access_token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    }
                });
            const getShops= await response.json();
            setShop(getShops);

        }
        fetchShops();
    },[stationId]);

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <Navbar />
                    <div className="content">
                        <Container className="content mt-5">
                            <div className="row">
                                <div className="col-sm-12">
                                  <div className="row mb-3">
                                        <div className="form-group col-md-3 mt-4">
                                            <select name="massif" className="form-control mb-3" onChange={(e)=>handleMassif(e)}>
                                                <option>-- Massif --</option>
                                                {
                                                    massifs.massifs.map( (massif,index)=>(
                                                        <option key={index} value={massif.id}> {massif.name}</option>
                                                    ))
                                                 }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3 mt-4">
                                            <select name="state" className="form-control mb-3 " onChange={(e)=>handleStation(e)}>
                                                <option>-- Station --</option>
                                                {
                                                    station.stations?.map( (station,index)=>(
                                                        <option key={index} value={station.id}> {station.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group col-md-3 mt-4">
                                            <select name="state" className="form-control mb-3">
                                                <option>-- Magazin --</option>
                                                {
                                                    shop.shops?.map( (shop,index)=>(
                                                        <option key={index} value={shop.id}> {shop.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group col-md-3 mt-4">
                                            {/*<select name="state" className="form-control mb-3">*/}
                                            {/*    <option>--Select State--</option>*/}
                                            {/*</select>*/}
                                            <div className='control-pane'>
                                                <div className='control-section'>
                                                    <div className='daterangepicker-control-section'>
                                                        <DateRangePickerComponent min={minDate} max={maxDate} ></DateRangePickerComponent>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group col-md-12 mt-4">
                                            <button className="button" type="submit" onClick={handleSubmit}>Rechercher</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <div className="body1">
                            <form >
                                <div className="form_content">
                                    <select name="massif"  defaultValue={formValues.massif} onChange={SelectHandleChange}>
                                        <option defaultValue={getMassifName(formValues.massif)} style={{color:"gray"}}>{getMassifName(formValues.massif)}</option>
                                        {
                                            massifs.massifs?.map((massif,index) => {
                                                return(
                                                    <option key={index} value={massif.id}>{massif.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <select name="station" defaultValue={formValues.station} onChange={SelectHandleChangeStation}>
                                        <option defaultValue={getStationName(formValues.station)} style={{color:"gray"}}>{getStationName(formValues.station)}</option>
                                        {
                                            stations.stations?.map((station, index) => {
                                                return(
                                                    <option key={index} value={station.id}>{station.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <select name="shop" defaultValue={getShopName(formValues.shop)} onChange={SelectHandleChangeShop}>
                                        <option value={getShopName(null)} disabled>{getShopName(null)}</option>
                                        {
                                            shops.shops?.map((shop, key) => {
                                                return(
                                                    <option key={shop.id} value={getShopName(shop.id)}>{shop.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <input type="date" name="dateA"  value={formValues.dateA} onChange={handleChange}/>
                                    <input type="date" name="dateD"  value={formValues.dateD} onChange={handleChange}/>
                                    <button type="submit" onClick={handleSubmit}>Rechercher</button>
                                </div>
                            </form>
                        </div>
                        <>
                            {
                                catalog.catalogList?.length !== 0 ?  <div className="container1 my-5 py-5">
                                    <div className="buttons d-flex mb-5 pb-5">
                                        <button className="butt" onClick={() => setFilter(catalog.catalogList)}>Tout</button>
                                        <button className="butt" onClick={() => filterProduct("MAN")}>Homme</button>
                                        <button className="butt" onClick={() => filterProduct("WOMEN")}>Femme</button>
                                        <button className="butt" onClick={() => filterProduct("CHILDREN")}>Enfant</button>
                                    </div>
                                    <div className="row justify-content-center">
                                        {
                                            catalog.catalogList?.map((product) => {
                                                return(
                                                    <div key={product.id} className="col-md-4 mb-4" >
                                                        <div className="card_product h-100 text-center p-4">
                                                            <img src={"http://commerce.intersport-rent.local/media/image/" + product.image} className="card-img-top" alt={product.name} height="250px"/>
                                                            {/*<img src={logo} className="card-img-top" alt={product.name} height="250px"/>*/}
                                                            <div className="card-body">
                                                                <h5 className="card-title">{product.name}</h5>
                                                                {/*<h5 className="card-title">{product.name}...</h5>*/}
                                                                <p className="card-text lead fw-bold">{product.basePrice} €</p>
                                                                {/*<button className="btn1" onClick={() => addProduct(product)}>*/}
                                                                {/*    <i className='bx bxs-cart-add icon_product'></i>*/}
                                                                {/*</button>*/}
                                                                <NavLink to={{
                                                                    pathname:`/catalogue/${product.id}`,
                                                                    product: {product}
                                                                }} ><button className="btn btn-primary btn1">Réserver</button>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>: <div className="text-error">{getErrorMessage(catalog.error.message)}</div>
                            }
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalog;
