<script lang="ts">
	import { loggedUser, pb } from '../lib/auth';
	import { onMount } from 'svelte';
	import type { ListOfMessages, Message } from '../models/messages';
	import MessageComp from './MessageComp.svelte';

	let yPosition = 0;
	$: if (yPosition * 100 > midPage) {
		addNewPage();
	}
	let resultList: ListOfMessages;
	export let messages: Message[] = [];
	let currentPage = 1;
	let midPage = 0;
	let totalPages = 1;

	async function get_messages(page: number) {
		resultList = await pb.collection('messages').getList(page, 5, {
			sort: '-created',
			expand: 'createdby'
		});
	}

	async function addNewPage() {
		if (currentPage + 1 <= totalPages) {
			currentPage = currentPage + 1;
			await get_messages(currentPage);
			let newArray = resultList.items.map((mensaje) => {
				mensaje.username = mensaje.expand.createdby.username;
				return mensaje;
			});
			newArray = messages.concat(...newArray);
			messages = newArray;
		}
	}

	onMount(async () => {
		if (loggedUser) {
			await get_messages(0);
			messages = resultList.items;
			messages = messages.map((mensaje, index) => {
				mensaje.username = resultList.items[index].expand.createdby.username;
				return mensaje;
			});
			console.log(messages);
			totalPages = resultList.totalPages;
		}
		midPage = document.documentElement.scrollHeight / 2;
	});
</script>

<svelte:window bind:scrollY={yPosition} />

{#if $loggedUser}
	<h1>Welcome to Twitter_Clon</h1>
	<a class="addReference" href="/new">+</a>
	{#each messages as message}
		<MessageComp mensaje={message} />
	{/each}
{:else}
	<a href="/login">Log in</a>
{/if}

<style>
	h1 {
		text-align: center;
	}
	.addReference {
		all: unset;
		font-size: 59px;
		position: fixed;
		color: white;
		margin-top: 100%;
		bottom: 15px;
		right: 15px;
		background-color: #1c82ad;
		height: 60px;
		width: 60px;
		border-radius: 30px;
		text-align: center;
		align-items: center;
	}
</style>
