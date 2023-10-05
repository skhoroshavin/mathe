<script lang="ts">
    import Display from "./components/Display.svelte";
    import Keypad from "./components/Keypad.svelte";
    import {makeGame} from "./stores/game";

    const game = makeGame()
</script>

<Display game={$game}/>
<Keypad onClick={v => game.answer(v)}/>
