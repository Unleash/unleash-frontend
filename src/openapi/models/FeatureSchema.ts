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
    FeatureSchemaStrategies,
    FeatureSchemaStrategiesFromJSON,
    FeatureSchemaStrategiesFromJSONTyped,
    FeatureSchemaStrategiesToJSON,
} from './FeatureSchemaStrategies';
import {
    FeatureSchemaVariants,
    FeatureSchemaVariantsFromJSON,
    FeatureSchemaVariantsFromJSONTyped,
    FeatureSchemaVariantsToJSON,
} from './FeatureSchemaVariants';

/**
 * 
 * @export
 * @interface FeatureSchema
 */
export interface FeatureSchema {
    /**
     * 
     * @type {string}
     * @memberof FeatureSchema
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof FeatureSchema
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof FeatureSchema
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof FeatureSchema
     */
    project: string;
    /**
     * 
     * @type {boolean}
     * @memberof FeatureSchema
     */
    enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof FeatureSchema
     */
    stale?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof FeatureSchema
     */
    impressionData?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof FeatureSchema
     */
    createdAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof FeatureSchema
     */
    lastSeenAt?: Date | null;
    /**
     * 
     * @type {Array<FeatureSchemaStrategies>}
     * @memberof FeatureSchema
     */
    strategies?: Array<FeatureSchemaStrategies>;
    /**
     * 
     * @type {Array<FeatureSchemaVariants>}
     * @memberof FeatureSchema
     */
    variants?: Array<FeatureSchemaVariants>;
}

export function FeatureSchemaFromJSON(json: any): FeatureSchema {
    return FeatureSchemaFromJSONTyped(json, false);
}

export function FeatureSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'project': json['project'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'stale': !exists(json, 'stale') ? undefined : json['stale'],
        'impressionData': !exists(json, 'impressionData') ? undefined : json['impressionData'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (json['createdAt'] === null ? null : new Date(json['createdAt'])),
        'lastSeenAt': !exists(json, 'lastSeenAt') ? undefined : (json['lastSeenAt'] === null ? null : new Date(json['lastSeenAt'])),
        'strategies': !exists(json, 'strategies') ? undefined : ((json['strategies'] as Array<any>).map(FeatureSchemaStrategiesFromJSON)),
        'variants': !exists(json, 'variants') ? undefined : ((json['variants'] as Array<any>).map(FeatureSchemaVariantsFromJSON)),
    };
}

export function FeatureSchemaToJSON(value?: FeatureSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'type': value.type,
        'description': value.description,
        'project': value.project,
        'enabled': value.enabled,
        'stale': value.stale,
        'impressionData': value.impressionData,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt === null ? null : value.createdAt.toISOString().substr(0,10)),
        'lastSeenAt': value.lastSeenAt === undefined ? undefined : (value.lastSeenAt === null ? null : value.lastSeenAt.toISOString().substr(0,10)),
        'strategies': value.strategies === undefined ? undefined : ((value.strategies as Array<any>).map(FeatureSchemaStrategiesToJSON)),
        'variants': value.variants === undefined ? undefined : ((value.variants as Array<any>).map(FeatureSchemaVariantsToJSON)),
    };
}

