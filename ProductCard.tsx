import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Badge for featured, bestseller, or new arrival */}
      {(product.featured || product.bestseller || product.newArrival) && (
        <div className="absolute top-2 left-2 z-10">
          {product.newArrival && (
            <span className="inline-block bg-[#8C73DE] text-white text-xs px-2 py-1 rounded-full mr-2">
              NEW
            </span>
          )}
          {product.bestseller && (
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
              BESTSELLER
            </span>
          )}
        </div>
      )}
      
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden h-64">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      {/* Quick Add Button */}
      <button 
        onClick={() => addToCart(product)}
        className="absolute bottom-24 right-4 bg-gray-700 text-[#8C73DE] p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        aria-label="Add to cart"
      >
        <ShoppingBag size={20} />
      </button>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-white font-medium text-lg mb-1 truncate">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-gray-400 mb-2 truncate">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#8C73DE] font-bold">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="text-sm font-medium text-white bg-[#8C73DE] px-3 py-1 rounded hover:bg-[#7A62CD] transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;