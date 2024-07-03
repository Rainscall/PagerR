<script>
    import { config, changeConfig, renewConfig } from "./config";
    import SettingItem from "./settingItem.svelte";
    import Icon from "@iconify/svelte";

    export let itemName;
    export let describe;
    export let type = "bool";
    export let options = {};
    let selectValue = renewConfig()[itemName];
    let status = renewConfig()[itemName] ? "on" : "off";
</script>

<SettingItem>
    <ul>
        <li
            on:click={() => {
                switch (type) {
                    case "bool": {
                        changeConfig(itemName, !config[itemName]);
                        status = config[itemName] ? "on" : "off";
                        break;
                    }
                    case "select": {
                        changeConfig(itemName, selectValue);
                        break;
                    }
                }
            }}
        >
            <div>{describe}</div>
            <div>
                {#if type == "bool"}
                    <Icon
                        icon="ic:outline-toggle-{status}"
                        height="1.5rem"
                        width="1.5rem"
                    ></Icon>
                {/if}
                {#if type == "select"}
                    <select bind:value={selectValue}>
                        {#each Object.keys(options) as k}
                            <option value={options[k]}>{k}</option>
                        {/each}
                    </select>
                {/if}
            </div>
        </li>
    </ul>
</SettingItem>

<style>
    ul {
        width: 100%;
    }

    li {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        cursor: pointer;
        user-select: none;
        text-align: left;
    }

    select {
        outline: none;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    @media (prefers-color-scheme: dark) {
        select {
            color: #fff;
        }
        option {
            background-color: #000;
        }
    }
</style>
