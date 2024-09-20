export const unauthenticated = defineNuxtRouteMiddleware(async () => {
        const { authenticated } = useAuthentication();

        if (authenticated.value === true) {
                return useRuntimeConfig().public.laravel.authenticatedPage;
        }
});
