/* tslint:disable */
/* eslint-disable */
/**
 * Unleash API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.14.0-beta.0
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
 * @interface OverrideSchema
 */
export interface OverrideSchema {
    /**
     *
     * @type {string}
     * @memberof OverrideSchema
     */
    contextName: string;
    /**
     *
     * @type {Array<string>}
     * @memberof OverrideSchema
     */
    values: Array<string>;
}

/**
 * Check if a given object implements the OverrideSchema interface.
 */
export function instanceOfOverrideSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "contextName" in value;
    isInstance = isInstance && "values" in value;

    return isInstance;
}

export function OverrideSchemaFromJSON(json: any): OverrideSchema {
    return OverrideSchemaFromJSONTyped(json, false);
}

export function OverrideSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): OverrideSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'contextName': json['contextName'],
        'values': json['values'],
    };
}

export function OverrideSchemaToJSON(value?: OverrideSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'contextName': value.contextName,
        'values': value.values,
    };
}

