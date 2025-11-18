// TypeScript types based on the OpenAPI specification

export interface Category {
  id?: number;
  name?: string;
}

export interface Tag {
  id?: number;
  name?: string;
}

export const PetStatus = {
  Available: 'available',
  Pending: 'pending',
  Sold: 'sold'
} as const;

export type PetStatus = typeof PetStatus[keyof typeof PetStatus];

export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: PetStatus;
}

export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

