<script setup lang="ts">
import { useSnackbar } from '@/stores/snackbar';
const props = defineProps(['label', 'placeholder', 'inputType', 'value', 'disabled', 'allowCopy', 'error', 'helper']);
defineEmits(['update:value']);

const snackbar = useSnackbar();

function copyContent() {
    navigator.clipboard.writeText(props.value);

    snackbar.show('Content copied to clipboard', 'success');
}
</script>


<template>
    <ui-textfield outlined :input-type="inputType || 'text'" :class="'input ' + $attrs.class" :label="label"
        :placeholder="placeholder" :model-value="value" :disabled="disabled"
        @update:model-value="$emit('update:value', $event)">
        <template #after v-if="Boolean(allowCopy)">
            <ui-textfield-icon @click="copyContent">content_copy</ui-textfield-icon>
        </template>
    </ui-textfield>
</template>

<style scoped>
.input {
    color: var(--color-text);
}

@media screen and (max-width: 800px) {
    .input textarea {
        height: 300px;
    }

    .input:has(textarea) {
        height: 300px;
    }
}
</style>