/* tslint:disable */
/* eslint-disable */
/**
 * Unleash API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.10.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    FeatureSchemaOverrides,
    FeatureSchemaOverridesFromJSON,
    FeatureSchemaOverridesFromJSONTyped,
    FeatureSchemaOverridesToJSON,
} from './FeatureSchemaOverrides';

/**
 * 
 * @export
 * @interface FeatureSchemaVariants
 */
export interface FeatureSchemaVariants {
    /**
     * 
     * @type {string}
     * @memberof FeatureSchemaVariants
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof FeatureSchemaVariants
     */
    weight: number;
    /**
     * 
     * @type {string}
     * @memberof FeatureSchemaVariants
     */
    weightType: string;
    /**
     * 
     * @type {string}
     * @memberof FeatureSchemaVariants
     */
    stickiness: string;
    /**
     * 
     * @type {object}
     * @memberof FeatureSchemaVariants
     */
    payload?: object;
    /**
     * 
     * @type {Array<FeatureSchemaOverrides>}
     * @memberof FeatureSchemaVariants
     */
    overrides?: Array<FeatureSchemaOverrides>;
}

export function FeatureSchemaVariantsFromJSON(json: any): FeatureSchemaVariants {
    return FeatureSchemaVariantsFromJSONTyped(json, false);
}

export function FeatureSchemaVariantsFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureSchemaVariants {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'weight': json['weight'],
        'weightType': json['weightType'],
        'stickiness': json['stickiness'],
        'payload': !exists(json, 'payload') ? undefined : json['payload'],
        'overrides': !exists(json, 'overrides') ? undefined : ((json['overrides'] as Array<any>).map(FeatureSchemaOverridesFromJSON)),
    };
}

export function FeatureSchemaVariantsToJSON(value?: FeatureSchemaVariants | null): any {
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
        'payload': value.payload,
        'overrides': value.overrides === undefined ? undefined : ((value.overrides as Array<any>).map(FeatureSchemaOverridesToJSON)),
    };
}
