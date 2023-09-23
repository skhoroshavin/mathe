<script lang="ts">
    export let onClick: (v: number) => void
</script>

<div class="keypad">
    <button on:click={() => {onClick(1)}} class="button">1</button>
    <button on:click={() => {onClick(2)}} class="button">2</button>
    <button on:click={() => {onClick(3)}} class="button">3</button>
    <button on:click={() => {onClick(4)}} class="button">4</button>
    <button on:click={() => {onClick(5)}} class="button">5</button>
    <button on:click={() => {onClick(6)}} class="button">6</button>
    <button on:click={() => {onClick(7)}} class="button">7</button>
    <button on:click={() => {onClick(8)}} class="button">8</button>
    <button on:click={() => {onClick(9)}} class="button">9</button>
</div>

<style>
    .keypad {
        width: 100%;
    }

    .button {
        width: 33%;
        font-size: large;
        background: deepskyblue;
    }

    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    button {
        font-family: inherit; /* 1 */
        font-size: 100%; /* 1 */
        line-height: 1.15; /* 1 */
        margin: 0; /* 2 */
        text-transform: none;
    }

    ::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    :-moz-focusring {
        outline: 1px dotted ButtonText;
    }

    :-moz-ui-invalid {
        box-shadow: none;
    }

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        height: auto;
    }

    ::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button; /* 1 */
        font: inherit; /* 2 */
    }
</style>