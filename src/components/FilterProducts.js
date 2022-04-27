import React from 'react';
import {useDispatch} from "react-redux";

const FilterProducts = ({formValues, fetchCatalogData}) => {

    const dispatch = useDispatch();

    const filterProducts = (e) => {
        const {name, value} = e.target;
        dispatch(fetchCatalogData(`catalog/${formValues.shop}?startDate=${formValues.dateA}&endDate=${formValues.dateD}&gender=${name}`));
    };

    return (
        <div className="buttons d-flex mb-5 pb-5">
            <button className="butt" onClick={() => {
                if(formValues.massif, formValues.station && formValues.shop && formValues.dateA && formValues.dateD){
                    dispatch(fetchCatalogData(`catalog/${formValues.shop}?startDate=${formValues.dateA}&endDate=${formValues.dateD}`));
                }
            }}>Tout</button>
            <button className="butt" name="MAN" onClick={(e) => filterProducts(e)}>Homme</button>
            <button className="butt" name="WOMAN" onClick={(e) => filterProducts(e)}>Femme</button>
            <button className="butt" name="CHILDREN" onClick={(e) => filterProducts(e)}>Enfant</button>
        </div>
    );
};

export default FilterProducts;
