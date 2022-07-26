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
import type { ProjectSchema } from './ProjectSchema';
import {
    ProjectSchemaFromJSON,
    ProjectSchemaFromJSONTyped,
    ProjectSchemaToJSON,
} from './ProjectSchema';

/**
 * 
 * @export
 * @interface ProjectsSchema
 */
export interface ProjectsSchema {
    /**
     * 
     * @type {number}
     * @memberof ProjectsSchema
     */
    version: number;
    /**
     * 
     * @type {Array<ProjectSchema>}
     * @memberof ProjectsSchema
     */
    projects: Array<ProjectSchema>;
}

/**
 * Check if a given object implements the ProjectsSchema interface.
 */
export function instanceOfProjectsSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "projects" in value;

    return isInstance;
}

export function ProjectsSchemaFromJSON(json: any): ProjectsSchema {
    return ProjectsSchemaFromJSONTyped(json, false);
}

export function ProjectsSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectsSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': json['version'],
        'projects': ((json['projects'] as Array<any>).map(ProjectSchemaFromJSON)),
    };
}

export function ProjectsSchemaToJSON(value?: ProjectsSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'projects': ((value.projects as Array<any>).map(ProjectSchemaToJSON)),
    };
}

