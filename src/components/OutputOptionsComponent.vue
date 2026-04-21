<script setup lang="ts">
import { useSnackbar } from '@/stores/snackbar';
const props = defineProps(['label', 'copyContent', 'hideCopy']);

const snackbar = useSnackbar();

async function copy() {
    const clipboardItemData = {
        "text/plain": props.copyContent,
        "text/html": props.copyContent
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);

    snackbar.show('Content copied to clipboard', 'success');
}
</script>

<template>
    <div class="output-options">
        <p>{{ props.label || 'Output: ' }}</p>
        <slot />
        <div class="options">
            <ui-button icon="content_copy" @click="copy" v-show="!hideCopy">Copy</ui-button>
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

.output-options .options {
    margin-left: 5px;
}
</style>