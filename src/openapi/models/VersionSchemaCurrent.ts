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
 * @interface VersionSchemaCurrent
 */
export interface VersionSchemaCurrent {
    /**
     * 
     * @type {string}
     * @memberof VersionSchemaCurrent
     */
    oss?: string;
    /**
     * 
     * @type {string}
     * @memberof VersionSchemaCurrent
     */
    enterprise?: string;
}

/**
 * Check if a given object implements the VersionSchemaCurrent interface.
 */
export function instanceOfVersionSchemaCurrent(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function VersionSchemaCurrentFromJSON(json: any): VersionSchemaCurrent {
    return VersionSchemaCurrentFromJSONTyped(json, false);
}

export function VersionSchemaCurrentFromJSONTyped(json: any, ignoreDiscriminator: boolean): VersionSchemaCurrent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'oss': !exists(json, 'oss') ? undefined : json['oss'],
        'enterprise': !exists(json, 'enterprise') ? undefined : json['enterprise'],
    };
}

export function VersionSchemaCurrentToJSON(value?: VersionSchemaCurrent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'oss': value.oss,
        'enterprise': value.enterprise,
    };
}

