import {type ApiResponse, NovariApiManager} from "novari-frontend-components";

const apiManager = new NovariApiManager({
    baseUrl: "/api",
})

export async function registerNewBook(title: string, author: string, description: string): Promise<ApiResponse<any>> {

    return await apiManager.call({
        method: "POST",
        endpoint: "/admin/registerNewBook",
        functionName: "registerNewBook",
        body: {
            title,
            author,
            description
        }
    })
}

export async function getAllUsers(): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "/admin/getUsers",
        functionName: "getAllUsers",
    })
}

export async function getAllLoans(): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "/admin/getAllLoans",
        functionName: "getAllLoans",
    })
}

export async function getAllBooksAdmin(): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "GET",
        endpoint: "/admin/getAllBooks",
        functionName: "getAllBooksFull",
    })
}

export async function setAnotherUserAsAdmin(subjectId: string): Promise<ApiResponse<any>> {
    return await apiManager.call({
        method: "PATCH",
        endpoint: "/admin/addAdmin",
        functionName: "setAnotherUserAsAdmin",
        body: {
            subjectId
        }
    })
}