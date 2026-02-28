import { createAuthClient } from 'better-auth/svelte';
import { adminClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	fetchOptions: {
		onError: async (context) => {
			const { response } = context;
			if (response.status === 429) {
				const retryAfter = response.headers.get('X-Retry-After');
				console.log(`Wait and retry after ${retryAfter}`);
			}
		}
	},
	plugins: [adminClient()]
});
