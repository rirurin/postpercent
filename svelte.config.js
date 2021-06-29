import vercel from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: vercel(),
		ssr: false
	}
};