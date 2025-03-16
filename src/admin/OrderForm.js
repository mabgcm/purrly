import React from 'react';

const OrderForm = ({ order, handleOrderChange, handleOrderSubmit, currentOrderId }) => {
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
};

export default OrderForm;
