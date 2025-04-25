import React from 'react';
import { Truck, RefreshCcw, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-10 h-10 text-blue-400" />,
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50',
  },
  {
    icon: <RefreshCcw className="w-10 h-10 text-blue-400" />,
    title: '30-Day Returns',
    description: 'Easy returns within 30 days of purchase',
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-400" />,
    title: 'Secure Payments',
    description: 'Encrypted and secure payment processing',
  },
  {
    icon: <Clock className="w-10 h-10 text-blue-400" />,
    title: '24/7 Support',
    description: 'Customer support available anytime',
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;