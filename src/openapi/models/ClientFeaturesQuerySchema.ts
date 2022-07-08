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
/**
 *
 * @export
 * @interface ClientFeaturesQuerySchema
 */
export interface ClientFeaturesQuerySchema {
    /**
     *
     * @type {Array<Array<string>>}
     * @memberof ClientFeaturesQuerySchema
     */
    tag?: Array<Array<string>>;
    /**
     *
     * @type {Array<string>}
     * @memberof ClientFeaturesQuerySchema
     */
    project?: Array<string>;
    /**
     *
     * @type {string}
     * @memberof ClientFeaturesQuerySchema
     */
    namePrefix?: string;
    /**
     *
     * @type {string}
     * @memberof ClientFeaturesQuerySchema
     */
    environment?: string;
    /**
     *
     * @type {boolean}
     * @memberof ClientFeaturesQuerySchema
     */
    inlineSegmentConstraints?: boolean;
}

/**
 * Check if a given object implements the ClientFeaturesQuerySchema interface.
 */
export function instanceOfClientFeaturesQuerySchema(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ClientFeaturesQuerySchemaFromJSON(json: any): ClientFeaturesQuerySchema {
    return ClientFeaturesQuerySchemaFromJSONTyped(json, false);
}

export function ClientFeaturesQuerySchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): ClientFeaturesQuerySchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'tag': !exists(json, 'tag') ? undefined : json['tag'],
        'project': !exists(json, 'project') ? undefined : json['project'],
        'namePrefix': !exists(json, 'namePrefix') ? undefined : json['namePrefix'],
        'environment': !exists(json, 'environment') ? undefined : json['environment'],
        'inlineSegmentConstraints': !exists(json, 'inlineSegmentConstraints') ? undefined : json['inlineSegmentConstraints'],
    };
}

export function ClientFeaturesQuerySchemaToJSON(value?: ClientFeaturesQuerySchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'tag': value.tag,
        'project': value.project,
        'namePrefix': value.namePrefix,
        'environment': value.environment,
        'inlineSegmentConstraints': value.inlineSegmentConstraints,
    };
}

