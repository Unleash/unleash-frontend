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
    ConstraintSchema,
    ConstraintSchemaFromJSON,
    ConstraintSchemaFromJSONTyped,
    ConstraintSchemaToJSON,
} from './ConstraintSchema';

/**
 * 
 * @export
 * @interface CreateStrategySchema
 */
export interface CreateStrategySchema {
    /**
     * 
     * @type {string}
     * @memberof CreateStrategySchema
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof CreateStrategySchema
     */
    sortOrder?: number;
    /**
     * 
     * @type {Array<ConstraintSchema>}
     * @memberof CreateStrategySchema
     */
    constraints?: Array<ConstraintSchema>;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof CreateStrategySchema
     */
    parameters?: { [key: string]: string; };
}

export function CreateStrategySchemaFromJSON(json: any): CreateStrategySchema {
    return CreateStrategySchemaFromJSONTyped(json, false);
}

export function CreateStrategySchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateStrategySchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'sortOrder': !exists(json, 'sortOrder') ? undefined : json['sortOrder'],
        'constraints': !exists(json, 'constraints') ? undefined : ((json['constraints'] as Array<any>).map(ConstraintSchemaFromJSON)),
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
    };
}

export function CreateStrategySchemaToJSON(value?: CreateStrategySchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'sortOrder': value.sortOrder,
        'constraints': value.constraints === undefined ? undefined : ((value.constraints as Array<any>).map(ConstraintSchemaToJSON)),
        'parameters': value.parameters,
    };
}

