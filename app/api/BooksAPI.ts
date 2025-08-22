import {NovariApiManager} from "novari-frontend-components";

const booksManager = new NovariApiManager({
    baseUrl: "http://localhost:8080/books",
})

export async function getAllBooks() {

    return await booksManager.call({
        method: "GET",
        endpoint: "all",
        functionName: "getAllBooks",
    })
}

export async function getAvailable() {

    return await booksManager.call({
        method: "GET",
        endpoint: "available",
        functionName: "getAvailableBooks",
    })
}