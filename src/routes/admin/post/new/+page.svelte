<script lang="ts">
	import { create_post } from '../../posts.remote';

	const { fields } = create_post;
</script>

<form {...create_post}>
	<div class="row">
		<label>
			Title:
			<input {...fields.title.as('text')} />
		</label>
		{#each create_post.fields.title.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
	</div>

	<div class="row">
		<label>
			Body:
			<textarea {...create_post.fields.body.as('text')}></textarea>
		</label>
		{#each create_post.fields.body.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
	</div>

	<button type="submit">post</button>
</form>
