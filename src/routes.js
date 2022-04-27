import Catalog from "./pages/catalog/Catalog";
import Orders from "./pages/orders/Orders";
import Promotions from "./pages/Promotions";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "bx bxs-dashboard",
        component: Dashboard,
    },
    {
        path: "/catalogue",
        name: "Catalogue",
        icon: "bx bx-cart",
        component: Catalog,
    },
    {
        path: "/commandes",
        name: "Commandes",
        icon: "bx bxl-shopify",
        component: Orders,
    },
    {
        path: "/promotions",
        name: "Promotions",
        icon: "bx bxs-cart-download",
        component: Promotions,
    },
    {
        path: "/contact",
        name: "Contactez-Nous",
        icon: "bx bxs-contact",
        component: Contact,
    },
];

export default dashboardRoutes;
