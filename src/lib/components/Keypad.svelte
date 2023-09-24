<script lang="ts">
    export let onClick: (v: number) => void
</script>

<div class="keypad">
    <div class="keypad-row">
        <button on:click={() => {onClick(1)}} class="button">1</button>
        <button on:click={() => {onClick(2)}} class="button">2</button>
        <button on:click={() => {onClick(3)}} class="button">3</button>
    </div>
    <div class="keypad-row">
        <button on:click={() => {onClick(4)}} class="button">4</button>
        <button on:click={() => {onClick(5)}} class="button">5</button>
        <button on:click={() => {onClick(6)}} class="button">6</button>
    </div>
    <div class="keypad-row">
        <button on:click={() => {onClick(7)}} class="button">7</button>
        <button on:click={() => {onClick(8)}} class="button">8</button>
        <button on:click={() => {onClick(9)}} class="button">9</button>
    </div>
</div>

<style>
    .keypad {
        display: block;
    }

    .keypad-row {
        display: flex;
        width: 100%;
    }

    .button {
        display: block;
        flex-grow: 1;
        background: mediumspringgreen;
        font-size: 4rem;
        margin: 0.25rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
</style>