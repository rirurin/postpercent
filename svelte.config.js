/** @type {import('@sveltejs/kit').Config} */
import vercel from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: vercel()
	}
};