import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";

export default function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    const products = useAppSelector(productSelectors.selectAll)
    const { productsLoaded, status } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
        // agent.Catalog.list()
        //     .then(_products => setProducts(_products))
        //     .catch(error => console.log(error))
        //     .finally(() => {setLoading(false)})
        if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded])

    // if (loading) return <LoadingComponent message="Loading Products" />
    if (status.includes('pending')) return <LoadingComponent message="Loading Products" />
  
    return (
        <>
            <ProductList products={products} />
        </>
    )
}