<style>
    :root {
        --primary-color: #00BFFFFF;

        --vw: 1vw;
    }

    .container {
        display: flex;
        flex-direction: column;
        position: fixed;
        inset: 0;
    }

    @media (min-width: 500px) {
        :root {
            --vw: 5px;
        }

        .container {
            width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>

<script>
    import "../app.css";
</script>

<div class="container">
    <slot />
</div>
