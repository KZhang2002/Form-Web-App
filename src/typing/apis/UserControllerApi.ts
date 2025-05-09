/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ChangeUserPasswordRequest,
  CreateUserRequest,
  LoginCredential,
  UserInfo,
} from '../models/index';
import {
    ChangeUserPasswordRequestFromJSON,
    ChangeUserPasswordRequestToJSON,
    CreateUserRequestFromJSON,
    CreateUserRequestToJSON,
    LoginCredentialFromJSON,
    LoginCredentialToJSON,
    UserInfoFromJSON,
    UserInfoToJSON,
} from '../models/index';

export interface AddUserRequest {
    createUserRequest: CreateUserRequest;
}

export interface ChangeUserPasswordOperationRequest {
    changeUserPasswordRequest: ChangeUserPasswordRequest;
}

export interface DeleteUserRequest {
    username: string;
}

export interface GetUserFromFormRequest {
    formId: number;
}

export interface GetUserFromSignatureRequest {
    signatureId: number;
}

export interface LoginAdminRequest {
    username: string;
    password: string;
}

export interface LoginUserRequest {
    username: string;
    password: string;
}

/**
 * 
 */
export class UserControllerApi extends runtime.BaseAPI {

    /**
     */
    async addUserRaw(requestParameters: AddUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserInfo>> {
        if (requestParameters['createUserRequest'] == null) {
            throw new runtime.RequiredError(
                'createUserRequest',
                'Required parameter "createUserRequest" was null or undefined when calling addUser().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserRequestToJSON(requestParameters['createUserRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserInfoFromJSON(jsonValue));
    }

    /**
     */
    async addUser(requestParameters: AddUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserInfo> {
        const response = await this.addUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async changeUserPasswordRaw(requestParameters: ChangeUserPasswordOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LoginCredential>> {
        if (requestParameters['changeUserPasswordRequest'] == null) {
            throw new runtime.RequiredError(
                'changeUserPasswordRequest',
                'Required parameter "changeUserPasswordRequest" was null or undefined when calling changeUserPassword().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user/password`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ChangeUserPasswordRequestToJSON(requestParameters['changeUserPasswordRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginCredentialFromJSON(jsonValue));
    }

    /**
     */
    async changeUserPassword(requestParameters: ChangeUserPasswordOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LoginCredential> {
        const response = await this.changeUserPasswordRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['username'] == null) {
            throw new runtime.RequiredError(
                'username',
                'Required parameter "username" was null or undefined when calling deleteUser().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['username'] != null) {
            queryParameters['username'] = requestParameters['username'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteUser(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteUserRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getUserFromFormRaw(requestParameters: GetUserFromFormRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserInfo>> {
        if (requestParameters['formId'] == null) {
            throw new runtime.RequiredError(
                'formId',
                'Required parameter "formId" was null or undefined when calling getUserFromForm().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['formId'] != null) {
            queryParameters['formId'] = requestParameters['formId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/form`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserInfoFromJSON(jsonValue));
    }

    /**
     */
    async getUserFromForm(requestParameters: GetUserFromFormRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserInfo> {
        const response = await this.getUserFromFormRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getUserFromSignatureRaw(requestParameters: GetUserFromSignatureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserInfo>> {
        if (requestParameters['signatureId'] == null) {
            throw new runtime.RequiredError(
                'signatureId',
                'Required parameter "signatureId" was null or undefined when calling getUserFromSignature().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['signatureId'] != null) {
            queryParameters['signatureId'] = requestParameters['signatureId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/signature`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserInfoFromJSON(jsonValue));
    }

    /**
     */
    async getUserFromSignature(requestParameters: GetUserFromSignatureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserInfo> {
        const response = await this.getUserFromSignatureRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getUsersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<UserInfo>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/all`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserInfoFromJSON));
    }

    /**
     */
    async getUsers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<UserInfo>> {
        const response = await this.getUsersRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async loginAdminRaw(requestParameters: LoginAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserInfo>> {
        if (requestParameters['username'] == null) {
            throw new runtime.RequiredError(
                'username',
                'Required parameter "username" was null or undefined when calling loginAdmin().'
            );
        }

        if (requestParameters['password'] == null) {
            throw new runtime.RequiredError(
                'password',
                'Required parameter "password" was null or undefined when calling loginAdmin().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['username'] != null) {
            queryParameters['username'] = requestParameters['username'];
        }

        if (requestParameters['password'] != null) {
            queryParameters['password'] = requestParameters['password'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/login/admin`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserInfoFromJSON(jsonValue));
    }

    /**
     */
    async loginAdmin(requestParameters: LoginAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserInfo> {
        const response = await this.loginAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async loginUserRaw(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserInfo>> {
        if (requestParameters['username'] == null) {
            throw new runtime.RequiredError(
                'username',
                'Required parameter "username" was null or undefined when calling loginUser().'
            );
        }

        if (requestParameters['password'] == null) {
            throw new runtime.RequiredError(
                'password',
                'Required parameter "password" was null or undefined when calling loginUser().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['username'] != null) {
            queryParameters['username'] = requestParameters['username'];
        }

        if (requestParameters['password'] != null) {
            queryParameters['password'] = requestParameters['password'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/login/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserInfoFromJSON(jsonValue));
    }

    /**
     */
    async loginUser(requestParameters: LoginUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserInfo> {
        const response = await this.loginUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
