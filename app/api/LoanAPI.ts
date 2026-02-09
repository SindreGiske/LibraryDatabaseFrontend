import {type ApiResponse, NovariApiManager} from "novari-frontend-components";

const apiManager = new NovariApiManager({
    baseUrl: "http://localhost:8080/loan",
})

export async function createLoan(bookId: number): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "POST",
        endpoint: "",
        functionName: "createLoan",
        body: {
            "bookId": bookId,
        }
    })
}

export async function getMyLoans(): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "/getMyLoans",
        functionName: "getMyLoans",
    })
}

export async function returnBook(loanId: number): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "PATCH",
        endpoint: "/return",
        functionName: "returnBook",
        body: {
            "loanId": loanId
        }
    })
}