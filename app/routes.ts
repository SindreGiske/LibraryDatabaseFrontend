import {index, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    index("routes/login/LoginPage.tsx"),
    route("CreateUser", "routes/login/CreateUser.tsx"),
    route("Dashboard", "routes/main/Dashboard.tsx"),

] satisfies RouteConfig;
