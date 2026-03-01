<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="row">
	<h1>Welcome to SvelteKit</h1>

	<p>This is a SvelteKit app with better-auth, drizzle, and neon db</p>

	<a class="button" href={resolve('/auth/login')}>Get Started</a>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
