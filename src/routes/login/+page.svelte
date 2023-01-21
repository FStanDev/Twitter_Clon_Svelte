<script lang="ts">
	import { loggedUser, pb } from '../../lib/auth';
	let username = '';
	let password = '';
	async function logUser() {
		await pb.collection('users').authWithPassword(username, password);
	}

	async function signIn() {
		const data = {
			username: username,
			password: password,
			passwordConfirm: password
		};

		await pb.collection('users').create(data);
		await logUser();
	}
</script>

{#if $loggedUser}
	<h1>Your are logged as {$loggedUser.username}</h1>
{:else}
	<h1>Sign in</h1>
	<form>
		<input placeholder="Username" type="text" bind:value={username} />
		<input placeholder="Password" type="password" bind:value={password} />
		<button on:click={() => logUser()}>Log in</button>
		<button on:click={() => signIn()}>Sign in</button>
	</form>
{/if}
