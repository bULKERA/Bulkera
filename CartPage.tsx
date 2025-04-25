import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import { Trash2, ChevronLeft, RefreshCcw } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button className="flex items-center justify-center mx-auto">
              <ChevronLeft size={20} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Clear Cart
                  </button>
                </div>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                      <div>
                        <h3 className="font-medium">
                          <Link to={`/product/${item.product.id}`} className="hover:text-blue-600">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">{item.product.category}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 font-medium">
                        ${item.product.price.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                          className="w-12 h-8 border-t border-b border-gray-300 text-center text-sm"
                        />
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-red-500 hover:text-red-700 flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <Link to="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
                <ChevronLeft size={20} className="mr-1" />
                Continue Shopping
              </Link>
              
              <button className="text-gray-600 hover:text-gray-800 flex items-center">
                <RefreshCcw size={16} className="mr-1" />
                Update Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <Button variant="primary" size="lg" fullWidth className="mb-4">
                Proceed to Checkout
              </Button>
              
              <div className="text-center text-sm text-gray-500">
                <p>We accept the following payment methods</p>
                <div className="flex justify-center space-x-2 mt-2">
                  {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method, i) => (
                    <span key={i} className="inline-block bg-gray-100 px-2 py-1 rounded">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;