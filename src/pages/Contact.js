import React from 'react';
import sidebarImage from "../assets/img/img.jpg";
import Sidebar from "../components/Sidebar";
import routes from "../routes";
import Navbar from "../components/NavBar";
import FixedPlugin from "../components/FixedPlugin";
import "./Contact.css";

const Contact = () => {
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const mainPanel = React.useRef(null);
    return (
        <>
            <div className="wrapper">
                <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    <Navbar />
                    <div className="content2">
                        <div className="container">
                            <div className="content1">
                                <div className="left-side">
                                    <div className="address details">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <div className="topic">Adresse</div>
                                        <div className="text-one"></div>
                                        <div className="text-two"></div>
                                    </div>
                                    <div className="phone details">
                                        <i className="fas fa-phone-alt"></i>
                                        <div className="topic">Tel</div>
                                        <div className="text-one">09 69 32 18 19</div>
                                    </div>
                                    <div className="email details">
                                        <i className="fas fa-envelope"></i>
                                        <div className="topic">Email</div>
                                        <div className="text-one"></div>
                                        <div className="text-two"></div>
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="topic-text">Contactez-nous</div>
                                    <p>Si vous avez une question, nous vous proposons de contacter notre Service Clients en remplissant le formulaire suivant.
                                        Nous vous répondrons dans les meilleurs délais.</p>
                                    <form action="#">
                                        <div className="input-box">
                                            <input type="text" placeholder="Nom"/>
                                        </div>
                                        <div className="input-box">
                                            <input type="text" placeholder="Adresse email"/>
                                        </div>
                                        <div className="input-box message-box">
                                            <textarea></textarea>
                                        </div>
                                        <div className="button">
                                            <input type="button" value="Envoyer"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FixedPlugin
                hasImage={hasImage}
                setHasImage={() => setHasImage(!hasImage)}
                color={color}
                setColor={(color) => setColor(color)}
                image={image}
                setImage={(image) => setImage(image)}
            />
        </>
    );
};

export default Contact;
