<script lang="ts">
	import { loggedUser, pb } from '../lib/auth';
	import { onMount } from 'svelte';
	import type { ListOfMessages, Message } from '../models/messages';

	let resultList: ListOfMessages;
	export let messages: Message[] = [];
	async function get_messages() {
		resultList = await pb.collection('messages').getList(1, 50, {
			sort: '-created'
		});
	}

	onMount(async () => {
		if (loggedUser) {
			await get_messages();
			console.log(resultList);
			messages = resultList.items;
			console.log(messages);
		}
	});
</script>

{#if $loggedUser}
	<h1>Welcome to Twitter_Clon</h1>
	{#each messages as message}
		<div>{message.message}</div>
	{/each}
{:else}
	<!--<meta http-equiv='refresh' content='0; URL=/login'>-->
	<a href="/login">Log in</a>
{/if}
