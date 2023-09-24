<script lang="ts">
    import {onMount} from "svelte";
    import {Game} from "$lib/game";
    import Display from "$lib/components/Display.svelte";
    import Keypad from "$lib/components/Keypad.svelte";

    const game = new Game()

    let value = game.value
    let display: Display

    onMount(() => {
        game.onError = display.notifyError
    })
</script>

<div class="container">
    <Display bind:this={display} value={value}/>
    <Keypad onClick={(v) => {
        game.tryAnswer(v);
        value = game.value
    }}/>
</div>

<style>
    .container {
        width: 100%;
    }

    @media (min-width: 640px) {
        .container {
            width: 640px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
