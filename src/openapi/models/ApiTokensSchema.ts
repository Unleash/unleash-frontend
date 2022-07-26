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
import type { ApiTokenSchema } from './ApiTokenSchema';
import {
    ApiTokenSchemaFromJSON,
    ApiTokenSchemaFromJSONTyped,
    ApiTokenSchemaToJSON,
} from './ApiTokenSchema';

/**
 * 
 * @export
 * @interface ApiTokensSchema
 */
export interface ApiTokensSchema {
    /**
     * 
     * @type {Array<ApiTokenSchema>}
     * @memberof ApiTokensSchema
     */
    tokens: Array<ApiTokenSchema>;
}

/**
 * Check if a given object implements the ApiTokensSchema interface.
 */
export function instanceOfApiTokensSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "tokens" in value;

    return isInstance;
}

export function ApiTokensSchemaFromJSON(json: any): ApiTokensSchema {
    return ApiTokensSchemaFromJSONTyped(json, false);
}

export function ApiTokensSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiTokensSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tokens': ((json['tokens'] as Array<any>).map(ApiTokenSchemaFromJSON)),
    };
}

export function ApiTokensSchemaToJSON(value?: ApiTokensSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tokens': ((value.tokens as Array<any>).map(ApiTokenSchemaToJSON)),
    };
}

