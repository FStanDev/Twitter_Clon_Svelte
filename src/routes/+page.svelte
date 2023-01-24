<script lang="ts">
	import { loggedUser, pb } from '../lib/auth';
	import { onMount } from 'svelte';
	import type { ListOfMessages, Message } from '../models/messages';
	import MessageComp from './MessageComp.svelte';

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
		<MessageComp mensaje={message} />
	{/each}
{:else}
	<a href="/login">Log in</a>
{/if}

<style>
	h1{
	text-align: center;
	}
</style>
