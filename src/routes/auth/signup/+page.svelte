<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';

	let error = $state('');

	const handleSignUp = async (e: Event) => {
		e.preventDefault();
		const formData = e.target as HTMLFormElement;

		const email = formData.email.value;
		const username = formData.username.value;
		const password = formData.password.value;
		const password_confirm = formData.password_confirm.value;

		if (password !== password_confirm) {
			error = 'Password does not match';
			return;
		}

		if (!password || !email || !username || !password_confirm) {
			error = 'All field is required';
			return;
		}

		await authClient.signUp.email(
			{
				name: username,
				email,
				password,
				callbackURL: '/'
			},
			{
				onSuccess: (context) => {
					console.log(context.data);
					goto(resolve('/'));
				}
			}
		);
	};
</script>

<div class="box-1">
	<h1>Sign Up</h1>
	<form onsubmit={handleSignUp}>
		<div class="row">
			<label>
				Username
				<input type="text" id="username" />
			</label>
		</div>
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
		<div class="row">
			<label>
				Confirm Password
				<input type="password" id="password_confirm" />
			</label>
		</div>
		{#if error}
			<p style:color="var(--red;)">{error}</p>
		{/if}
		<button type="submit">Sign Up</button>
	</form>
</div>
