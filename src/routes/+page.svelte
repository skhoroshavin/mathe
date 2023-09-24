<script lang="ts">
    import {onMount} from "svelte";
    import {Game} from "$lib/game";
    import Display from "$lib/components/Display.svelte";
    import Keypad from "$lib/components/Keypad.svelte";

    const game = new Game()

    let value = game.value
    let score = game.score
    let display: Display

    onMount(() => {
        game.onError = display.notifyError
    })

    setInterval(() => {
        score = Math.min(100, 10 * game.score)
    }, 50)
</script>

<div class="container">
    <Display bind:this={display} value={value} score={score}/>
    <Keypad onClick={(v) => {
        game.tryAnswer(v);
        value = game.value
    }}/>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        position: fixed;
        inset: 0;
    }

    @media (min-width: 640px) {
        .container {
            width: 640px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
