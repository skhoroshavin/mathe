<script lang="ts">
    import Button from "./Button.svelte";

    export let onClick: (v: number) => void
</script>

<div class="keypad">
    <div class="keypad-row">
        <Button onClick={onClick} value={1}/>
        <Button onClick={onClick} value={2}/>
        <Button onClick={onClick} value={3}/>
    </div>
    <div class="keypad-row">
        <Button onClick={onClick} value={4}/>
        <Button onClick={onClick} value={5}/>
        <Button onClick={onClick} value={6}/>
    </div>
    <div class="keypad-row">
        <Button onClick={onClick} value={7}/>
        <Button onClick={onClick} value={8}/>
        <Button onClick={onClick} value={9}/>
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