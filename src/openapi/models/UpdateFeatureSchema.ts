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
import type { ConstraintSchema } from './ConstraintSchema';
import {
    ConstraintSchemaFromJSON,
    ConstraintSchemaFromJSONTyped,
    ConstraintSchemaToJSON,
} from './ConstraintSchema';

/**
 * 
 * @export
 * @interface UpdateFeatureSchema
 */
export interface UpdateFeatureSchema {
    /**
     * 
     * @type {string}
     * @memberof UpdateFeatureSchema
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateFeatureSchema
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateFeatureSchema
     */
    type?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateFeatureSchema
     */
    stale?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateFeatureSchema
     */
    archived?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof UpdateFeatureSchema
     */
    createdAt?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateFeatureSchema
     */
    impressionData?: boolean;
    /**
     * 
     * @type {Array<ConstraintSchema>}
     * @memberof UpdateFeatureSchema
     */
    constraints?: Array<ConstraintSchema>;
}

/**
 * Check if a given object implements the UpdateFeatureSchema interface.
 */
export function instanceOfUpdateFeatureSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function UpdateFeatureSchemaFromJSON(json: any): UpdateFeatureSchema {
    return UpdateFeatureSchemaFromJSONTyped(json, false);
}

export function UpdateFeatureSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateFeatureSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'stale': !exists(json, 'stale') ? undefined : json['stale'],
        'archived': !exists(json, 'archived') ? undefined : json['archived'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'impressionData': !exists(json, 'impressionData') ? undefined : json['impressionData'],
        'constraints': !exists(json, 'constraints') ? undefined : ((json['constraints'] as Array<any>).map(ConstraintSchemaFromJSON)),
    };
}

export function UpdateFeatureSchemaToJSON(value?: UpdateFeatureSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'type': value.type,
        'stale': value.stale,
        'archived': value.archived,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'impressionData': value.impressionData,
        'constraints': value.constraints === undefined ? undefined : ((value.constraints as Array<any>).map(ConstraintSchemaToJSON)),
    };
}

