import Catalog from "./pages/Catalog";
import Orders from "./pages/Orders";
import Promotions from "./pages/Promotions";
import Notifications from "./pages/Notifications";
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
        path: "/notifications",
        name: "Notifications",
        icon: "bx bxs-notification",
        component: Notifications,
    },
    {
        path: "/contact",
        name: "Contactez-Nous",
        icon: "bx bxs-contact",
        component: Contact,
    },
];

export default dashboardRoutes;
