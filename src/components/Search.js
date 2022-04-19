import React, {useState} from 'react';
import {fetchCountOrderData} from "../store/orders";
import {useDispatch, useSelector} from "react-redux";
import {fetchCatalogData} from "../store/catalog";

const Search = () => {
    const initialValues = { shop: "", dateA: "", dateD: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchCatalogData(auth.access_token, formValues));
    }

    return (
        <div className="body1">
                <form >
                    <div className="form_content">
                        <select name="shop" defaultValue={'DEFAULT'} onChange={handleChange}>
                            <option value="DEFAULT" disabled>Magasin</option>
                            <option value="1061">Magasin1</option>
                            <option value="1061">Magasin2</option>
                            <option value="3">Magasin3</option>
                        </select>
                        <input type="date" name="dateA"  value={formValues.dateA} onChange={handleChange}/>
                        <input type="date" name="dateD"  value={formValues.dateD} onChange={handleChange}/>
                        <button type="submit" onClick={handleSubmit}>Rechercher</button>
                    </div>
                </form>
        </div>

    );
};

export default Search;
