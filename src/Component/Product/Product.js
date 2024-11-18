// Product.js
import React, { useEffect, useState, useContext } from 'react';
import { fetchProducts } from './fetchProducts';
// In both Cart.js and Product.js
import { CartContext } from '../../context/CartContext';


import './product.css';

const Product = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext); // Get addToCart from context

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await fetchProducts();
                setProductList(products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-list">
            {productList.map(product => (
                <div className="product-item" key={product.id} >
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.describe}</p>
                    <p>Price: {product.price}</p>
                    <button onClick={() => addToCart(product)}>MUA</button> {/* Add to cart on click */}
                </div>
            ))}
        </div>
    );
};

export default Product;
