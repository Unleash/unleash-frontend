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
import type { UpsertStrategySchemaParametersInner } from './UpsertStrategySchemaParametersInner';
import {
    UpsertStrategySchemaParametersInnerFromJSON,
    UpsertStrategySchemaParametersInnerFromJSONTyped,
    UpsertStrategySchemaParametersInnerToJSON,
} from './UpsertStrategySchemaParametersInner';

/**
 *
 * @export
 * @interface UpsertStrategySchema
 */
export interface UpsertStrategySchema {
    /**
     *
     * @type {string}
     * @memberof UpsertStrategySchema
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof UpsertStrategySchema
     */
    description?: string;
    /**
     *
     * @type {boolean}
     * @memberof UpsertStrategySchema
     */
    editable?: boolean;
    /**
     *
     * @type {Array<UpsertStrategySchemaParametersInner>}
     * @memberof UpsertStrategySchema
     */
    parameters?: Array<UpsertStrategySchemaParametersInner>;
}

/**
 * Check if a given object implements the UpsertStrategySchema interface.
 */
export function instanceOfUpsertStrategySchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function UpsertStrategySchemaFromJSON(json: any): UpsertStrategySchema {
    return UpsertStrategySchemaFromJSONTyped(json, false);
}

export function UpsertStrategySchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpsertStrategySchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'editable': !exists(json, 'editable') ? undefined : json['editable'],
        'parameters': !exists(json, 'parameters') ? undefined : ((json['parameters'] as Array<any>).map(UpsertStrategySchemaParametersInnerFromJSON)),
    };
}

export function UpsertStrategySchemaToJSON(value?: UpsertStrategySchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'name': value.name,
        'description': value.description,
        'editable': value.editable,
        'parameters': value.parameters === undefined ? undefined : ((value.parameters as Array<any>).map(UpsertStrategySchemaParametersInnerToJSON)),
    };
}

