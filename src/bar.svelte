<script>
    import Icon from "@iconify/svelte";
    import Dialog from "./Dialog.svelte";
    import SettingGroup from "./settingGroup.svelte";
    import { toast } from "@zerodevx/svelte-toast";

    function display() {
        if (showRest) {
            return;
        }
        showRest = true;
    }

    function hide() {
        showRest = false;
    }
    export let showRest = false;
    export let infoDialog;
    export let settingDialog;
    let infoDialogComponent;
    let settingDialogComponent;
    export let buildHash;
    buildHash = __BUILD_COMMIT_HASH__.substring(0, 7);
</script>

<main>
    <div class="bar" on:mouseover={display} on:mouseleave={hide}>
        {#if showRest}
            <div class="rest">
                <div
                    on:click={() => {
                        infoDialog.showModal();
                    }}
                >
                    <Icon icon="solar:info-circle-bold"></Icon>
                </div>
            </div>
            <div class="rest">
                <div
                    on:click={() => {
                        settingDialog.showModal();
                    }}
                >
                    <Icon icon="solar:settings-bold"></Icon>
                </div>
            </div>
        {/if}

        <Dialog bind:dialog={infoDialog} bind:this={infoDialogComponent}>
            <div class="info">
                <div>
                    <h1>PagerR</h1>
                    <p style="margin-top:.4rem;">
                        A simple browser home page.
                        <br />
                    </p>
                    <hr />
                    <p
                        style="font-size: smaller;line-height:1.4;font-weight:300;"
                    >
                        GitHub:
                        <a
                            href="https://github.com/Rainscall/PagerR"
                            target="_blank"
                            >https://github.com/Rainscall/PagerR</a
                        >
                        <br />
                        Build:
                        <span
                            class="buildInfo"
                            style="--color:#{buildHash.substring(0, 6)}"
                            >{buildHash}</span
                        >
                    </p>
                    <div class="ops">
                        <div on:click={infoDialogComponent.closeDialog}>
                            close
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>

        <Dialog bind:dialog={settingDialog} bind:this={settingDialogComponent}>
            <div class="info">
                <div>
                    <h2>Settings</h2>
                    <hr style="margin: .2rem 0 1.4rem 0;" />

                    <SettingGroup
                        itemName="clearInfoAfterSearch"
                        describe="Clear input after search"
                    ></SettingGroup>

                    <SettingGroup
                        itemName="showSec"
                        describe="Show seconds on clock (refesh to apply)"
                    ></SettingGroup>

                    <div class="ops">
                        <div
                            on:click={() => {
                                settingDialogComponent.closeDialog();
                                toast.push(
                                    "Some settings may need refresh to apply.",
                                );
                            }}
                        >
                            close
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>

        <div>
            <Icon icon="solar:menu-dots-bold"></Icon>
        </div>
    </div>
</main>

<style>
    main {
        width: 100%;
        display: flex;
    }

    .info {
        display: flex;
        height: 100vh;
        height: 100dvh;
        width: 100vw;
        max-width: 100vw;
        max-height: 100vh;
        max-height: 100dvh;
    }

    .info > div {
        margin: auto;
        width: 90vw;
        display: flex;
        box-sizing: border-box;
        max-width: 512px;
        background-color: #fff;
        border-radius: 1rem;
        padding: 1rem;
        flex-direction: column;
        gap: 0.2rem;
        overflow: hidden;
    }

    p,
    h2,
    h1 {
        text-align: left;
    }

    p {
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 400;
    }

    h1 {
        font-weight: 400;
    }

    a {
        text-decoration: none;
        color: #840d23;
    }

    a:focus {
        outline: 0;
        border: 0;
    }

    .ops {
        margin-top: 1rem;
    }

    .ops > div {
        display: flex;
        width: 100%;
        padding: 0.2rem;
        background-color: #0000000a;
        border-radius: 114514px;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }

    hr {
        height: 0.5px;
        border-radius: 114514px;
        background-color: #0000001c;
        outline: 0;
        border: 0;
        margin: 0.6rem 0;
    }

    @keyframes ani-bar-in {
        from {
            opacity: 0;
            transform: translateY(-0.8rem) scale(0.95);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }

    @keyframes ani-bar-out {
        from {
            opacity: 1;
            transform: none;
        }
        to {
            opacity: 0;
            transform: translateY(-0.8rem) scale(0.95);
        }
    }

    @keyframes ani-elements-in {
        from {
            opacity: 0;
            transform: translateX(-0.8rem);
        }
        70% {
            opacity: 1;
        }
        to {
            opacity: 1;
            transform: none;
        }
    }

    .bar:hover {
        animation-name: ani-bar-in;
        animation-duration: 0.235s;
        animation-fill-mode: forwards;
    }

    .bar {
        opacity: 0;
        display: flex;
        margin-left: auto;
        padding: 0.2rem;
        gap: 0.2rem;
        background-color: #f7f7f7;
        border-radius: 114514px;
        margin-top: 0.4rem;
        animation-name: ani-bar-out;
        animation-duration: 0.235s;
        animation-fill-mode: forwards;
    }

    .bar:hover > div > div {
        animation-name: ani-elements-in;
        animation-duration: 0.355s;
        animation-fill-mode: forwards;
    }

    .bar > div,
    .bar > div > div {
        display: flex;
        aspect-ratio: 1;
        height: 2rem;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }

    .bar > div > :global(*) {
        margin: auto;
    }

    .rest {
        background-color: #ededed;
        border-radius: 114514px;
        aspect-ratio: 1;
    }

    .buildInfo {
        --color: #000;
        color: var(--color);
    }

    @media (prefers-color-scheme: dark) {
        .info > div,
        .bar {
            background-color: #141414;
        }
        .rest {
            background-color: #000000;
        }
        .info > div {
            color: #fff;
        }

        .info > div p > a {
            color: #a8122e;
        }

        hr {
            background-color: #ffffff1c;
        }

        .ops > div {
            background-color: #ffffff0a;
        }
    }
</style>
