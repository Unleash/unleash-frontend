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
import type { TagSchema } from './TagSchema';
import {
    TagSchemaFromJSON,
    TagSchemaFromJSONTyped,
    TagSchemaToJSON,
} from './TagSchema';

/**
 *
 * @export
 * @interface EventSchema
 */
export interface EventSchema {
    /**
     *
     * @type {number}
     * @memberof EventSchema
     */
    id: number;
    /**
     *
     * @type {Date}
     * @memberof EventSchema
     */
    createdAt: Date;
    /**
     *
     * @type {string}
     * @memberof EventSchema
     */
    type: string;
    /**
     *
     * @type {string}
     * @memberof EventSchema
     */
    createdBy: string;
    /**
     *
     * @type {string}
     * @memberof EventSchema
     */
    environment?: string | null;
    /**
     *
     * @type {string}
     * @memberof EventSchema
     */
    project?: string | null;
    /**
     *
     * @type {string}
     * @memberof EventSchema
     */
    featureName?: string | null;
    /**
     *
     * @type {object}
     * @memberof EventSchema
     */
    data?: object | null;
    /**
     *
     * @type {object}
     * @memberof EventSchema
     */
    preData?: object | null;
    /**
     *
     * @type {Array<TagSchema>}
     * @memberof EventSchema
     */
    tags?: Array<TagSchema> | null;
}

/**
 * Check if a given object implements the EventSchema interface.
 */
export function instanceOfEventSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "createdBy" in value;

    return isInstance;
}

export function EventSchemaFromJSON(json: any): EventSchema {
    return EventSchemaFromJSONTyped(json, false);
}

export function EventSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'id': json['id'],
        'createdAt': (new Date(json['createdAt'])),
        'type': json['type'],
        'createdBy': json['createdBy'],
        'environment': !exists(json, 'environment') ? undefined : json['environment'],
        'project': !exists(json, 'project') ? undefined : json['project'],
        'featureName': !exists(json, 'featureName') ? undefined : json['featureName'],
        'data': !exists(json, 'data') ? undefined : json['data'],
        'preData': !exists(json, 'preData') ? undefined : json['preData'],
        'tags': !exists(json, 'tags') ? undefined : (json['tags'] === null ? null : (json['tags'] as Array<any>).map(TagSchemaFromJSON)),
    };
}

export function EventSchemaToJSON(value?: EventSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'id': value.id,
        'createdAt': (value.createdAt.toISOString()),
        'type': value.type,
        'createdBy': value.createdBy,
        'environment': value.environment,
        'project': value.project,
        'featureName': value.featureName,
        'data': value.data,
        'preData': value.preData,
        'tags': value.tags === undefined ? undefined : (value.tags === null ? null : (value.tags as Array<any>).map(TagSchemaToJSON)),
    };
}

