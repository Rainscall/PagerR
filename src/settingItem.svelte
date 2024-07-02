<script>
    export let settingItem;
</script>

<main bind:this={settingItem}>
    <div class="container">
        <slot></slot>
    </div>
</main>

<style>
    .container {
        background-color: #f8f8f8;
        display: flex;
        padding: .5rem;
        border-radius: 0.65rem;
    }

    main {
        max-height: 75vh;
        max-height: 75dvh;
        overflow-y: scroll;
    }
</style>
