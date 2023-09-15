<script setup lang="ts">
import { ref, shallowRef, watchEffect } from 'vue';
const props = defineProps(['dir']);

const loading = ref(false);
const Module = shallowRef(undefined);

watchEffect(async () => {
    loading.value = true;
    const module = await import(`@/modules/${props.dir}/${props.dir}.vue`);
    // @ts-ignore
    await module.__devty;
    Module.value = module.default;
    loading.value = false;
})

</script>

<template>
    <div class="loader" v-if="loading">
        <ui-spinner active></ui-spinner>
        <p>Loading Module...</p>
    </div>
    <Module v-if="!loading && Module"></Module>
</template>

<style scoped>
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
</style>