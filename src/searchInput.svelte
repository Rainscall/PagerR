<script>
    import Icon from "@iconify/svelte";
    import { config } from "./config";

    function search() {
        if (!target) {
            return;
        }
        window.open(`${engine}${encodeURIComponent(target)}`, "_blank");
        if (config.clearInfoAfterSearch) {
            target = "";
        }
    }

    let target = "";
    let engine = "https://www.google.com/search?q=";
</script>

<main>
    <form
        on:submit={(e) => {
            e.preventDefault();
            target = e.target.children[0].value;
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
            value={target}
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

    main {
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

    @media (prefers-color-scheme: dark) {
        main {
            background-color: #141414;
            color: #fff;
        }

        input {
            color: #fff;
        }
    }
</style>
