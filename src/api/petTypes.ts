// Type definitions derived from petstore.openAPI.yaml Pet schema
export type Id = number;

export interface Category {
    id?: Id;
    name?: string;
}

export interface Tag {
    id?: Id;
    name?: string;
}

export type PetStatus = 'available' | 'pending' | 'sold';

export interface Pet {
    id?: Id;
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