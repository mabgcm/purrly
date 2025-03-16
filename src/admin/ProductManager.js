import React, { useState, useEffect } from "react";
import { addProduct, getProducts, updateProduct, deleteProduct, getOrders, getCustomers, addOrder, updateOrder, deleteOrder } from "../firebaseService";
import { productOptions } from "./optionsConfig";
import Popup from "./Popup";
import { FaEdit, FaTrash } from 'react-icons/fa';
import './dash.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductManager = () => {
    const [activeSection, setActiveSection] = useState('products'); // Default section
    const [product, setProduct] = useState({
        name: "",
        price: "",
        discountedPrice: "",
        description: "",
        category: [],
        images: [],
        options: productOptions,
        reviews: []
    });
    const [order, setOrder] = useState({
        id: "",
        customerName: "",
        // Add other order fields as necessary
    });
    const [images, setImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [popupMessage, setPopupMessage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    useEffect(() => {
        fetchProducts();
        fetchOrders();
        fetchCustomers();
    }, []);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const fetchedOrders = await getOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const fetchedCustomers = await getCustomers();
            setCustomers(fetchedCustomers);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (e) => {
        setProduct({ ...product, category: e.target.value.split(",").map(cat => cat.trim()) });
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                ...product,
                category: Array.isArray(product.category) ? product.category : product.category.split(',').map(cat => cat.trim())
            };
            if (currentProductId) {
                await updateProduct(currentProductId, updatedProduct, images);
                setIsEditing(false);
                setCurrentProductId(null);
                setPopupMessage("Product updated successfully!");  // Set success message
            } else {
                await addProduct(updatedProduct, images);
                setPopupMessage("Product added successfully!");  // Set success message
            }
            fetchProducts(); // Refresh product list
            setProduct({
                name: "",
                price: "",
                discountedPrice: "",
                description: "",
                category: [],
                images: [],
                options: productOptions,
                reviews: []
            }); // Reset form
            setImages([]); // Reset images
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error("Error saving product:", error);
            setPopupMessage("Error saving product.");  // Set error message
        }
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentOrderId) {
                await updateOrder(currentOrderId, order); // Ensure updateOrder function is implemented in firebaseService
                setIsEditing(false);
                setCurrentOrderId(null);
                setPopupMessage("Order updated successfully!");  // Set success message
            } else {
                await addOrder(order); // Ensure addOrder function is implemented in firebaseService
                setPopupMessage("Order added successfully!");  // Set success message
            }
            fetchOrders(); // Refresh order list
            setOrder({
                id: "",
                customerName: "",
                // Reset other order fields as necessary
            }); // Reset form
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error("Error saving order:", error);
            setPopupMessage("Error saving order.");  // Set error message
        }
    };

    const handleEdit = (item, type) => {
        setSelectedItem(item);
        if (type === 'product') {
            setProduct({
                ...item,
                category: item.category.join(", "),
                images: item.images || [],
                options: item.options || productOptions
            });
            setIsEditing(true);
            setCurrentProductId(item.id);
        } else if (type === 'order') {
            setOrder(item); // Assuming you have an order state similar to the product state
            setIsEditing(true);
            setCurrentOrderId(item.id); // Add state for current order ID
        }
    };

    const handleDelete = async (id, type) => {
        setConfirmAction(() => async () => {
            try {
                if (type === 'product') {
                    await deleteProduct(id);
                    fetchProducts();
                    setPopupMessage("Product deleted successfully!");  // Set success message
                } else if (type === 'order') {
                    await deleteOrder(id); // Ensure deleteOrder function is implemented in firebaseService
                    fetchOrders();
                    setPopupMessage("Order deleted successfully!");  // Set success message
                }
                setConfirmAction(null);
            } catch (error) {
                console.error("Error deleting item:", error);
                setPopupMessage("Error deleting item.");  // Set error message
            }
        });
        setPopupMessage("Are you sure you want to delete this item?");
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const renderList = (items, type) => {
        return (
            <ul className="list-group">
                {items.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span onClick={() => handleEdit(item, type)} style={{ cursor: 'pointer' }}>
                            {type === 'product' ? item.name : `Order #${item.id}`}
                        </span>
                        <span>
                            <FaEdit className="me-3" style={{ cursor: 'pointer' }} onClick={() => handleEdit(item, type)} />
                            <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id, type)} />
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    const renderDetail = (item, type) => {
        if (type === 'product') {
            return (
                <div className="card p-3">
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Product Name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                placeholder="Price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Discounted Price (optional)</label>
                            <input
                                type="number"
                                name="discountedPrice"
                                className="form-control"
                                placeholder="Discounted Price"
                                value={product.discountedPrice}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                placeholder="Description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category (comma separated)</label>
                            <input
                                type="text"
                                name="category"
                                className="form-control"
                                placeholder="Category"
                                value={product.category}
                                onChange={handleCategoryChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Images</label>
                            {product.images.map((img, idx) => (
                                <div key={idx} className="d-inline-block position-relative me-2">
                                    <img src={img} alt={`Product Thumbnail ${idx}`} className="img-thumbnail" style={{ width: '100px', height: 'auto' }} />
                                    <button
                                        type="button"
                                        className="btn-close position-absolute top-0 end-0"
                                        onClick={() => setProduct({
                                            ...product,
                                            images: product.images.filter((_, i) => i !== idx)
                                        })}
                                    ></button>
                                </div>
                            ))}
                            <input
                                type="file"
                                multiple
                                className="form-control"
                                onChange={handleImageChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            {currentProductId ? "Update Product" : "Add Product"}
                        </button>
                    </form>
                </div>
            );
        } else if (type === 'order') {
            return (
                <div className="card p-3">
                    <form onSubmit={handleOrderSubmit} className="order-form">
                        <div className="mb-3">
                            <label className="form-label">Order ID</label>
                            <input
                                type="text"
                                name="orderId"
                                className="form-control"
                                placeholder="Order ID"
                                value={order.id}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Customer Name</label>
                            <input
                                type="text"
                                name="customerName"
                                className="form-control"
                                placeholder="Customer Name"
                                value={order.customerName}
                                onChange={handleOrderChange}
                                required
                            />
                        </div>
                        {/* Add more order fields as necessary */}
                        <button type="submit" className="btn btn-primary w-100">
                            {currentOrderId ? "Update Order" : "Add Order"}
                        </button>
                    </form>
                </div>
            );
        }
    };

    const filteredProducts = products.filter(prod => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            prod.name.toLowerCase().includes(searchTerm) ||
            prod.description.toLowerCase().includes(searchTerm) ||
            (Array.isArray(prod.category) && prod.category.join(' ').toLowerCase().includes(searchTerm)) ||
            prod.price.toString().includes(searchTerm) ||
            (prod.discountedPrice && prod.discountedPrice.toString().includes(searchTerm))
        );
    });

    const resetEditing = () => {
        setIsEditing(false);
        setSelectedItem(null);
        setCurrentProductId(null);
        setCurrentOrderId(null);
    };

    return (
        <div>
            {popupMessage && (
                <Popup
                    message={popupMessage}
                    onClose={() => { setPopupMessage(null); setConfirmAction(null); }}
                    onConfirm={confirmAction}
                    isConfirm={!!confirmAction}
                />
            )}
            {activeSection === 'products' && (
                <div>
                    <h3 className="text-center my-3">Products</h3>
                    <div className="d-flex justify-content-center my-3">
                        <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button
                        onClick={() => {
                            setProduct({
                                name: "",
                                price: "",
                                discountedPrice: "",
                                description: "",
                                category: [],
                                images: [],
                                options: productOptions,
                                reviews: []
                            });
                            setIsEditing(true);
                            setSelectedItem(null);
                            setCurrentProductId(null);
                        }}
                        className="btn btn-success d-block mx-auto my-3"
                    >
                        Add Product
                    </button>
                    {isEditing ? renderDetail(selectedItem, 'product') : (
                        <div className="list-group">
                            {renderList(filteredProducts, 'product')}
                        </div>
                    )}
                </div>
            )}
            {activeSection === 'orders' && (
                <div>
                    <h3 className="text-center">Orders</h3>
                    {isEditing ? renderDetail(selectedItem, 'order') : (
                        <div className="list-group">
                            {renderList(orders, 'order')}
                        </div>
                    )}
                </div>
            )}
            {activeSection === 'customers' && (
                <div>
                    <h3 className="text-center">Customers</h3>
                    {isEditing ? renderDetail(selectedItem, 'customer') : renderList(customers, 'customer')}
                </div>
            )}
        </div>
    );
};

export default ProductManager;
