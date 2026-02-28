<script lang="ts">
	import { page } from '$app/state';
	import { get_post_by_id, update_post } from '../../posts.remote';

	const { id }: Record<string, string> = page.params;

	const post = await get_post_by_id(id!);
</script>

{#if post}
	{post.title}
{/if}

<form {...update_post}>
	<input {...update_post.fields.id.as('text')} hidden value={post?.id} />

	<div class="row">
		<label>
			Title:
			<input {...update_post.fields.title.as('text')} value={post?.title} />
		</label>
		{#each update_post.fields.title.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
	</div>

	<div class="row">
		<label>
			Body:
			<textarea {...update_post.fields.body.as('text')} value={post?.body}></textarea>
		</label>
		{#each update_post.fields.body.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
	</div>

	<button type="submit">update post</button>
</form>
