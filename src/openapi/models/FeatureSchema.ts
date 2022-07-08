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
import type { EnvironmentSchema } from './EnvironmentSchema';
import {
    EnvironmentSchemaFromJSON,
    EnvironmentSchemaFromJSONTyped,
    EnvironmentSchemaToJSON,
} from './EnvironmentSchema';
import type { FeatureStrategySchema } from './FeatureStrategySchema';
import {
    FeatureStrategySchemaFromJSON,
    FeatureStrategySchemaFromJSONTyped,
    FeatureStrategySchemaToJSON,
} from './FeatureStrategySchema';
import type { VariantSchema } from './VariantSchema';
import {
    VariantSchemaFromJSON,
    VariantSchemaFromJSONTyped,
    VariantSchemaToJSON,
} from './VariantSchema';

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
     * @type {boolean}
     * @memberof FeatureSchema
     */
    archived?: boolean;
    /**
     *
     * @type {string}
     * @memberof FeatureSchema
     */
    project?: string;
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
    archivedAt?: Date | null;
    /**
     *
     * @type {Date}
     * @memberof FeatureSchema
     */
    lastSeenAt?: Date | null;
    /**
     *
     * @type {Array<EnvironmentSchema>}
     * @memberof FeatureSchema
     */
    environments?: Array<EnvironmentSchema>;
    /**
     *
     * @type {Array<FeatureStrategySchema>}
     * @memberof FeatureSchema
     */
    strategies?: Array<FeatureStrategySchema>;
    /**
     *
     * @type {Array<VariantSchema>}
     * @memberof FeatureSchema
     */
    variants?: Array<VariantSchema>;
}

/**
 * Check if a given object implements the FeatureSchema interface.
 */
export function instanceOfFeatureSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
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
        'archived': !exists(json, 'archived') ? undefined : json['archived'],
        'project': !exists(json, 'project') ? undefined : json['project'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'stale': !exists(json, 'stale') ? undefined : json['stale'],
        'impressionData': !exists(json, 'impressionData') ? undefined : json['impressionData'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (json['createdAt'] === null ? null : new Date(json['createdAt'])),
        'archivedAt': !exists(json, 'archivedAt') ? undefined : (json['archivedAt'] === null ? null : new Date(json['archivedAt'])),
        'lastSeenAt': !exists(json, 'lastSeenAt') ? undefined : (json['lastSeenAt'] === null ? null : new Date(json['lastSeenAt'])),
        'environments': !exists(json, 'environments') ? undefined : ((json['environments'] as Array<any>).map(EnvironmentSchemaFromJSON)),
        'strategies': !exists(json, 'strategies') ? undefined : ((json['strategies'] as Array<any>).map(FeatureStrategySchemaFromJSON)),
        'variants': !exists(json, 'variants') ? undefined : ((json['variants'] as Array<any>).map(VariantSchemaFromJSON)),
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
        'archived': value.archived,
        'project': value.project,
        'enabled': value.enabled,
        'stale': value.stale,
        'impressionData': value.impressionData,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt === null ? null : value.createdAt.toISOString()),
        'archivedAt': value.archivedAt === undefined ? undefined : (value.archivedAt === null ? null : value.archivedAt.toISOString()),
        'lastSeenAt': value.lastSeenAt === undefined ? undefined : (value.lastSeenAt === null ? null : value.lastSeenAt.toISOString()),
        'environments': value.environments === undefined ? undefined : ((value.environments as Array<any>).map(EnvironmentSchemaToJSON)),
        'strategies': value.strategies === undefined ? undefined : ((value.strategies as Array<any>).map(FeatureStrategySchemaToJSON)),
        'variants': value.variants === undefined ? undefined : ((value.variants as Array<any>).map(VariantSchemaToJSON)),
    };
}

