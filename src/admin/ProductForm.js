import React from 'react';

const ProductForm = ({ product, handleChange, handleCategoryChange, handleImageChange, handleSubmit, currentProductId, images, setProduct }) => {
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
};

export default ProductForm;
