import {type ApiResponse, NovariApiManager} from "novari-frontend-components";

const apiManager = new NovariApiManager({
    baseUrl: "http://localhost:8080/books",
})

export async function getAllBooks(): Promise<ApiResponse<any>> {

    return await apiManager.call({
        method: "GET",
        endpoint: "/all",
        functionName: "getAllBooks",
    })
}

export async function getAvailable(): Promise<ApiResponse<any>> {

    return await apiManager.call({
        method: "GET",
        endpoint: "/available",
        functionName: "getAvailableBooks",
    })
}

export async function searchForBooks(input: string): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "/search",
        functionName: "searchBooks",
        body: {
            "input": input
        }
    })
}