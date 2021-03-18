export interface Profile {
  name: string;
  email: string;
  phone_number: any;
  image?: string;
}

/**
 * Is used for making sure User object matches User object fetched from API
 */
export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

/**
 * Is used for making sure Product object matches Product object in backend
 */
export interface ProductDb {
  id?: number;
  title: string;
  description: string;
  image: string;
  price: number;
  ownerId?: string;
  categoryId?: string;
}
