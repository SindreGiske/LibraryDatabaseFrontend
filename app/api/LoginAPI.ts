import {type ApiResponse, NovariApiManager} from "novari-frontend-components";

const loginManager = new NovariApiManager({
    baseUrl: "http://localhost:8080/login",
})

export async function attemptLogin(email: string, password: string): Promise<ApiResponse<any>> {

    return await loginManager.call({
        method: "GET",
        endpoint: `?email=${email}&password=${password}`,
        functionName: "login",
    })
}

export async function createUser(name: string, email: string, password: string): Promise<ApiResponse<any>> {

    return await loginManager.call({
        method: "POST",
        endpoint: `?name="${name}"&email="${email}"&password="${password}"`,
        functionName: "createUser",
    })
}
