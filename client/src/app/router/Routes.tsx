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
import CheckOutPage from "../../feature/checkout/CheckoutPage";
import Login from "../../feature/account/Login";
import Register from "../../feature/account/Register";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {element: <RequireAuth />, children: [
        { path: "checkout", element: <CheckOutPage /> },
      ]},
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
