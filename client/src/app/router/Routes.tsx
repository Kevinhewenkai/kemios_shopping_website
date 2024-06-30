import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../feature/home/HomePage";
import Catalog from "../../feature/Catalog/Catalog";
import ProductDetailPage from "../../feature/Catalog/ProductDetail";
import AboutPage from "../../feature/about/AboutPage";
import ContactPage from "../../feature/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../feature/basket/BasketPage";
import Login from "../../feature/account/Login";
import Register from "../../feature/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../../feature/orders/Orders";
import CheckoutWrapper from "../../feature/checkout/CheckoutWrapper";
import Inventory from "../../feature/admin/Inventory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // authenticated routes
        element: <RequireAuth />, children: [
          { path: '/checkout', element: <CheckoutWrapper /> },
          { path: '/orders', element: <Orders /> },
        ]
      },
      {
        // admin routes
        element: <RequireAuth roles={['Admin']} />, children: [
          { path: '/inventory', element: <Inventory /> },
        ]
      },
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetailPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "basket", element: <BasketPage /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
