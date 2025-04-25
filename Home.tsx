import React from 'react';
import HeroSection from '../components/ui/HeroSection';
import CategorySection from '../components/ui/CategorySection';
import ProductSection from '../components/ui/ProductSection';
import FeatureSection from '../components/ui/FeatureSection';
import NewsletterSection from '../components/ui/NewsletterSection';
import { getFeaturedProducts, getBestsellerProducts, getNewArrivals } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const bestsellerProducts = getBestsellerProducts();
  const newArrivals = getNewArrivals();
  
  return (
    <div>
      <HeroSection />
      <CategorySection />
      
      <ProductSection 
        title="Featured Products" 
        subtitle="Our handpicked selection of premium athletic wear"
        products={featuredProducts}
        viewAllLink="/products"
      />
      
      <FeatureSection />
      
      <ProductSection 
        title="Bestsellers" 
        subtitle="Our most popular products loved by customers"
        products={bestsellerProducts}
        viewAllLink="/products"
      />
      
      <ProductSection 
        title="New Arrivals" 
        subtitle="Check out our latest products"
        products={newArrivals}
        viewAllLink="/products"
      />
      
      <NewsletterSection />
    </div>
  );
};

export default Home;