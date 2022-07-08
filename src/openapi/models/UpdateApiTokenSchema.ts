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
 * @interface UpdateApiTokenSchema
 */
export interface UpdateApiTokenSchema {
    /**
     *
     * @type {Date}
     * @memberof UpdateApiTokenSchema
     */
    expiresAt: Date;
}

/**
 * Check if a given object implements the UpdateApiTokenSchema interface.
 */
export function instanceOfUpdateApiTokenSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "expiresAt" in value;

    return isInstance;
}

export function UpdateApiTokenSchemaFromJSON(json: any): UpdateApiTokenSchema {
    return UpdateApiTokenSchemaFromJSONTyped(json, false);
}

export function UpdateApiTokenSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateApiTokenSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'expiresAt': (new Date(json['expiresAt'])),
    };
}

export function UpdateApiTokenSchemaToJSON(value?: UpdateApiTokenSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'expiresAt': (value.expiresAt.toISOString()),
    };
}

