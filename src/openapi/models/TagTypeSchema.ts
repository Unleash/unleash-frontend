/* tslint:disable */
/* eslint-disable */
/**
 * Unleash API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.14.0-beta.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TagTypeSchema
 */
export interface TagTypeSchema {
    /**
     * 
     * @type {string}
     * @memberof TagTypeSchema
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof TagTypeSchema
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof TagTypeSchema
     */
    icon?: string | null;
}

/**
 * Check if a given object implements the TagTypeSchema interface.
 */
export function instanceOfTagTypeSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function TagTypeSchemaFromJSON(json: any): TagTypeSchema {
    return TagTypeSchemaFromJSONTyped(json, false);
}

export function TagTypeSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): TagTypeSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'icon': !exists(json, 'icon') ? undefined : json['icon'],
    };
}

export function TagTypeSchemaToJSON(value?: TagTypeSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'icon': value.icon,
    };
}

