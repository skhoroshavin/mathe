<script lang="ts">
    export let value: any;

    export function notifyError() {
        showError = true
        setTimeout(() => {
            showError = false
        }, 500)
    }

    let showError = false
</script>

<div class="display" class:error={showError}>
    {value}
</div>

<style>
    .display {
        width: 100%;
        text-align: center;
        font-size: 8rem;
        color: deepskyblue;
    }

    .error {
        color: red;
    }
</style>