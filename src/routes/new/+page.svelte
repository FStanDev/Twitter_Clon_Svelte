<script lang="ts">
	import { loggedUser, pb } from '../../lib/auth';

	export let new_message = '';

	async function create_new_message() {
		const username = $loggedUser?.id;
		const data = {
			message: new_message,
			createdby: username,
			likes: 0,
			dislikes: 0
		};
		await pb
			.collection('messages')
			.create(data)
			.then(() => window.location.replace('/'))
			.catch(() => alert('Unable to send your message'));
	}
</script>

{#if $loggedUser}
	<h1>New Message</h1>
	<textarea placeholder="Type your new message" bind:value={new_message} />
	<button on:click={() => create_new_message()}>Create message</button>
{:else}
	<a href="/login">Log in</a>
{/if}

<style>
	h1 {
		text-align: center;
	}
</style>
