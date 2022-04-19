import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function Country() {
    const [country, setCountry]= useState([]);
    const [countryid, setCountryid]= useState('');
    const [stetes, setSat]= useState([]);



    return (
        <Container className="content">
            <div className="row">
                <div className="col-sm-12">
                    <h5 className="mt-4 mb-4 fw-bold">Output  </h5>

                    <div className="row mb-3">
                        <div className="form-group col-md-4">
                            <label className="mb-2">Country</label>
                            <select name="country" className="form-control" >
                                <option>--Select Country--</option>

                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="mb-2">State</label>
                            <select name="state" className="form-control">
                                <option>--Select State--</option>

                            </select>
                        </div>

                        <div className="form-group col-md-2 mt-4">
                            <button className="btn btn-success mt-2" >Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    );
}
export default Country;
