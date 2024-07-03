<script>
	import Bar from "./bar.svelte";
	import { SvelteToast, toast } from "@zerodevx/svelte-toast";
	import SearchInput from "./searchInput.svelte";
	import Clock from "./clock.svelte";

	let toastOptions = {};
</script>

<main>
	<div class="toastContainer">
		<SvelteToast {toastOptions} />
	</div>
	<Clock></Clock>
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
		/* text-align: center; */
		width: 90vw;
		box-sizing: border-box;
		max-width: 512px;
		margin: auto;
		min-height: 50vh;
		min-height: 50dvh;
	}
</style>
