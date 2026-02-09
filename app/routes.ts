import {index, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    index("routes/login/LoginPage.tsx"),
    route("createUser", "routes/login/CreateUser.tsx"),
    route("dashboard", "routes/main/Dashboard.tsx"),

] satisfies RouteConfig;
