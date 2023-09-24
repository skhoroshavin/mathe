<script lang="ts">
    export let value: number
    export let onClick: (v: number) => void
</script>

<div class="container">
    <button class="button" on:click={() => onClick(value)}>
        {value}
    </button>
</div>

<style>
    .container {
        position: relative;
        width: 33.333%;
        padding-bottom: 25%;
    }

    .button {
        position: absolute;
        background-color: mediumspringgreen;
        inset: calc(1.5 * var(--vw));
        font-size: calc(10 * var(--vw));
        border-radius: calc(4 * var(--vw));
    }
</style>