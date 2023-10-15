<script lang="ts">
    export let value: number | string
    export let score: number
    export let hasError: boolean
</script>

<div class="container">
    <div class="display" class:error={hasError}>{value}</div>
    <div class="score-container">
        <div class="score" style="height: {score}%"/>
    </div>
</div>

<style>
    .container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .display {
        margin: auto;
        font-size: calc(50 * var(--vw));
        line-height: 0;
        color: deepskyblue;
    }

    .error {
        color: red;
    }

    .score-container {
        position: absolute;
        right: calc(5 * var(--vw));

        display: flex;
        align-items: end;
        width: calc(10 * var(--vw));
        height: 90%;
    }

    .score {
        width: 100%;
        background-color: mediumspringgreen;
    }
</style>
