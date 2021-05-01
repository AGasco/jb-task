import React from 'react';
import Product from './Product';

function Category({ title, products }) {
  return (
    <div className="Category">
      <h1 className="Category-Title">
        {title[0].toUpperCase() + title.slice(1).toString()}
      </h1>
      <div className="Category-Products">
        {products?.map((p) => (
          <Product data={p} key={p.name} />
        ))}
      </div>
    </div>
  );
}

export default Category;
