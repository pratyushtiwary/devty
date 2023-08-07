<script setup lang="ts">
import { useSnackbar } from '@/stores/snackbar';
const props = defineProps(['label', 'copyContent']);

const snackbar = useSnackbar();

function copy() {
    navigator.clipboard.writeText(props.copyContent);

    snackbar.show('Content copied to clipboard', 'success');
}
</script>

<template>
    <div class="output-options">
        <p>{{ props.label || 'Output: ' }}</p>
        <div class="options">
            <ui-button icon="content_copy" @click="copy">Copy</ui-button>
        </div>
    </div>
</template>

<style scoped>
.output-options {
    display: flex;
    align-items: center;
}

.output-options p {
    flex-grow: 1;
}
</style>