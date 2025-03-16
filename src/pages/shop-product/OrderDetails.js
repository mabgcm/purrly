import React, { Fragment, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path as necessary
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";

const OrderDetails = () => {
    let { pathname } = useLocation();
    let { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderDoc = await getDoc(doc(db, "orders", id));
                if (orderDoc.exists()) {
                    const orderData = { id: orderDoc.id, ...orderDoc.data() };
                    setOrder(orderData);
                } else {
                    console.error("No such order!");
                    setError("Order not found");
                }
            } catch (error) {
                console.error("Error fetching order:", error);
                setError("Error fetching order data");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <Fragment>
            <SEO
                titleTemplate="Order Details"
                description="Order details page of flone react minimalist eCommerce template."
            />

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Order Details", path: process.env.PUBLIC_URL + pathname },
                    ]}
                />

                {/* Order details */}
                <div className="order-details-content">
                    <h2>Order Details</h2>
                    <p><strong>Product Name:</strong> {order.productName}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Price:</strong> {order.currency} {order.price}</p>
                    <p><strong>User:</strong> {order.user.email}</p>
                    <p><strong>Shipment Status:</strong> {order.shipmentStatus}</p>
                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>

                    <h3>Selected Options:</h3>
                    <ul>
                        {Object.entries(order.selectedOptions).map(([option, value]) => (
                            <li key={option}><strong>{option}:</strong> {value}</li>
                        ))}
                    </ul>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default OrderDetails;
