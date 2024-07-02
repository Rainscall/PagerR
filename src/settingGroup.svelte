<script>
    import { config, changeConfig } from "./config";
    import SettingItem from "./settingItem.svelte";
    import Icon from "@iconify/svelte";

    export let itemName;
    export let describe;
    console.log(config[itemName]);
    let status = config[itemName] ? "on" : "off";
</script>

<SettingItem>
    <ul>
        <li
            on:click={() => {
                changeConfig(itemName, !config[itemName]);
                status = config[itemName] ? "on" : "off";
            }}
        >
            <div>{describe}</div>
            <div>
                <Icon
                    icon="ic:outline-toggle-{status}"
                    height="1.5rem"
                    width="1.5rem"
                ></Icon>
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
</style>
