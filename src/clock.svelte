<script>
    import { onMount } from "svelte";
    export let timeArr;
    import { config, changeConfig } from "./config.js";

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

        if (config.showSec) {
            return `${hours}:${minutes}:${seconds}`;
        }
        return `${hours}:${minutes}`;
    }
</script>

<div class="timeContainer">
    <h1>
        {#each timeArr as str, i}
            <span>{str}</span>
            {#if i < timeArr.length - 1}
                <span class="spliter">:</span>
            {/if}
        {/each}
    </h1>
</div>

<style>
    @keyframes fading {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.5;
        }
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
        color: #fff;
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
        h1 {
            color: #000;
        }
    }
</style>
