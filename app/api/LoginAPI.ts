import {NovariApiManager} from "novari-frontend-components";

    const loginManager = new NovariApiManager({
        baseUrl: "http://localhost:5000/login",
    })

    export async function attemptLogin(email: string, password: string): Promise<any> {

        const login = await loginManager.call({
            method: "GET",
            endpoint: "/",
            functionName: "login",
            body: {
                "email": email,
                "password": password
            }
        })
    }

    export async function createUser(name: string, email: string, password: string): Promise<any> {

        const create = await loginManager.call({
            method: "POST",
            endpoint: "/",
            functionName: "createUser",
            body: {
                "name": name,
                "email": email,
                "password": password
            }

        })
    }
