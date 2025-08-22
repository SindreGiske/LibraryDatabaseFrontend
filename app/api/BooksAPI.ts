import {NovariApiManager} from "novari-frontend-components";

const apiManager = new NovariApiManager({
    baseUrl: "http://localhost:8080/books",
})

export async function getAllBooks() {

    return await apiManager.call({
        method: "GET",
        endpoint: "all",
        functionName: "getAllBooks",
    })
}

export async function getAvailable() {

    return await apiManager.call({
        method: "GET",
        endpoint: "available",
        functionName: "getAvailableBooks",
    })
}