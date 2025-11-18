/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from './Category';
import type { Tag } from './Tag';
/**
 * A pet for sale in the pet store
 */
export type Pet = {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: Array<string>;
    tags?: Array<Tag>;
    /**
     * pet status in the store
     * @deprecated
     */
    status?: Pet.status;
};
export namespace Pet {
    /**
     * pet status in the store
     */
    export enum status {
        AVAILABLE = 'available',
        PENDING = 'pending',
        SOLD = 'sold',
    }
}

