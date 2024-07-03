<script>
    import Icon from "@iconify/svelte";
    import { config } from "./config";
    import { onDestroy, onMount } from "svelte";

    function search() {
        if (!target) {
            return;
        }
        window.open(`${config.engine}${encodeURIComponent(target)}`, "_blank");
        if (config.clearInfoAfterSearch) {
            target = "";
        }
    }

    let rateLimit = null;
    function autocomplete() {
        if (!target) {
            return;
        }
        if (rateLimit) {
            clearTimeout(rateLimit);
            rateLimit = setTimeout(getData, 300);
            return;
        }
        rateLimit = setTimeout(getData, 300);

        function getData() {
            let script = document.createElement("script");
            script.src = `https://api.bing.com/qsonhs.aspx?type=cb&q=${encodeURIComponent(target)}&cb=window.bingSearchAutocompeleteCallBack`;
            document.getElementsByTagName("head")[0].appendChild(script);

            window.bingSearchAutocompeleteCallBack = (data) => {
                script.remove();
                suggests = getList(data);
            };

            function getList(data) {
                data = data.AS;
                if (!data.FullResults) {
                    return [];
                }

                let r = [];
                data.Results.forEach((e) => {
                    e.Suggests.forEach((c) => {
                        r.push(c);
                    });
                });
                return r;
            }
        }
    }

    let suggests = [];
    let target = "";
    let suggestsContainer;

    function closeSug(e) {
        if (!suggests[0]) {
            return;
        }

        if (
            suggestsContainer.contains(e.target) ||
            suggestsContainer == e.target
        ) {
            return;
        }
        suggests = [];
    }

    onMount(() => {
        document.addEventListener("click", closeSug);
    });

    onDestroy(() => {
        document.removeEventListener("click", closeSug);
    });
</script>

<main>
    <div class="inputArea">
        <form
            on:submit={(e) => {
                e.preventDefault();
                search();
            }}
        >
            <input
                type="text"
                autocomplete="off"
                autofocus="off"
                autocapitalize="off"
                placeholder="Search something..."
                required="required"
                bind:value={target}
                on:input={autocomplete}
            />
        </form>
        <div class="icon" on:click={search}>
            <Icon
                icon="ic:baseline-search"
                style="cursor:pointer;display:block"
                height="1.4rem"
                width="1.4rem"
                on:click={search}
            ></Icon>
        </div>
    </div>

    {#if suggests[0]}
        <div style="margin-top: .5rem;" bind:this={suggestsContainer}>
            <ul>
                {#each suggests as sug}
                    <li
                        on:click={() => {
                            target = sug.Txt;
                            search();
                            suggests = [];
                        }}
                    >
                        <span>{sug.Txt}</span>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</main>

<style>
    input {
        outline: 0;
        border: 0;
        background-color: transparent;
        width: 100%;
        user-select: auto;
    }

    input::placeholder {
        transform: translateY(1px);
    }

    .inputArea {
        display: flex;
        background-color: #f5f5f5;
        padding: 0.5rem 1rem;
        border-radius: 114514rem;
        overflow: hidden;
        gap: 0.3rem;
        user-select: none;
    }

    form {
        display: flex;
        width: 100%;
    }

    ul {
        background-color: #0000000a;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        padding: 0.8rem 0;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 1rem;
        animation-name: sugIn;
        animation-duration: 0.235s;
        animation-fill-mode: forwards;
    }

    li {
        padding: 0.3rem 0.8rem;
        font-size: 0.9em;
        cursor: pointer;
    }

    li:hover {
        background-color: #0000000a;
        transition: all 0.235s;
    }

    li > span {
        display: block;
        transition: all 0.235s;
        transform: translateX(0);
        user-select: none;
    }

    li:hover > span {
        transform: translateX(0.4rem);
    }

    @keyframes sugIn {
        from {
            opacity: 0;
            transform: translateY(-2rem);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }

    @media (prefers-color-scheme: dark) {
        .inputArea {
            background-color: #141414;
            color: #fff;
        }

        input {
            color: #fff;
        }

        li:hover,
        ul {
            background-color: #ffffff0a;
        }
    }
</style>
