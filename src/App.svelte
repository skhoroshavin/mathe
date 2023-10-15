<script lang="ts">
    import Display from "./components/Display.svelte";
    import Keypad from "./components/Keypad.svelte";
    import {makeGame} from "./stores/game";

    const game = makeGame()
</script>

<Display value={$game.value} score={$game.score} hasError={$game.hasError}/>
<Keypad onClick={v => $game.answer(v)}/>
