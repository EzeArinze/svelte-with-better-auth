<script lang="ts">
	import { resolve } from '$app/paths';
	import { get_all_post } from './posts.remote';
</script>

<a class="button" href={resolve('/admin/post/new')}>New post </a>

<ol>
	{#each await get_all_post() as post (post.id)}
		<li>{post.title}</li>
	{/each}
</ol>
