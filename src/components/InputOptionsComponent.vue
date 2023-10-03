<script setup lang="ts">
import { useSnackbar } from '@/stores/snackbar';
const props = defineProps(['label', 'copyContent', 'hideCopy', 'hideReset', 'hideClipboard']);
const emit = defineEmits(['reset', 'paste']);

const snackbar = useSnackbar();

async function pasteContent() {
    try {
        const content = await navigator.clipboard.readText();

        emit('paste', content);
    } catch (e) {
        snackbar.show('Failed to access clipboard', 'error');
    }
}

function copy() {
    navigator.clipboard.writeText(props.copyContent);

    snackbar.show('Content copied to clipboard', 'success');
}
</script>

<template>
    <div class="input-options">
        <p>{{ props.label || 'Input: ' }}</p>
        <div class="options">
            <ui-button icon="content_copy" @click="copy" v-if="!hideCopy">Copy</ui-button>
            <ui-button icon="content_paste" @click="pasteContent" v-if="!hideClipboard">Clipboard</ui-button>
            <ui-button icon="clear" @click="$emit('reset')" v-if="!hideReset">Reset</ui-button>
        </div>
    </div>
</template>

<style scoped>
.input-options {
    display: flex;
    align-items: center;
}

.input-options p {
    flex-grow: 1;
}

@media screen and (max-width: 1200px) {
    .input-options {
        flex-direction: column;
        align-items: baseline;
    }
}
</style>