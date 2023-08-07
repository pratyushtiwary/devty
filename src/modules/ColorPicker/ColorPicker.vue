<script setup lang="ts">
import { ColorPicker } from 'vue-accessible-color-picker'
</script>

<template>
    <div class="container">
        <ColorPicker color="#ffffff" alpha-channel="hide" style="colorPicker" />
    </div>
</template>

<style scoped>
.container {
    display: grid;
    width: 100%;
}

@media screen and (max-width: 800px) {
    .container {
        height: 90vh;
    }
}
</style>