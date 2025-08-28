import {type ApiResponse, NovariApiManager} from "novari-frontend-components";

const apiManager = new NovariApiManager({
    baseUrl: "http://localhost:8080/loan",
})

export async function createLoan(bookId: number, userId: number): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "POST",
        endpoint: "",
        functionName: "getAllBooks",
        body: {
            "bookId": bookId,
            "borrowerId": userId
        }
    })
}

export async function getMyLoans(UserId: number): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "",
        functionName: "getMyLoans",
        body: {
            "borrowerId": UserId,
        }
    })
}

export async function returnBook(loanId: number): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "PATCH",
        endpoint: "",
        functionName: "returnBook",
        body: {
            "loanId": loanId
        }
    })
}