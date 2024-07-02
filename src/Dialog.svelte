<script>
    export let dialog;
    export async function closeDialog() {
        return new Promise((resolve, reject) => {
            dialog.dataset.deleted = true;
            setTimeout(() => {
                dialog.close();
                dialog.dataset.deleted = false;
                resolve();
            }, 235);
        });
    }
</script>

<dialog bind:this={dialog}>
    <slot />
</dialog>

<style>
    dialog::backdrop {
        backdrop-filter: blur(8px);
    }

    dialog {
        background-color: transparent;
        border: 0;
        padding: 0;
        margin: 0;
        outline: none;
        height: 100vh;
        height: 100dvh;
        width: 100vw;
        max-width: 100vw;
        max-height: 100vh;
        max-height: 100dvh;
        animation-name: in;
        animation-duration: 0.235s;
        animation-fill-mode: forwards;
    }

    :global(dialog[data-deleted="true"]) {
        animation-name: out;
        animation-duration: 0.235s;
        animation-fill-mode: forwards;
    }

    :global(dialog[data-deleted="true"]::backdrop) {
        animation-name: out;
        animation-duration: 0.235s;
        animation-fill-mode: forwards;
    }

    @keyframes in {
        from {
            opacity: 0;
            transform: translateX(-25vw) translateY(5vh);
        }

        45% {
            opacity: 0.85;
        }

        to {
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
    }

    @keyframes out {
        from {
            opacity: 1;
            transform: translateX(0) rotate(0) scale(1);
            filter: grayscale(0) brightness(1);
        }

        35% {
            opacity: 0.1;
        }

        to {
            opacity: 0;
            transform: translateX(25vw) rotate(-5deg) scale(0.85);
            filter: grayscale(1) brightness(0.8);
        }
    }
</style>
