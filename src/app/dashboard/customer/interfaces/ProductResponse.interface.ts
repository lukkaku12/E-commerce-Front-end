export interface ProductVariant {
    variant_id: number;
    price: string; // si viene como string, no lo pongas como number
    stock: number;
    sku: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Seller {
    user_id: number;
    name: string;
    email: string;
    password: string;
    role: 'seller' | string; // podés especificar más si tenés roles fijos
    created_at: string;
    updated_at: string;
  }
  
  export interface ProductResponse {
    product_id: number;
    base_model: string;
    brand: string;
    gtin: string;
    mpn: string;
    created_at: string;
    updated_at: string;
    seller: Seller;
    product_variants: ProductVariant[];
  }