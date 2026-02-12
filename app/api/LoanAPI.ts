import {type ApiResponse, NovariApiManager} from "novari-frontend-components";

const apiManager = new NovariApiManager({
    baseUrl: "/api",
})

export async function createLoan(bookId: string): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "POST",
        endpoint: `/loan`,
        functionName: "createLoan",
        body: bookId,
    })
}

export async function getMyLoans(): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "/loan/getMyLoans",
        functionName: "getMyLoans",
    })
}

export async function returnBook(loanId: string): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "PATCH",
        endpoint: "/loan/return",
        functionName: "returnBook",
        body: loanId
    })
}