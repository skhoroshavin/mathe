<script lang="ts">
  import {onMount} from "svelte";
  import {Game} from "./lib/game";
  import Display from "./components/Display.svelte";
  import Keypad from "./components/Keypad.svelte";

  const game = new Game()

  let value = game.value
  let score = game.score
  let display: Display

  onMount(() => {
    game.onError = display.notifyError
    update()
  })

  function update() {
    score = game.score
    requestAnimationFrame(update)
  }
</script>

<Display bind:this={display} value={value} score={score}/>
<Keypad onClick={(v) => {
        game.tryAnswer(v);
        value = game.value
}}/>
