import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "PowerGrip Pro Gloves",
    price: 39.99,
    category: "gloves",
    image: "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Premium workout gloves designed for maximum grip and wrist support. Made with breathable material and reinforced palms for durability during intense workouts.",
    featured: true,
    bestseller: true
  },
  {
    id: 2,
    name: "HydroFit Water Bottle - 32oz",
    price: 24.99,
    category: "bottles",
    image: "https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Double-walled insulated water bottle that keeps your drinks cold for up to 24 hours. BPA-free with a leak-proof lid and easy-carry handle.",
    featured: true
  },
  {
    id: 3,
    name: "FlexForm Lifting Grips",
    price: 19.99,
    category: "grips",
    image: "https://images.pexels.com/photos/4427611/pexels-photo-4427611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Innovative lifting grips that protect your hands while enhancing your grip strength. Perfect for pull-ups, deadlifts, and rows.",
    newArrival: true
  },
  {
    id: 4,
    name: "PerformanceTech Training Shirt",
    price: 34.99,
    category: "shirts",
    image: "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "High-performance moisture-wicking shirt designed for intense workouts. Features anti-odor technology and four-way stretch fabric.",
    bestseller: true
  },
  {
    id: 5,
    name: "UltraLift Wrist Wraps",
    price: 14.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Professional-grade wrist wraps providing superior support for heavy lifting. Adjustable straps for custom fit and comfort.",
    featured: true
  },
  {
    id: 6,
    name: "CoreStability Fitness Belt",
    price: 49.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Durable weightlifting belt that provides core support and stability during heavy lifts. Made with premium leather and a secure buckle system.",
    newArrival: true
  },
  {
    id: 7,
    name: "EndurancePro SmartBottle",
    price: 32.99,
    category: "bottles",
    image: "https://images.pexels.com/photos/4397805/pexels-photo-4397805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Smart water bottle with hydration tracking and temperature display. Connects to your smartphone to monitor your daily water intake.",
    featured: true,
    newArrival: true
  },
  {
    id: 8,
    name: "FlexFit Performance Shorts",
    price: 29.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/6550851/pexels-photo-6550851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lightweight athletic shorts with built-in compression liner. Features quick-dry fabric and secure pockets for your essentials.",
    bestseller: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.bestseller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.newArrival);
};

export const getCategories = (): string[] => {
  const categoriesSet = new Set(products.map(product => product.category));
  return Array.from(categoriesSet);
};