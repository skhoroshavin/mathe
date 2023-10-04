<script lang="ts">
    import {onMount} from "svelte";
    import {Game} from "./lib/game";
    import Display from "./components/Display.svelte";
    import Keypad from "./components/Keypad.svelte";

    const game = new Game()
    let display: Display

    onMount(() => {
        game.onError = display.notifyError
        update()
    })

    function update() {
        game.tick()
        requestAnimationFrame(update)
    }
</script>

<Display bind:this={display} score={$game.score} value={$game.value}/>
<Keypad onClick={v => game.tryAnswer(v)}/>
