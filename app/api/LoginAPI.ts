import {type ApiResponse, NovariApiManager} from "novari-frontend-components";
import type {UserInfo} from "~/types/UserInfo";

const loginManager = new NovariApiManager({
    baseUrl: "/api",
})

export async function attemptLogin(email: string, password: string): Promise<ApiResponse<null>> {

    return await loginManager.call({
        method: "POST",
        endpoint: `/login`,
        functionName: "login",
        body: {
            "email": email,
            "password": password,
        },
    })
}

export async function logOut(): Promise<ApiResponse<null>> {

    return await loginManager.call({
        method: "POST",
        endpoint: `/login/logout`,
        functionName: "logout",
    })
}

export async function createUser(name: string, email: string, password: string): Promise<ApiResponse<null>> {

    return await loginManager.call({
        method: "POST",
        endpoint: `/login/register`,
        functionName: "createUser",
        body: {
            "name": name,
            "email": email,
            "password": password,
        }
    })
}

export async function deleteSelf(): Promise<ApiResponse<null>> {
    return await loginManager.call({
        method: "DELETE",
        endpoint: `/login/delete`,
        functionName: "deleteSelf",
    })
}

export async function getMe(): Promise<ApiResponse<UserInfo | null>> {
    return await loginManager.call({
        method: "GET",
        endpoint: `/login/me`,
        functionName: "me",
    })
}