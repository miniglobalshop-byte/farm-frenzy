
export type Category = 'All' | 'Mobiles' | 'Chargers' | 'Headphones';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
