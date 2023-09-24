<script lang="ts">
    import Button from "$lib/components/Button.svelte";

    export let onClick: (v: number) => void
</script>

<div class="keypad">
    <div class="keypad-row">
        <Button value={1} onClick={onClick}/>
        <Button value={2} onClick={onClick}/>
        <Button value={3} onClick={onClick}/>
    </div>
    <div class="keypad-row">
        <Button value={4} onClick={onClick}/>
        <Button value={5} onClick={onClick}/>
        <Button value={6} onClick={onClick}/>
    </div>
    <div class="keypad-row">
        <Button value={7} onClick={onClick}/>
        <Button value={8} onClick={onClick}/>
        <Button value={9} onClick={onClick}/>
    </div>
</div>

<style>
    .keypad {
        display: block;
        padding: calc(1.5 * var(--vw));
    }

    .keypad-row {
        display: flex;
        width: 100%;
    }
</style>