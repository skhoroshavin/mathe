<script lang="ts">
    export let value: string | number;
    export let score: number = 0;

    export function notifyError() {
        showError = true
        setTimeout(() => {
            showError = false
        }, 500)
    }

    let showError = false
</script>

<div class="container">
    <div class="score-container"><div class="score" style="height: {score}%"/></div>
    <div class="display" class:error={showError}>{value}</div>
    <div class="score-container"><div class="score" style="height: {score}%"/></div>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .display {
        margin: auto;
        font-size: 12rem;
        color: deepskyblue;
    }

    .error {
        color: red;
    }

    .score-container {
        display: flex;
        align-items: end;
        width: 2rem;
        margin-left: 1rem;
        margin-right: 1rem;
        height: 90%;
    }

    .score {
        width: 100%;
        background-color: mediumspringgreen;
    }
</style>