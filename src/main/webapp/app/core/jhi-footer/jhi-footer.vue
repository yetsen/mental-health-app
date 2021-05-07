<template>
    <footer id="footer" class="footer">
        <p v-text="$t('footer')">This is your footer</p>
    </footer>
</template>

<script lang="ts" src="./jhi-footer.component.ts">
</script>

<style scoped>
    .footer {
        position: sticky;
        background-color: white;
        width: 100%;
        height: 2.5rem;
    }
</style>
