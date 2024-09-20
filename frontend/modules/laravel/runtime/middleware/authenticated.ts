/**
 * Authenticated middleware
 *
 * This middleware is used to check if the user is authenticated against the
 * Laravel API and will redirect to the login page if the user is not
 * authenticated.
 */
export const authenticated = defineNuxtRouteMiddleware(async () => {
        const { authenticated } = useAuthentication();

        if (!authenticated.value === true) {
                return useRuntimeConfig().public.laravel.loginPage;
        }
});
