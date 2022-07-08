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

/**
 * @type PlaygroundRequestSchemaProjects
 *
 * @export
 */
export type PlaygroundRequestSchemaProjects = Array<string> | string;

export function PlaygroundRequestSchemaProjectsFromJSON(json: any): PlaygroundRequestSchemaProjects {
    return PlaygroundRequestSchemaProjectsFromJSONTyped(json, false);
}

export function PlaygroundRequestSchemaProjectsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaygroundRequestSchemaProjects {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...Array<string>FromJSONTyped(json, true), ...stringFromJSONTyped(json, true) };
}

export function PlaygroundRequestSchemaProjectsToJSON(value?: PlaygroundRequestSchemaProjects | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfArray<string>(value)) {
        return Array<string>ToJSON(value as Array<string>);
    }
    if (instanceOfstring(value)) {
        return stringToJSON(value as string);
    }

    return {};
}

