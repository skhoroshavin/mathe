<script lang="ts">
    import {Game} from "$lib/game";

    let game = new Game()
</script>

<h1 class="head">Mathe</h1>
Score: {game.score()}

<style lang="postcss">
    .head {
        background: var(--primary-color);
    }
</style>
