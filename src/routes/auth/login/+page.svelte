<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';
	import { get_user } from '../../user.remote';

	let error = $state('');

	const handleSignIn = async (e: Event) => {
		e.preventDefault();
		const formData = e.target as HTMLFormElement;

		const email = formData.email.value;
		const password = formData.password.value;

		if (!password || !email) {
			error = 'All field is required';
			return;
		}

		await authClient.signIn.email(
			{
				email,
				password,
				callbackURL: '/'
			},
			{
				onSuccess: async () => {
					await get_user().refresh();
					goto(resolve('/'));
				}
			}
		);
	};
</script>

<div class="box-1">
	<h1>Sign In</h1>
	<form onsubmit={handleSignIn}>
		<div class="row">
			<label>
				Email
				<input type="email" id="email" />
			</label>
		</div>
		<div class="row">
			<label>
				Password
				<input type="password" id="password" />
			</label>
		</div>

		{#if error}
			<p style:color="var(--red;)">{error}</p>
		{/if}
		<button type="submit">Sign in</button>
	</form>
</div>

<p>Create account: <a href={resolve('/auth/signup')}>sign-up</a></p>
