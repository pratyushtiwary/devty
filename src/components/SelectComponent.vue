<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(['options', 'value', 'disabled']);
const emit = defineEmits(['selected', 'update:value']);

const value = computed({
    get() {
        return props.value;
    },
    set(value) {
        emit('update:value', value)
    }
})
</script>

<template>
    <ui-select outlined id="select" v-model="value" :options="options" :class="$attrs.class" :disabled="disabled"
        @selected="emit('selected', $event)">
        <slot />
    </ui-select>
</template>