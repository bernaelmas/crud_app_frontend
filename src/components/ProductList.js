import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = () => {
    axios.get('https://internship-crud-app-backend.vercel.app/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  };

  const deleteProduct = (id) => {
    axios.delete(`https://internship-crud-app-backend.vercel.app/api/products/${id}`)
      .then(response => {
        fetchProducts();
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  const startEditing = (product) => {
    setEditingProduct(product);
  };

  const stopEditing = () => {
    setEditingProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='list-container'>
      <h2>Product List</h2>
      {products.length === 0 ? <p>No products found.</p> : null}
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <p>
            {product.name} 
            </p>
            <p>
            {product.quantity} 
            </p>
            <p>
            {product.price} 
            </p>

            <button onClick={() => startEditing(product)}>Edit</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingProduct && (
        <ProductForm product={editingProduct} onProductUpdated={fetchProducts} onEditEnd={stopEditing} />
      )}
    </div>
  );
};

export default ProductList;
