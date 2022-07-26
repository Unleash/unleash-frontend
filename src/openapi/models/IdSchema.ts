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
 * @interface IdSchema
 */
export interface IdSchema {
    /**
     * 
     * @type {string}
     * @memberof IdSchema
     */
    id: string;
}

/**
 * Check if a given object implements the IdSchema interface.
 */
export function instanceOfIdSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function IdSchemaFromJSON(json: any): IdSchema {
    return IdSchemaFromJSONTyped(json, false);
}

export function IdSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): IdSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
    };
}

export function IdSchemaToJSON(value?: IdSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
    };
}

