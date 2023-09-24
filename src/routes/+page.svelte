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

<Display bind:this={display} value={value} score={score}/>
<Keypad onClick={(v) => {
        game.tryAnswer(v);
        value = game.value
}}/>
