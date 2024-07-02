// src/App.js

import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  const [updateList, setUpdateList] = useState(false);

  const handleProductAdded = () => {
    setUpdateList(!updateList); // Listeyi yeniden yükle
  };

  return (
    <div>
      <h1>Product Management</h1>
      <ProductForm onProductAdded={handleProductAdded} />
      <ProductList key={updateList} />
    </div>
  );
};

export default App;
