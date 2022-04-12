/* tslint:disable */
/* eslint-disable */
/**
 * Unleash API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.10.0-beta.0
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
 * @interface ChangeProjectSchema
 */
export interface ChangeProjectSchema {
    /**
     * 
     * @type {string}
     * @memberof ChangeProjectSchema
     */
    newProjectId: string;
}

export function ChangeProjectSchemaFromJSON(json: any): ChangeProjectSchema {
    return ChangeProjectSchemaFromJSONTyped(json, false);
}

export function ChangeProjectSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChangeProjectSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'newProjectId': json['newProjectId'],
    };
}

export function ChangeProjectSchemaToJSON(value?: ChangeProjectSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'newProjectId': value.newProjectId,
    };
}

