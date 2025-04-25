import React from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import Button from './Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Spline Scene */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/q1qdtEnuEcKtE7fY/scene.splinecode" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Premium Athletic <span className="text-[#8C73DE]">Apparel</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Elevate your style with our premium collection of athletic wear.
            Designed for comfort and performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button size="lg" variant="primary">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;