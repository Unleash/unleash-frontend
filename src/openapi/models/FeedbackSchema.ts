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
 * @interface FeedbackSchema
 */
export interface FeedbackSchema {
    /**
     *
     * @type {number}
     * @memberof FeedbackSchema
     */
    userId?: number;
    /**
     *
     * @type {string}
     * @memberof FeedbackSchema
     */
    feedbackId?: string;
    /**
     *
     * @type {boolean}
     * @memberof FeedbackSchema
     */
    neverShow?: boolean;
    /**
     *
     * @type {Date}
     * @memberof FeedbackSchema
     */
    given?: Date | null;
}

/**
 * Check if a given object implements the FeedbackSchema interface.
 */
export function instanceOfFeedbackSchema(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeedbackSchemaFromJSON(json: any): FeedbackSchema {
    return FeedbackSchemaFromJSONTyped(json, false);
}

export function FeedbackSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeedbackSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'feedbackId': !exists(json, 'feedbackId') ? undefined : json['feedbackId'],
        'neverShow': !exists(json, 'neverShow') ? undefined : json['neverShow'],
        'given': !exists(json, 'given') ? undefined : (json['given'] === null ? null : new Date(json['given'])),
    };
}

export function FeedbackSchemaToJSON(value?: FeedbackSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'userId': value.userId,
        'feedbackId': value.feedbackId,
        'neverShow': value.neverShow,
        'given': value.given === undefined ? undefined : (value.given === null ? null : value.given.toISOString()),
    };
}

