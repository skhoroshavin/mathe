<script lang="ts">
    export let value: string | number;

    export function notifyError() {
        showError = true
        setTimeout(() => {
            showError = false
        }, 500)
    }

    let showError = false
</script>

<div class="container">
    <div class="display" class:error={showError}>{value}</div>
</div>

<style>
    .container {
        display: flex;
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
</style>