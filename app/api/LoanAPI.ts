import {type ApiResponse, NovariApiManager} from "novari-frontend-components";

const apiManager = new NovariApiManager({
    baseUrl: "http://localhost:8080/loan",
})

export async function createLoan(bookId: number, userId: number): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "POST",
        endpoint: `?bookId=${bookId}&borrowerId=${userId}`,
        functionName: "getAllBooks",
    })
}

export async function getMyLoans(UserId: number): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: `?borrowerId=${UserId}`,
        functionName: "getMyLoans",
    })
}

export async function returnBook(): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "available",
        functionName: "getAvailableBooks",
    })
}