import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import { ShoppingBag, Heart, Share2 } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // Get product details
  const product = id ? getProductById(parseInt(id)) : undefined;
  
  // Reset added to cart state after 2 seconds
  useEffect(() => {
    if (isAddedToCart) {
      const timer = setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isAddedToCart]);
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setIsAddedToCart(true);
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = getProductById(parseInt(id || '0'))
    ? Array.from({ length: 4 }, (_, i) => (parseInt(id || '0') + i + 1) % 8 + 1)
        .map(id => getProductById(id))
        .filter(Boolean)
    : [];
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <span className="mx-2">/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-blue-600 capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="p-6 bg-gray-100 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-96 object-contain"
              />
            </div>
            
            {/* Product Info */}
            <div className="p-8">
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">4.0 (24 reviews)</span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex flex-wrap">
                  {['Premium Quality', 'Durable', 'Athletic Fit'].map((tag, i) => (
                    <span 
                      key={i} 
                      className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-10 border-t border-b border-gray-300 text-center"
                  />
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="flex-grow flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center justify-center"
                >
                  <Heart className="mr-2" size={20} />
                  Wishlist
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center justify-center"
                >
                  <Share2 className="mr-2" size={20} />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="border-b-2 border-blue-600 py-4 px-1 text-blue-600 font-medium">
                Description
              </button>
              <button className="py-4 px-1 text-gray-500 font-medium">
                Specifications
              </button>
              <button className="py-4 px-1 text-gray-500 font-medium">
                Reviews
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              relatedProduct && <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;