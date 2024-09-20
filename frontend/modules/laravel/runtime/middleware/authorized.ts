/**
 * Authorized middleware
 *
 * This middleware is used to check if the user is is authorized to access the
 * page. If the user is not authorized, they will be redirected to the
 * authenticated page.
 */
export const authorized = (permissions: string[]) =>
	defineNuxtRouteMiddleware(async ({ meta }) => {
		const { hasAnyPermissions } = useAuthorization();

		if (!hasAnyPermissions(meta.requiredPermissions ?? [])) {
			return useRuntimeConfig().public.laravel.authenticatedPage;
		}
	});
