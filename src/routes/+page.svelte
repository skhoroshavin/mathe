<script lang="ts">
    import {Game} from "$lib/game";

    const game = new Game()
</script>

<h1 class="head">Zahlen bis zum 10!</h1>
{game.value}

<style lang="postcss">
    .head {
        background: var(--primary-color);
    }
</style>
