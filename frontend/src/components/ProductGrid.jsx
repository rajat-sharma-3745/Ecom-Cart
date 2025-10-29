import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';


const ProductGrid = ({search}) => {
  const {products} = useAppContext()
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-10">
  {filteredProducts.map((product,idx) => (
    <ProductCard
     key={product._id||idx} product={product} />
  ))}
</div>
  )
}

export default ProductGrid