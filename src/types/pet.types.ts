// TypeScript types based on OpenAPI schema

export interface Category {
  id?: number;
  name?: string;
}

export interface Tag {
  id?: number;
  name?: string;
}

export const PetStatus = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  SOLD: 'sold'
} as const;

export type PetStatusType = typeof PetStatus[keyof typeof PetStatus];

export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: PetStatusType;
}

export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

