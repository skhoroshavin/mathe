<script lang="ts">
    import {onMount} from "svelte";
    import {Game} from "$lib/game";
    import Display from "$lib/components/Display.svelte";
    import Keypad from "$lib/components/Keypad.svelte";

    const game = new Game()
    const start = Date.now()

    let value = game.value
    let score = game.score
    let display: Display

    setInterval(() => {
        const elapsedSeconds = (Date.now() - start) / 1000
        score = 50 * game.score / elapsedSeconds
    }, 50)

    onMount(() => {
        game.onError = display.notifyError
    })
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
