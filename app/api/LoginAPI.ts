import {type ApiResponse, NovariApiManager} from "novari-frontend-components";
import type {UserInfo} from "~/types/UserInfo";

const loginManager = new NovariApiManager({
    baseUrl: "http://localhost:8080/login",
})

export async function attemptLogin(email: string, password: string): Promise<ApiResponse<UserInfo | null>> {

    return await loginManager.call({
        method: "POST",
        endpoint: ``,
        functionName: "login",
        body: {
            "email": email,
            "password": password,
        }
    })
}

export async function createUser(name: string, email: string, password: string): Promise<ApiResponse<UserInfo | null>> {

    return await loginManager.call({
        method: "POST",
        endpoint: `/register`,
        functionName: "createUser",
        body: {
            "name": name,
            "email": email,
            "password": password,
        }
    })
}
