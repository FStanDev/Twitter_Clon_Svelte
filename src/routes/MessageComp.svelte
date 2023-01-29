<script lang="ts">
	import { onMount } from 'svelte';
	import type { null_to_empty } from 'svelte/internal';
	import { pb } from '../lib/auth';
	import type { Message } from '../models/messages';

	export let mensaje: Message;
	let username: Object;

	async function get_username() {
		if (username === null) {
			await pb
				.collection('users')
				.getOne(mensaje.createdby)
				.then((data) => (username = data.username))
				.catch((error) => alert(error));
		}
	}

	async function like() {
		const data = {
			likes: mensaje.likes + 1
		};
		await pb
			.collection('messages')
			.update(mensaje.id, data)
			.then((data) => (mensaje.likes = data.likes))
			.catch(() => alert('Error sending like to server'));
	}
	async function dislike() {
		const data = { dislikes: mensaje.dislikes + 1 };
		await pb
			.collection('messages')
			.update(mensaje.id, data)
			.then((data) => (mensaje.dislikes = data.dislikes))
			.catch(() => alert('Error sending dislike to server'));
	}
</script>

<div class="messageContainer">
	<div class="textInMessage">{mensaje.message}</div>
	<div class="textInMessage">{mensaje.username}</div>
	<div class="likeCounter">
		<div class="likeContainer">
			<button on:click={() => like()} class="likebutton"
				><svg
					width="24px"
					height="24px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.34997 19.58 9.34997H15.58C14.98 9.34997 14.48 8.84997 14.58 8.14997L15.08 4.94997C15.28 4.04997 14.68 3.04997 13.78 2.74997C12.98 2.44997 11.98 2.84997 11.58 3.44997L7.47998 9.54997"
						stroke="#292D32"
						stroke-width="1.5"
						stroke-miterlimit="10"
					/>
					<path
						d="M2.38 18.35V8.55002C2.38 7.15002 2.98 6.65002 4.38 6.65002H5.38C6.78 6.65002 7.38 7.15002 7.38 8.55002V18.35C7.38 19.75 6.78 20.25 5.38 20.25H4.38C2.98 20.25 2.38 19.75 2.38 18.35Z"
						stroke="#292D32"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg></button
			>
			<p>{mensaje.likes}</p>
		</div>
		<div class="likeContainer">
			<div>
				<button on:click={() => dislike()} class="dislike likebutton">
					<svg
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.34997 19.58 9.34997H15.58C14.98 9.34997 14.48 8.84997 14.58 8.14997L15.08 4.94997C15.28 4.04997 14.68 3.04997 13.78 2.74997C12.98 2.44997 11.98 2.84997 11.58 3.44997L7.47998 9.54997"
							stroke="#292D32"
							stroke-width="1.5"
							stroke-miterlimit="10"
						/>
						<path
							d="M2.38 18.35V8.55002C2.38 7.15002 2.98 6.65002 4.38 6.65002H5.38C6.78 6.65002 7.38 7.15002 7.38 8.55002V18.35C7.38 19.75 6.78 20.25 5.38 20.25H4.38C2.98 20.25 2.38 19.75 2.38 18.35Z"
							stroke="#292D32"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg></button
				>
			</div>
			<p>{mensaje.dislikes}</p>
		</div>
	</div>
</div>

<style>
	.messageContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-bottom: 1px solid white;
	}
	.messageContainer:first-of-type {
		border-top: 1px solid white;
	}

	.likeCounter {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.likeContainer {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.dislike {
		transform: rotate(180deg);
	}

	.likebutton {
		border: none;
		background-color: transparent;
		filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(236deg) brightness(104%) contrast(101%);
	}

	.textInMessage {
		align-self: center;
		margin-top: 1rem;
	}
</style>
