import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/BasketSlice";
import LoadingComponent from "../../app/layout/Loading";

const stripePromise = loadStripe("pk_test_51PWqO5GfoWQq9mvgYDsfDoBofKmLu3K2ci07Dfa03bacEdZNsIUyrK7WZ59513WaaYOWJ77bosbgi0hJpAZfCDJM00L6bzKXss")

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [dispatch])

    if (loading) return <LoadingComponent message="Loading" />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}