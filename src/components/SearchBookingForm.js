import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {catalogActions} from "../store/catalog";
import {Container} from "react-bootstrap";
import {shopActions} from "../store/shop";
import {cartActions} from "../store/cart";
import {authActions} from "../store/auth";
import {useDispatch, useSelector} from "react-redux";

const SearchBookingForm = ({formValues, setCatalogList, setError, setMassifId, setStationId, fetchCatalogData}) => {

    const shops = useSelector((state) => state.shop.shops);
    const massifs = useSelector((state) => state.shop.massifs);
    const stations = useSelector((state) => state.shop.stations);
    const [startDate, setStartDate] = useState(new Date(formValues.dateA));
    const [endDate, setEndDate] = useState(new Date(formValues.dateD));
    const dispatch = useDispatch();

    const getMassifName = (id) => {
        if (id === null){
            return "-- Massif --";
        }
        for(let i= 0; i < massifs.massifs?.length; i++){
            if (massifs.massifs[i].id === id){
                return(massifs.massifs[i].name);
            }
        }
    };

    const getStationName = (id) => {
        if (id === null){
            return "-- Station --";
        }
        for(let i= 0; i < stations.stations?.length; i++){
            if (stations.stations[i].id === id){
                return(stations.stations[i].name);
            }
        }
    };

    const getShopName = (id) => {
        if (id === null){
            return "-- Magazin --";
        }
        for(let i= 0; i < shops.shops?.length; i++){
            if (shops.shops[i].id === id){
                return(shops.shops[i].name);
            }
        }
    };

    const handleMassif = async (event)=>{
        event.preventDefault();
        const {name, value} = event.target;
        await dispatch(shopActions.addStation([]));
        await dispatch(shopActions.addShop([]));
        await dispatch(cartActions.clearCart());
        setStartDate();
        setEndDate();
        setCatalogList([]);
        setError('');
        const massifId = value;
        setMassifId(massifId);
        dispatch(catalogActions.addMassif(value));
    };

    const handleStation = async(event)=>{
        event.preventDefault();
        const {name, value} = event.target;
        await dispatch(shopActions.addShop([]));
        setStartDate();
        setEndDate();
        await dispatch(cartActions.clearCart());
        setCatalogList([]);
        setError('');
        const stationId = value;
        setStationId(stationId);
        dispatch(catalogActions.addStation(value));
    };

    const handleShop =( event) => {
        event.preventDefault();
        dispatch(cartActions.clearCart());
        setCatalogList([]);
        setError('');
        setStartDate();
        setEndDate();
        const {name, value} = event.target;
        dispatch(catalogActions.addShop(value));
    };

    const onChangeDateHandler = (value) => {
        setCatalogList([]);
        setError('');
        dispatch(cartActions.clearCart());
        setStartDate(value[0]);
        dispatch(catalogActions.addFormValues({...formValues, dateA:new Date(value[0]).toLocaleDateString('fr-CA')}));
        setEndDate(value[1]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(cartActions.clearCart());
        setCatalogList([]);
        setError('');
        // dispatch(catalogActions.addCatalog([]));
        await dispatch(fetchCatalogData(`catalog/${formValues.shop}?startDate=${formValues.dateA}&endDate=${formValues.dateD}`));
        dispatch(catalogActions.setStorageCatalogData());
        dispatch(authActions.getStorageAuthData());
    };


    return (
        <Container className="content mt-5" >
            <div className="row">
                <div className="col-sm-12">
                    <div className="row mb-3">
                        <div className="form-group col-md-3 mt-4">
                            <select name="massif" defaultValue={formValues.massif} className="form-control mb-3 select" onChange={(e)=>handleMassif(e)}>
                                <option defaultValue={getMassifName(formValues.massif)}>{getMassifName(formValues.massif)}</option>
                                {
                                    massifs.massifs.map( (massif,index)=>(
                                        <option key={index} value={massif.id}> {massif.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-3 mt-4">
                            <select name="station" defaultValue={formValues.station} className="form-control mb-3 select" onChange={(e)=>handleStation(e)}>
                                <option defaultValue={getStationName(formValues.station)}>{getStationName(formValues.station)}</option>
                                {
                                    stations.stations?.map( (station,index)=>(
                                        <option key={index} value={station.id}> {station.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-3 mt-4">
                            <select name="shop" defaultValue={formValues.shop} className="form-control mb-3 select" onChange={(e)=>handleShop(e)}>
                                <option defaultValue={getShopName(formValues.shop)}>{getShopName(formValues.shop)}</option>
                                {
                                    shops.shops?.map( (shop,index)=>(
                                        <option key={index} value={shop.id}> {shop.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-2 mt-4">
                            <DatePicker className="form-control mb-3 selectDate"
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={onChangeDateHandler}
                                        dateFormat="yyyy/MM/dd"
                                        isClearable={true}
                                        locale="fr"
                                        minDate={new Date()}
                                        placeholderText="1er jour de ski -- Dernier jour"
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                            />
                        </div>
                        <div className="form-group col-md-1 mt-4">
                            <button style={{border:"1px solid lightblue", backgroundColor:"aliceblue", color:"blue", borderRadius:"10px", marginTop:"6px"}} onClick={() =>
                                dispatch(catalogActions.addFormValues({...formValues, dateD:new Date(endDate).toLocaleDateString('fr-CA')}))}>
                                Valider</button>
                        </div>
                        <div className="form-group col-md-12 mt-4">
                            <button className="button" type="submit" onClick={handleSubmit} >Rechercher</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SearchBookingForm;
