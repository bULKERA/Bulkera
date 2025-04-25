import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  image: string;
  slug: string;
}

const categories: Category[] = [
  {
    name: 'T-Shirts',
    image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'shirts'
  },
  {
    name: 'Hoodies',
    image: 'https://images.pexels.com/photos/7005297/pexels-photo-7005297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'hoodies'
  },
  {
    name: 'Trousers',
    image: 'https://images.pexels.com/photos/8484306/pexels-photo-8484306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'trousers'
  }
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#8C73DE 1px, transparent 1px),
                           linear-gradient(90deg, #8C73DE 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Shop By Category</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Premium athletic wear designed for style and comfort
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md h-64 bg-gray-800 border border-gray-700 hover:border-[#8C73DE] transition-all duration-300">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-[#8C73DE] flex items-center text-sm font-medium">
                      Shop Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;