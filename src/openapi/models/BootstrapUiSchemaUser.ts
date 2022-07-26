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
import type { PermissionSchema } from './PermissionSchema';
import {
    PermissionSchemaFromJSON,
    PermissionSchemaFromJSONTyped,
    PermissionSchemaToJSON,
} from './PermissionSchema';

/**
 * 
 * @export
 * @interface BootstrapUiSchemaUser
 */
export interface BootstrapUiSchemaUser {
    /**
     * 
     * @type {number}
     * @memberof BootstrapUiSchemaUser
     */
    id: number;
    /**
     * 
     * @type {boolean}
     * @memberof BootstrapUiSchemaUser
     */
    isAPI?: boolean;
    /**
     * 
     * @type {string}
     * @memberof BootstrapUiSchemaUser
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof BootstrapUiSchemaUser
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof BootstrapUiSchemaUser
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof BootstrapUiSchemaUser
     */
    imageUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof BootstrapUiSchemaUser
     */
    inviteLink?: string;
    /**
     * 
     * @type {number}
     * @memberof BootstrapUiSchemaUser
     */
    loginAttempts?: number;
    /**
     * 
     * @type {boolean}
     * @memberof BootstrapUiSchemaUser
     */
    emailSent?: boolean;
    /**
     * 
     * @type {number}
     * @memberof BootstrapUiSchemaUser
     */
    rootRole?: number;
    /**
     * 
     * @type {Date}
     * @memberof BootstrapUiSchemaUser
     */
    seenAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof BootstrapUiSchemaUser
     */
    createdAt?: Date;
    /**
     * 
     * @type {Array<PermissionSchema>}
     * @memberof BootstrapUiSchemaUser
     */
    permissions?: Array<PermissionSchema>;
}

/**
 * Check if a given object implements the BootstrapUiSchemaUser interface.
 */
export function instanceOfBootstrapUiSchemaUser(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function BootstrapUiSchemaUserFromJSON(json: any): BootstrapUiSchemaUser {
    return BootstrapUiSchemaUserFromJSONTyped(json, false);
}

export function BootstrapUiSchemaUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): BootstrapUiSchemaUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'isAPI': !exists(json, 'isAPI') ? undefined : json['isAPI'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'username': !exists(json, 'username') ? undefined : json['username'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
        'inviteLink': !exists(json, 'inviteLink') ? undefined : json['inviteLink'],
        'loginAttempts': !exists(json, 'loginAttempts') ? undefined : json['loginAttempts'],
        'emailSent': !exists(json, 'emailSent') ? undefined : json['emailSent'],
        'rootRole': !exists(json, 'rootRole') ? undefined : json['rootRole'],
        'seenAt': !exists(json, 'seenAt') ? undefined : (json['seenAt'] === null ? null : new Date(json['seenAt'])),
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'permissions': !exists(json, 'permissions') ? undefined : ((json['permissions'] as Array<any>).map(PermissionSchemaFromJSON)),
    };
}

export function BootstrapUiSchemaUserToJSON(value?: BootstrapUiSchemaUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'isAPI': value.isAPI,
        'name': value.name,
        'email': value.email,
        'username': value.username,
        'imageUrl': value.imageUrl,
        'inviteLink': value.inviteLink,
        'loginAttempts': value.loginAttempts,
        'emailSent': value.emailSent,
        'rootRole': value.rootRole,
        'seenAt': value.seenAt === undefined ? undefined : (value.seenAt === null ? null : value.seenAt.toISOString()),
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'permissions': value.permissions === undefined ? undefined : ((value.permissions as Array<any>).map(PermissionSchemaToJSON)),
    };
}

