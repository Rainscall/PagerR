<script>
	import { onMount } from "svelte";
	import Bar from "./bar.svelte";
	import { SvelteToast, toast } from "@zerodevx/svelte-toast";
	import SearchInput from "./searchInput.svelte";

	let toastOptions = {};

	export let timeArr;
	let showSec = localStorage.getItem("showSec") == "true" || false;

	timeArr = getTime().split(":");
	let timer;

	onMount(() => {
		timer = setInterval(() => {
			timeArr = getTime().split(":");
		}, 1000);
	});

	function getTime() {
		let timestamp = Date.now();
		timestamp = Number(timestamp);
		const date = new Date(timestamp);

		const hours = ("0" + date.getHours()).slice(-2);
		const minutes = ("0" + date.getMinutes()).slice(-2);
		const seconds = ("0" + date.getSeconds()).slice(-2);

		if (showSec) {
			return `${hours}:${minutes}:${seconds}`;
		}
		return `${hours}:${minutes}`;
	}

	function toggle() {
		showSec = !showSec;
		timeArr = getTime().split(":");
		localStorage.setItem("showSec", showSec);
	}
</script>

<main>
	<div class="toastContainer">
		<SvelteToast {toastOptions} />
	</div>
	<div class="timeContainer" on:click={toggle}>
		<h1>
			{#each timeArr as str, i}
				<span>{str}</span>
				{#if i < timeArr.length - 1}
					<span class="spliter">:</span>
				{/if}
			{/each}
		</h1>
	</div>
	<SearchInput></SearchInput>
	<Bar></Bar>
</main>

<style>
	:root {
		--toastContainerTop: 0.5rem;
		--toastMsgPadding: 1rem;
		--toastBorderRadius: 0.8rem;
		--toastBarHeight: 3px;
		--toastBarBackground: #fff;
		--toastBackground: #f5f5f5;
		--toastColor: #000;
		--toastPadding: 0.5rem;
		--toastMinHeight: 1.5rem;
		--toastHeight: fit-content;
		--toastMsgPadding: 0 0 0 0.8rem;
		--toastWidth: fit-content;
		--toastContainerLeft: 1.5rem;
		--toastContainerRight: 1.5rem;
		--toastAlign: center;
	}

	:global(.toastContainer > ul > li ._toastMsg) {
		overflow: hidden;
		word-wrap: break-word;
		max-width: 512px;
	}

	:global(.toastContainer > ul > li) {
		display: flex;
		justify-content: var(--toastAlign, center);
	}

	main {
		text-align: center;
		width: 90vw;
		box-sizing: border-box;
		max-width: 768px;
		margin: auto;
		min-height: 50vh;
		min-height: 50dvh;
	}

	.timeContainer {
		padding: 0.5rem;
		user-select: none;
		container-type: inline-size;
		cursor: pointer;
		width: fit-content;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 200;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			"Open Sans",
			"Helvetica Neue",
			sans-serif;
		display: flex;
		justify-content: center;
	}

	@keyframes fading {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.5;
		}
	}

	.spliter {
		animation-name: fading;
		animation-duration: 0.735s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-direction: alternate-reverse;
	}

	@media (prefers-color-scheme: dark) {
		.timeContainer {
			color: #fff;
		}
	}
</style>
