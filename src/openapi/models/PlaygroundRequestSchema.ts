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
import type { PlaygroundRequestSchemaProjects } from './PlaygroundRequestSchemaProjects';
import {
    PlaygroundRequestSchemaProjectsFromJSON,
    PlaygroundRequestSchemaProjectsFromJSONTyped,
    PlaygroundRequestSchemaProjectsToJSON,
} from './PlaygroundRequestSchemaProjects';
import type { SdkContextSchema } from './SdkContextSchema';
import {
    SdkContextSchemaFromJSON,
    SdkContextSchemaFromJSONTyped,
    SdkContextSchemaToJSON,
} from './SdkContextSchema';

/**
 * Data for the playground API to evaluate toggles
 * @export
 * @interface PlaygroundRequestSchema
 */
export interface PlaygroundRequestSchema {
    /**
     *
     * @type {string}
     * @memberof PlaygroundRequestSchema
     */
    environment: string;
    /**
     *
     * @type {PlaygroundRequestSchemaProjects}
     * @memberof PlaygroundRequestSchema
     */
    projects?: PlaygroundRequestSchemaProjects;
    /**
     *
     * @type {SdkContextSchema}
     * @memberof PlaygroundRequestSchema
     */
    context: SdkContextSchema;
}

/**
 * Check if a given object implements the PlaygroundRequestSchema interface.
 */
export function instanceOfPlaygroundRequestSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "environment" in value;
    isInstance = isInstance && "context" in value;

    return isInstance;
}

export function PlaygroundRequestSchemaFromJSON(json: any): PlaygroundRequestSchema {
    return PlaygroundRequestSchemaFromJSONTyped(json, false);
}

export function PlaygroundRequestSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaygroundRequestSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'environment': json['environment'],
        'projects': !exists(json, 'projects') ? undefined : PlaygroundRequestSchemaProjectsFromJSON(json['projects']),
        'context': SdkContextSchemaFromJSON(json['context']),
    };
}

export function PlaygroundRequestSchemaToJSON(value?: PlaygroundRequestSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'environment': value.environment,
        'projects': PlaygroundRequestSchemaProjectsToJSON(value.projects),
        'context': SdkContextSchemaToJSON(value.context),
    };
}

