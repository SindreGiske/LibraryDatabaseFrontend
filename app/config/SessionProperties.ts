export class SessionProperties {
    static cookie: string = "";

    static setProperties(request: Request) {
        SessionProperties.cookie = request.headers.get("Cookie") || "";
    }

    static getCookie() {
        return SessionProperties.cookie;
    }
}