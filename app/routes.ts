import {
    type RouteConfig,
    index,
    route
} from "@react-router/dev/routes";

export default [
    index("routes/login/loginPage.tsx"),
    route("createUser", "routes/login/CreateUser.tsx"),

    ] satisfies RouteConfig;
