import { authenticated } from "~/modules/laravel/runtime/middleware/authenticated";
import { unauthenticated } from "~/modules/laravel/runtime/middleware/unauthenticated";

export default defineNuxtPlugin(() => {
        addRouteMiddleware("authenticated", authenticated);
        addRouteMiddleware("unauthenticated", unauthenticated);
});
