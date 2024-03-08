export interface ItemData {
  id: string;
  title: string;
  price: number;
  created_at: string;
  description: string;
  inStock: number;
  images: string;
  imagestwo: string;
  size: string;
  sizes?: string;
  quantity?: number;

  // Make size optional since it's not always present in ItemData
}

export interface Item {
  id: string;
  title: string;
  size: string;
  price: number;
  description: string;
  quantity: number;
  images?: string;
}

export type CartItem = {
  Item: null | undefined
};
