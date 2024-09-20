import defu from "defu";
import {
        addImports,
        addPlugin,
        createResolver,
        defineNuxtModule,
} from "nuxt/kit";

type Options = {
        /**
         * Host of the Laravel API.
         *
         * @default "localhost:8000"
         * @example "api.example.com"
         */
        apiHost?: string;

        /**
         * Login page path.
         *
         * This is the path to the login page on the frontend. This is used by the
         * `authenticated` middleware to redirect the user to the login page if they
         * are not authenticated.
         *
         * @example "/login"
         * @example "/auth/login"
         */
        loginPage?: string;

        /**
         * Authenticated page path.
         *
         * This is the path to the authenticated page on the frontend. This is used
         * by the `unauthenticated` middleware to redirect the user to the
         * authenticated page if they are authenticated.
         *
         * @example "/"
         * @example "/dashboard"
         */
        authenticatedPage?: string;

        /**
         * Path to the login endpoint on the Laravel API.
         *
         * This endpoint must be stateful and use cookie-based session. If you used
         * Laravel Breeze with the API preset, you do not need to change this value
         * and the default value is correct.
         *
         * @default "/login"
         * @example "/auth/login"
         */
        loginEndpoint?: string;

        /**
         * Path to the logout endpoint on the Laravel API.
         *
         * This endpoint must be stateful and use cookie-based session. If you used
         * Laravel Breeze with the API preset, you do not need to change this value
         * and the default value is correct.
         *
         * @default "/logout"
         * @example "/auth/logout"
         */
        logoutEndpoint?: string;

        /**
         * Path to the user details endpoint on the Laravel API.
         *
         * This endpoint must be stateful and use cookie-based session. If you used
         * Laravel Breeze with the API preset, you do not need to change this value
         * and the default value is correct.
         *
         * @example "/api/user"
         */
        userDetailsEndpoint?: string;
};

declare module "nuxt/schema" {
        interface PublicRuntimeConfig {
                laravel: Options;
        }
}

export default defineNuxtModule<Options>({
        meta: {
                name: "@offizen/nuxt-laravel",
                configKey: "laravel",
                compatibility: {
                        nuxt: "^3.0.0",
                },
        },
        defaults: {
                apiHost: "localhost:8000",
                loginPage: "/login",
                authenticatedPage: "/",
                loginEndpoint: "/login",
                logoutEndpoint: "/logout",
                userDetailsEndpoint: "/api/user",
        },
        setup(options, nuxt) {
                nuxt.options.runtimeConfig.public.laravel = defu(
                        nuxt.options.runtimeConfig.public.laravel,
                        { ...options },
                );

                const { resolve } = createResolver(import.meta.url);

                addPlugin(resolve("./runtime/plugins/authentication"));
                addImports({
                        name: "useAuthentication",
                        from: resolve("./runtime/composables/authentication"),
                });

                addPlugin(resolve("./runtime/plugins/authorization"));
                addImports({
                        name: "useAuthorization",
                        from: resolve("./runtime/composables/authorization"),
                });

                addImports({
                        name: "useApiFetch",
                        from: resolve("./runtime/composables/api-fetch"),
                });
        },
});
