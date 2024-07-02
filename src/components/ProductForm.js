import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded, product, onProductUpdated, onEditEnd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setQuantity(product.quantity);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      quantity: Number(quantity),
      price: Number(price)
    };

    if (product) {
      axios.put(`http://localhost:5173/api/products/${product._id}`, newProduct)
        .then(response => {
          onProductUpdated();
          onEditEnd();
        })
        .catch(error => {
          console.error('There was an error updating the product!', error);
        });
    } else {
      axios.post('http://localhost:5173/api/products', newProduct)
        .then(response => {
          onProductAdded();
          setName('');
          setQuantity('');
          setPrice('');
        })
        .catch(error => {
          console.error('There was an error adding the product!', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
      {product && <button type="button" onClick={onEditEnd}>Cancel</button>}
    </form>
  );
};

export default ProductForm;
