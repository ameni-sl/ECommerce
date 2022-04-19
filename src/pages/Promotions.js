import React from 'react';
import sidebarImage from "../assets/img/img.jpg";
import Sidebar from "../components/Sidebar";
import routes from "../routes";
import Navbar from "../components/NavBar";
import FixedPlugin from "../components/FixedPlugin";

const Promotions = () => {
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
                    <div className="content">
                        <div></div>
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

export default Promotions;
