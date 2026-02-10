import {type ApiResponse, NovariApiManager} from "novari-frontend-components";

const apiManager = new NovariApiManager({
    baseUrl: "/api",
})

export async function getAllBooks(): Promise<ApiResponse<any>> {

    return await apiManager.call({
        method: "GET",
        endpoint: "/books/all",
        functionName: "getAllBooks",
    })
}

export async function getAvailable(): Promise<ApiResponse<any>> {

    return await apiManager.call({
        method: "GET",
        endpoint: "/books/available",
        functionName: "getAvailableBooks",
    })
}

export async function searchForBooks(input: string): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "/books/search",
        functionName: "searchBooks",
        body: {
            "input": input
        }
    })
}