<script lang="ts">
    import {Game} from "$lib/game";
    import Keypad from "$lib/components/Keypad.svelte";

    const game = new Game()

    let value = game.value
</script>

<h1 class="head">Zahlen bis zum 10!</h1>
{value}
<Keypad onClick={(v) => {game.tryAnswer(v); value = game.value}}/>

<style lang="postcss">
    .head {
        background: var(--primary-color);
    }
</style>
