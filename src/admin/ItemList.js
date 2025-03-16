import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ItemList = ({ items, type, handleEdit, handleDelete }) => {
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

export default ItemList;
