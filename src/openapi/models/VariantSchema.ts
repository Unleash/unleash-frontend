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
import type { ClientVariantSchemaPayload } from './ClientVariantSchemaPayload';
import {
    ClientVariantSchemaPayloadFromJSON,
    ClientVariantSchemaPayloadFromJSONTyped,
    ClientVariantSchemaPayloadToJSON,
} from './ClientVariantSchemaPayload';
import type { OverrideSchema } from './OverrideSchema';
import {
    OverrideSchemaFromJSON,
    OverrideSchemaFromJSONTyped,
    OverrideSchemaToJSON,
} from './OverrideSchema';

/**
 * 
 * @export
 * @interface VariantSchema
 */
export interface VariantSchema {
    /**
     * 
     * @type {string}
     * @memberof VariantSchema
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof VariantSchema
     */
    weight: number;
    /**
     * 
     * @type {string}
     * @memberof VariantSchema
     */
    weightType: string;
    /**
     * 
     * @type {string}
     * @memberof VariantSchema
     */
    stickiness: string;
    /**
     * 
     * @type {ClientVariantSchemaPayload}
     * @memberof VariantSchema
     */
    payload?: ClientVariantSchemaPayload;
    /**
     * 
     * @type {Array<OverrideSchema>}
     * @memberof VariantSchema
     */
    overrides?: Array<OverrideSchema>;
}

/**
 * Check if a given object implements the VariantSchema interface.
 */
export function instanceOfVariantSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "weight" in value;
    isInstance = isInstance && "weightType" in value;
    isInstance = isInstance && "stickiness" in value;

    return isInstance;
}

export function VariantSchemaFromJSON(json: any): VariantSchema {
    return VariantSchemaFromJSONTyped(json, false);
}

export function VariantSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): VariantSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'weight': json['weight'],
        'weightType': json['weightType'],
        'stickiness': json['stickiness'],
        'payload': !exists(json, 'payload') ? undefined : ClientVariantSchemaPayloadFromJSON(json['payload']),
        'overrides': !exists(json, 'overrides') ? undefined : ((json['overrides'] as Array<any>).map(OverrideSchemaFromJSON)),
    };
}

export function VariantSchemaToJSON(value?: VariantSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'weight': value.weight,
        'weightType': value.weightType,
        'stickiness': value.stickiness,
        'payload': ClientVariantSchemaPayloadToJSON(value.payload),
        'overrides': value.overrides === undefined ? undefined : ((value.overrides as Array<any>).map(OverrideSchemaToJSON)),
    };
}

