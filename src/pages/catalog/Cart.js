import React, {useEffect, useRef, useState} from 'react';
import Sidebar from "../../components/Sidebar";
import routes from "../../routes";
import Navbar from "../../components/NavBar";
import sidebarImage from "../../assets/img/img.jpg";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../store/cart";
import {Stepper, StepLabel, Step} from "@material-ui/core";
import { Card } from "react-bootstrap";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from "../../components/ProductCard";
import BookingCard from "../../components/BookingCard";
import SummaryCard from "../../components/ SummaryCard";

toast.configure();

const Cart = () => {
    const [image, setImage] = useState(sidebarImage);
    const [color, setColor] = useState("black");
    const [hasImage, setHasImage] = useState(true);
    const mainPanel = useRef(null);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(1);

    const showStep = (step) => {
      switch (step) {
          case 1 :
              return (
                <ProductCard onChangeStep={setCurrentStep} cart={cart}/>
              )
          case 2 :
              return (
                  <BookingCard onChangeStep={setCurrentStep}/>
              )
          case 3 :
              return (
                  <SummaryCard onChangeStep={setCurrentStep}/>
              )
      }
    };

    useEffect(() => {
        dispatch(cartActions.setStorageCartData());
    });

    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <Navbar />
                    <div className="content">
                        <div className="center-stepper">
                            <Stepper className="stepper" activeStep={currentStep - 1 } orientation="horizontal">
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                            </Stepper>
                        </div>
                        { cart.cart.length===0?
                            <Card className="card-stats" style={{border:"1px solid lightblue", height:"100px", marginLeft:"15%", marginRight:"15%"}}>
                                <Card.Body>
                                    <p style={{ marginLeft:"35%", fontSize:"1.6em", color:"gray"}}>Aucun produit dans votre panier</p>
                                </Card.Body>
                            </Card>
                            : showStep(currentStep)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
