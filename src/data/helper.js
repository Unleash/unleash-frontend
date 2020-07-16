import { refreshUploanOAuthToken } from '../store/user/actions'
import jwtDecode from 'jwt-decode'

const defaultErrorMessage = 'Unexptected exception when talking to unleash-api';

function extractJoiMsg(body) {
    return body.details.length > 0 ? body.details[0].message : defaultErrorMessage;
}
function extractLegacyMsg(body) {
    return body && body.length > 0 ? body[0].msg : defaultErrorMessage;
}

class ServiceError extends Error {
    constructor(statusCode = 500) {
        super(defaultErrorMessage);
        this.name = 'ServiceError';
        this.statusCode = statusCode;
    }
}

export class AuthenticationError extends Error {
    constructor(statusCode, body) {
        super('Authentication required');
        this.name = 'AuthenticationError';
        this.statusCode = statusCode;
        this.body = body;
    }
}

export class ForbiddenError extends Error {
    constructor(statusCode, body) {
        super('You cannot perform this action');
        this.name = 'ForbiddenError';
        this.statusCode = statusCode;
        this.body = body;
    }
}

export function throwIfNotSuccess(response) {
    if (!response.ok) {
        if (response.status === 401) {
            return new Promise((resolve, reject) => {
                response.json().then(body => reject(new AuthenticationError(response.status, body)));
            });
        } else if (response.status === 403) {
            return new Promise((resolve, reject) => {
                response.json().then(body => reject(new ForbiddenError(response.status, body)));
            });
        } else if (response.status > 399 && response.status < 404) {
            return new Promise((resolve, reject) => {
                response.json().then(body => {
                    const errorMsg = body && body.isJoi ? extractJoiMsg(body) : extractLegacyMsg(body);
                    let error = new Error(errorMsg);
                    error.statusCode = response.status;
                    reject(error);
                });
            });
        } else {
            return Promise.reject(new ServiceError(response.status));
        }
    }
    return Promise.resolve(response);
}

export const uploanUserToUnleashUser = (uploanUser) => {
    return {
        email: uploanUser.user_name,
        permission: uploanUser.permissions,
        type: uploanUser.type,
        roles: uploanUser.roles
    }
}

// this helper method connects Stellar Service and Unleash Front-end
export const iframeEventBinder = (element, eventName, eventHandler) => {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler)
    }
}

export const retrieveOAuthDetails = () => {
    return sessionStorage.getItem('oauth') ? JSON.parse(sessionStorage.getItem('oauth')) : {};
}

export const retrieveTokenBearer = async () => {
    const oauthDetails = retrieveOAuthDetails()
    if (Object.keys(oauthDetails).length === 0) {
        return '';
    }

    const decodedAccessToken = jwtDecode(oauthDetails.access_token)
    const accessTokenExpDate = new Date(decodedAccessToken.exp * 1000)
    const currentDate = new Date()
    if (currentDate > accessTokenExpDate) {
        const refreshTokenParams = { refresh_token: oauthDetails.refresh_token }
        await refreshUploanOAuthToken(process.env.UPLOAN_AUTH_URL, refreshTokenParams)

        const refreshedOAuthDetails = retrieveOAuthDetails()
        return refreshedOAuthDetails.access_token;
    }
    return oauthDetails.access_token;
}

export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};