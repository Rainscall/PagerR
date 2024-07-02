<script>
    import Icon from "@iconify/svelte";

    function search() {
        if (!target) {
            return;
        }
        window.open(`${engine}${encodeURIComponent(target)}`, "_blank");
    }

    let target = "";
    let engine = "https://www.google.com/search?q=";
</script>

<main>
    <select
        on:select={(e) => {
            engine = e.target.value;
        }}
    >
        <option value="https://www.google.com/search?q=">Google</option>
        <option value="https://www.bing.com/search?q=">Bing</option>
    </select>
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
            required
        />
    </form>
    <div class="icon" on:click={search}>
        <Icon
            icon="ic:baseline-search"
            style="cursor:pointer;display:block"
            height="1.5rem"
            width="1.5rem"
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

    main {
        display: flex;
        background-color: #f5f5f5;
        padding: 0.5rem 1rem 0.5rem 0.5rem;
        border-radius: 114514rem;
        overflow: hidden;
        gap: 0.3rem;
        user-select: none;
    }
    form {
        display: flex;
        width: 100%;
    }
    select {
        outline: 0;
        border: 0;
        background-color: transparent;
    }

    @media (prefers-color-scheme: dark) {
        select,
        main {
            background-color: #141414;
            color: #fff;
        }

        input {
            color: #fff;
        }
    }
</style>
