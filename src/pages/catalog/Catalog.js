import React, {useEffect, useRef, useState} from 'react';
import sidebarImage from "../../assets/img/img.jpg";
import Sidebar from "../../components/Sidebar";
import routes from "../../routes";
import Navbar from "../../components/NavBar";
import "react-datepicker/dist/react-datepicker.css";
import {catalogActions} from "../../store/catalog";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {shopActions} from "../../store/shop";
import {Container, Row, Col} from "react-bootstrap";
import { registerLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
import {fetchData} from "../../response";
import globalVariables from "../../store/state";
import SearchBookingForm from "../../components/SearchBookingForm";
import FilterProducts from "../../components/FilterProducts";
import CatalogCart from "../../components/CatalogCart";
import {cartActions} from "../../store/cart";
import {notificationActions} from "../../store/notif";
import {toast} from "react-toastify";
registerLocale('fr', fr)

const Catalog = () => {
    const [image, setImage] = useState(sidebarImage);
    const [color, setColor] = useState("black");
    const [hasImage, setHasImage] = useState(true);
    const mainPanel = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const formValues = useSelector((state) => state.catalog.formValues);
    const auth = useSelector((state) => state.auth);
    const [massifId, setMassifId]= useState('');
    const [catalogList, setCatalogList]= useState([]);
    const [error, setError]= useState([]);
    const [stationId, setStationId]= useState('');


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
    };


    const  searchProduct =(product)=>{
        dispatch(shopActions.addProduct(product));
        if(product.includedItems.length === 0){
            history.push('/product');
        }else {
            const list = product.optionalItems?.filter((x) => x.productItemType === "service");
            if (list.length === 0) {
                history.push('/product_without_services');
            } else {
                history.push('/product_services');
            }
        }
    };

    const fetchCatalogData = (path) => {
        return async () => {
            const fetchCatalogData = async () => {
                const response = await fetchData(auth.access_token, path, 'GET');
                if (!response.ok) {
                    response.json().then(data => ({
                        data: data,
                        status: response.status
                     })).then(res => {
                        setError(res.data.message);
                });
                }else{
                    const catalogData = await response.json();
                    setCatalogList(catalogData);
                }
            };
            await fetchCatalogData();
        };
    };

    useEffect(() => {
        dispatch(catalogActions.setStorageCatalogData());
    });

    useEffect(() => {
        if(formValues.massif, formValues.station && formValues.shop && formValues.dateA && formValues.dateD){
            dispatch(fetchCatalogData(`catalog/${formValues.shop}?startDate=${formValues.dateA}&endDate=${formValues.dateD}`));
        }
    },[]);

    useEffect( ()=>{
        const fetchStations= async ()=>{
            const response = await fetchData(auth.access_token, `${massifId}/stations`, 'GET');
            if (!response.ok) {
                throw new Error('Error!');
            }
            const getStations= await response.json();
            await dispatch(shopActions.addStation(getStations));
            await dispatch(shopActions.setStorageShopData());
        };
        if(massifId !== ""){
            fetchStations();
        }
    },[massifId]);

    useEffect( ()=>{
        const fetchShops= async ()=>{
            const response = await fetchData(auth.access_token, `${stationId}/shops`, 'GET');
            if (!response.ok) {
                throw new Error('Error!');
            }
            const getShops= await response.json();
            await dispatch(shopActions.addShop(getShops));
            await dispatch(shopActions.setStorageShopData());
        };
        if(stationId !== ""){
            fetchShops();
        }
    },[stationId]);

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <Navbar />
                    <div className="content" >
                        <SearchBookingForm formValues={formValues} setCatalogList={setCatalogList} setError={setError} setMassifId={setMassifId} setStationId={setStationId} fetchCatalogData={fetchCatalogData}/>
                        <>
                            {
                                catalogList?.length !== 0 ?  <div className="container1 my-5 py-5">
                                    <FilterProducts formValues={formValues} fetchCatalogData={fetchCatalogData}/>
                                    <Container fluid>
                                        <Row>
                                            <Col lg="9" sm="12">
                                                <div className="row justify-content-center">
                                                    {
                                                        catalogList?.map((product, index) => {
                                                            return(
                                                                <div key={index} className="col-md-4 mb-4" >
                                                                    <div className="card_product h-100 text-center p-4">
                                                                        {
                                                                            product.includedItems[0]? <img src={globalVariables.imageUrl + product.includedItems[0].image} className="card-img-top" alt={product.name} height="250px"/>:
                                                                                <img src={globalVariables.imageUrl + product.image} className="card-img-top" alt={product.name} height="250px"/>
                                                                        }
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">{product.name}</h5>
                                                                            <p className="card-text lead fw-bold">{product.basePrice} €</p>
                                                                            <button className="btn btn-primary btn1" onClick={() => searchProduct(product)}>Réserver</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Col>
                                            <CatalogCart/>
                                        </Row>
                                    </Container>
                                </div>: <div className="text-error">{getErrorMessage(error)}</div>
                            }
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalog;
