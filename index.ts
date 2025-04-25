export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  email: string;
  name: string;
}