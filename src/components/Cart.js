import React, { useState} from 'react';
import Sidebar from "./Sidebar";
import routes from "../routes";
import Navbar from "./NavBar";
import sidebarImage from "../assets/img/img.jpg";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../store/cart";
import {notificationActions} from "../store/notif";
import logo from "../assets/v-shape-v6.jpg";
import {Stepper, StepLabel, Step, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";



const Cart = () => {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);
    const cart = useSelector((state) => state.cart);
    const price = useSelector((state) => state.cart.price);
    const token = useSelector((state) => state.auth.access_token);
    const values = useSelector((state) => state.catalog.formValues);
    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shop.shops);
    const customer = useSelector((state) => state.cart.booking.bookingDetails.customer);
    const prod = useSelector((state) => state.cart.booking.bookingProducts);
    const catalog = useSelector((state) => state.catalog.formValues);

    const initialValues = {firstname: "", lastname: "", gender: "", email: "", phone: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formValues1, setFormValues1] = useState(prod);

    const initialVal = {number: "", pickUpDate: catalog.dateA, returnDate: catalog.dateD, discountCode: "", shopId: catalog.shop, customer: cart.booking.bookingDetails.customer};
    const [formVal, setFormVal] = useState(initialVal);
    const [currentStep, setCurrentStep] = useState(1);
    const [visible, setVisible] = useState(false);
    const history = useHistory();

    const handleChange2 = (e) => {
        const {name, value} = e.target;
        setFormVal({...formVal, [name]:value});
        dispatch(cartActions.addBookDetails({...formVal, [name]:value}));
    };

    const handleChange1 = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
        dispatch(cartActions.addCustomerDetails({...customer, [name]:value}));
    };

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        setFormValues1({...formValues1[index], [name]:value});
        dispatch(cartActions.addProductDetails( [index,{...prod[index].customerDetails, [name]:value}]));
    };


    const handleSubmit = (e) => {
        const fetchData = async () => {
            const response = await fetch(
                `http://commerce.intersport-rent.local/api/bookings`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Mode": 'no-cors'
                    },
                    body: JSON.stringify(cart.booking)
                });

            if (!response.ok) {
                setVisible(true);
            }else{
                history.push('/dashboard');
            }
        };
        fetchData();
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

    const removeProduct = (product) => {
        dispatch(cartActions.deleteItem(product));
        dispatch(cartActions.setStorageCartData());
        dispatch(notificationActions.addNotification({
            typeAlert: "warning",
            message: "Un produit est suprimé de votre panier"
        }));
    }

    const Modal = () => {
      return (
          <div className="modl" style={{
              transform: visible ? 'translateY(0vh)' : 'translateY(-100vh)',
              opacity: visible ? '1' : '0'
          }}>
              <button onClick={() => setVisible(false)}>X</button>
              <p>Erreur !</p>
          </div>
      )
    }

    const showStep = (step) => {
      switch (step) {
          case 1 :
              return (
              <>
                  {
                      cart.cart?.map((product, index) => {
                          return(
                              <div  key={index} className="row pro_cart">
                                  <div className="col-sm-3">
                                      <img className="img_cart" src={logo} alt={product.name}/>
                                      <div className="row lab">
                                          <div className="col-sm-8">
                                              <span>{product.name} </span>
                                          </div>
                                          <div className="col-sm-4">
                                              <span className="cart_lab">{product.basePrice.toFixed(2)} €</span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col-sm-8 infos">
                                      <TextField required label="Nom" variant="standard" className="textField" name="name"  value={prod[index]?.customerDetails.name} onChange={(e) => handleChange(e,index)}/>
                                      <TextField required label="Taille" variant="standard" className="textField" name="height" value={prod[index]?.customerDetails.height} onChange={(e) => handleChange(e,index)}/>
                                      <TextField required label="Poids" variant="standard" className="textField" name="weight" value={prod[index]?.customerDetails.weight} onChange={(e) => handleChange(e,index)}/>
                                      <TextField required label="Sexe" variant="standard" className="textField" name="gender"  value={prod[index]?.customerDetails.gender} onChange={(e) => handleChange(e,index)}/>
                                      <TextField required label="Age" variant="standard" className="textField" name="age" value={prod[index]?.customerDetails.age} onChange={(e) => handleChange(e,index)}/>
                                      <TextField required label="Pointure" variant="standard" className="textField" name="shoesSize" value={prod[index]?.customerDetails.shoesSize} onChange={(e) => handleChange(e,index)}/>
                                  </div>
                                  <div className="col-sm-1">
                                      <i className='bx bxs-trash icon_cart' onClick={() => removeProduct(product)}></i>
                                  </div>
                              </div>
                            )
                      })
                  }
                  <div className="row">
                      <div className="col-sm-9"></div>
                      <div className="col-sm-2">
                          <button className="btn_Next" onClick={() => setCurrentStep(2)}>Suivant</button>
                      </div>
                  </div>
              </>
              )
          case 2 :
              return (
                  <>
                      <span className="span">Récapitulatif de la commande:</span>
                      <div className="row pro_cart2">
                          <div className="col-sm-6">
                              <p className="order">Magasin: <span>{getShopName(values.shop)}</span></p>
                          </div>
                          <div className="col-sm-3">
                              <p className="order">1er jour de ski: <span>{values.dateA}</span></p>
                          </div>
                          <div className="col-sm-3">
                              <p className="order">Dernier jour: <span>{values.dateD}</span></p>
                          </div>
                         <div>
                             <span className="order_total">TOTAL: <span>{price.toFixed(2)} €</span></span>
                             <TextField className="span_code" label="Code Promo" variant="filled" name="discountCode" value={formValues.discountCode} onChange={handleChange2}/>
                             <p></p>
                             <TextField className="span_code" label="N° Réservation" variant="filled" name="number" value={formValues.number} onChange={handleChange2}/>
                         </div>
                      </div>
                      <div className="row">
                          <div className="col-sm-2">
                              <button className="btn_Prev" onClick={() => setCurrentStep(1)}>Retour</button>
                          </div>
                          <div className="col-sm-7"></div>
                          <div className="col-sm-2">
                              <button className="btn_Next" onClick={() => setCurrentStep(3)}>Suivant</button>
                          </div>
                      </div>
                  </>
              )
          case 3 :
              return (
                  <>
                      <span className="span">Dernière étape: Infos Client</span>
                      <div className="row pro_cart1">
                          <div  className="span_cod" >
                              <TextField className="span_code" label="Prénom" variant="filled" name="firstname" value={formValues.firstname} onChange={handleChange1}/>
                          </div>
                          <div  className="span_cod" >
                              <TextField className="span_code" label="Nom" variant="filled" name="lastname" value={formValues.lastname} onChange={handleChange1}/>
                          </div>
                          <div  className="span_cod" >
                              <TextField className="span_code" label="Sexe" variant="filled" name="gender" value={formValues.gender} onChange={handleChange1}/>
                          </div>
                          <div  className="span_cod" >
                              <TextField className="span_code" label="Email" variant="filled" name="email" value={formValues.email} onChange={handleChange1}/>
                          </div>
                          <div  className="span_cod" >
                              <TextField className="span_code" label="Tel" variant="filled" name="phone" value={formValues.phone} onChange={handleChange1}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-sm-2">
                              <button className="btn_Prev" onClick={() => setCurrentStep(2)}>Retour</button>
                          </div>
                          <div className="col-sm-7"></div>
                          <div className="col-sm-2">
                              <button className="btn_Next" onClick={handleSubmit}>Réserver</button>
                          </div>
                      </div>
                      <Modal />
                  </>
              )
      }
    }

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
                        { showStep(currentStep)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
