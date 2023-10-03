<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import { type ComponentRef } from '@/types/componentRef';
import { onMounted, ref } from 'vue';

defineProps(['placeholder', 'value']);
const emit = defineEmits(['update:value', 'reset']);
const wrapper = ref<ComponentRef>();
function handleSearch(searchValue: string) {
    if (searchValue.replace(/\s/g, '') !== '') {
        searchValue = searchValue.replace(/^\s*/, '');
        emit('update:value', searchValue);
    } else {
        emit('reset');
    }
}

onMounted(() => {
    if (wrapper?.value?.wrapper?.textfield?.querySelector) {
        wrapper.value.wrapper!.textfield!.querySelector('input')!.focus()
    }
})

defineExpose({
    wrapper
})
</script>

<template>
    <Input :placeholder="$props.placeholder" :class="'searchInput ' + $attrs.class" @update:value="handleSearch"
        ref="wrapper" :value="value" />
</template>

<style scoped>
.searchInput {
    width: 100%;
}
</style>