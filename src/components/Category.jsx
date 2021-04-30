import React from 'react';
import Product from './Product';

function Category({ title, products }) {
  return (
    <div className="Category">
      <h1>{title}</h1>
      <div className="Category-Products">
        {products?.map((p) => (
          <Product data={p} />
        ))}
      </div>
    </div>
  );
}

export default Category;
