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
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}
