<script setup lang="ts">
const props = defineProps(['label', 'optionsVisible']);
defineEmits(['save', 'load']);
</script>

<template>
    <div class="output-image-options">
        <p>{{ props.label || 'Input: ' }}</p>
        <div class="options" v-show="optionsVisible">
            <ui-button icon="file_download" @click="$emit('save')">Save</ui-button>
            <ui-file @change="$emit('load', $event)">
                <ui-button icon="file_upload">Load</ui-button>
            </ui-file>
        </div>
    </div>
</template>

<style scoped>
.output-image-options {
    display: flex;
    align-items: center;
}

.output-image-options p {
    flex-grow: 1;
}
</style>