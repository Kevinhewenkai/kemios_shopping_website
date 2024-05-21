import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/Loading";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        agent.Catalog.list()
            .then(_products => setProducts(_products))
            .catch(error => console.log(error))
            .finally(() => {setLoading(false)})
    }, [])

    if (loading) return <LoadingComponent message="Loading Products" />
  
    return (
        <>
            <ProductList products={products} />
        </>
    )
}