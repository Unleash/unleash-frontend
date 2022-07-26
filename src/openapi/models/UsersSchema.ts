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
import type { RoleSchema } from './RoleSchema';
import {
    RoleSchemaFromJSON,
    RoleSchemaFromJSONTyped,
    RoleSchemaToJSON,
} from './RoleSchema';
import type { UserSchema } from './UserSchema';
import {
    UserSchemaFromJSON,
    UserSchemaFromJSONTyped,
    UserSchemaToJSON,
} from './UserSchema';

/**
 * 
 * @export
 * @interface UsersSchema
 */
export interface UsersSchema {
    /**
     * 
     * @type {Array<UserSchema>}
     * @memberof UsersSchema
     */
    users: Array<UserSchema>;
    /**
     * 
     * @type {Array<RoleSchema>}
     * @memberof UsersSchema
     */
    rootRoles?: Array<RoleSchema>;
}

/**
 * Check if a given object implements the UsersSchema interface.
 */
export function instanceOfUsersSchema(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "users" in value;

    return isInstance;
}

export function UsersSchemaFromJSON(json: any): UsersSchema {
    return UsersSchemaFromJSONTyped(json, false);
}

export function UsersSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'users': ((json['users'] as Array<any>).map(UserSchemaFromJSON)),
        'rootRoles': !exists(json, 'rootRoles') ? undefined : ((json['rootRoles'] as Array<any>).map(RoleSchemaFromJSON)),
    };
}

export function UsersSchemaToJSON(value?: UsersSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'users': ((value.users as Array<any>).map(UserSchemaToJSON)),
        'rootRoles': value.rootRoles === undefined ? undefined : ((value.rootRoles as Array<any>).map(RoleSchemaToJSON)),
    };
}

