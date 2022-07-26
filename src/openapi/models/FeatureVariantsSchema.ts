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
import type { VariantSchema } from './VariantSchema';
import {
    VariantSchemaFromJSON,
    VariantSchemaFromJSONTyped,
    VariantSchemaToJSON,
} from './VariantSchema';

/**
 * 
 * @export
 * @interface FeatureVariantsSchema
 */
export interface FeatureVariantsSchema {
    /**
     * 
     * @type {number}
     * @memberof FeatureVariantsSchema
     */
    version: number;
    /**
     * 
     * @type {Array<VariantSchema>}
     * @memberof FeatureVariantsSchema
     */
    variants: Array<VariantSchema>;
}

/**
 * Check if a given object implements the FeatureVariantsSchema interface.
 */
export function instanceOfFeatureVariantsSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "variants" in value;

    return isInstance;
}

export function FeatureVariantsSchemaFromJSON(json: any): FeatureVariantsSchema {
    return FeatureVariantsSchemaFromJSONTyped(json, false);
}

export function FeatureVariantsSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureVariantsSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': json['version'],
        'variants': ((json['variants'] as Array<any>).map(VariantSchemaFromJSON)),
    };
}

export function FeatureVariantsSchemaToJSON(value?: FeatureVariantsSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'variants': ((value.variants as Array<any>).map(VariantSchemaToJSON)),
    };
}

