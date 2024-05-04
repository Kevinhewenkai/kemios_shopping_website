import { Product } from "../../app/models/product";
import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
  
    function addProduct() {
      setProducts(prev => [...prev,
        {
          id: prev.length + 101,
          name: 'product' + (prev.length + 1),
          price: (prev.length * 100) + 100,
          brand: 'some brand',
          description: 'some description',
          pictureUrl: 'http://picsum.photos/200'
        } as Product])
    }

    return (
        <>
            <ProductList products={products} />
            <Button onClick={addProduct} variant="contained">Add Product</Button>
        </>
    )
}