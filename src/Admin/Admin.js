import React, { useEffect, useState } from 'react';
import './Admin.css';
import UserManagement from './UserManagement';
export default function Admin() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState("product");
    const [formValues, setFormValues] = useState({ name: '', price: '', image: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    // Fetch products from the API
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('http://localhost:9000/product-api/getProductLists');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Handle delete product
    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:9000/product-api/delProduct?id=${id}`);
            const result = await res.json();
            if (result.status === 1) {
                setProducts(products.filter(product => product._id !== id));
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    // Handle edit product
    async function handleEditSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch(`http://localhost:9000/product-api/editProduct?id=${editingProduct._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            const result = await res.json();
            if (result.status === 1) {
                setProducts(products.map(product => (product._id === editingProduct._id ? { ...product, ...formValues } : product)));
                setEditingProduct(null);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error editing product:", error);
            alert(`Error: ${error.message}`);
        }
    }

    // Handle add new product
    async function handleAddSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch('http://localhost:9000/product-api/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            const result = await res.json();
            if (result.status === 1) {
                setProducts([...products, result.product]);
                setFormValues({ name: '', price: '', image: '' });
                setIsAdding(false);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert(`Error: ${error.message}`);
        }
    }

    // Handle form input change
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    // Switch between different sections
    const renderContent = () => {
        switch (selectedTab) {
            case "product":
                return (
                    <>
                        <h2>Quản lý sản phẩm</h2>
                        <button onClick={() => setIsAdding(true)}>Add New Product</button>
                        {loading && <p>Loading products...</p>}
                        {error && <p>Error: {error}</p>}
                        <div className="product-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>
                                                {/* Display product image instead of eye icon */}
                                                <img
                                                    src={product.image} // Product image URL
                                                    alt={product.name} // Alt text for the image
                                                    className="product-image" // Add a class for styling
                                                />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button
                                                    className="eye-icon"
                                                    onClick={() => alert('Viewing product details')}
                                                >
                                                    👁
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => { setEditingProduct(product); setFormValues({ name: product.name, price: product.price, image: product.image }); }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </>
                );
            case "category":
                return <h2>Quản lý danh mục</h2>; // Replace with Category Management logic
            case "user":
                return <UserManagement />; // Replace with User Management logic
            default:
                return <h2>Quản lý sản phẩm</h2>;
        }
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <h2>ADMIN</h2>
                <ul>
                    <li onClick={() => setSelectedTab("product")}>Quản lý sản phẩm</li>
                    <li onClick={() => setSelectedTab("category")}>Quản lý danh mục</li>
                    <li onClick={() => setSelectedTab("user")}>Quản lý user</li>
                </ul>
            </div>

            <div className="content">
                {renderContent()}

                {editingProduct && (
                    <div className="edit-form">
                        <h3>Edit Product</h3>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" value={formValues.name} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Price:
                                <input type="number" name="price" value={formValues.price} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Image URL:
                                <input type="text" name="image" value={formValues.image} onChange={handleInputChange} required />
                            </label>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                        </form>
                    </div>
                )}

                {isAdding && (
                    <div className="add-form">
                        <h3>Add New Product</h3>
                        <form onSubmit={handleAddSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" value={formValues.name} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Price:
                                <input type="number" name="price" value={formValues.price} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Image URL:
                                <input type="text" name="image" value={formValues.image} onChange={handleInputChange} required />
                            </label>
                            <button type="submit">Add Product</button>
                            <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
