<script setup lang="ts">
import Input from "@/components/InputComponent.vue";

defineProps(['placeholder']);
const emit = defineEmits(['update:value', 'reset']);

function handleSearch(searchValue: string) {
    if (searchValue.replace(/\s/g, '') !== '') {
        searchValue = searchValue.replace(/^\s*/, '');
        emit('update:value', searchValue);
    } else {
        emit('reset');
    }
}
</script>

<template>
    <Input :placeholder="$props.placeholder" :class="'searchInput ' + $attrs.class" @update:value="handleSearch" />
</template>

<style scoped>
.searchInput {
    width: 100%;
}
</style>