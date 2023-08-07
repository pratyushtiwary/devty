<script setup lang="ts">
import { watchEffect } from 'vue';
import { useSnackbar } from '@/stores/snackbar';

const props = defineProps(['state', 'visible', 'content']);
const snackbar = useSnackbar();

watchEffect(() => {
    if (props.visible) {
        setTimeout(() => {
            snackbar.hide();
        }, 5000);
    }
});
</script>

<template>
    <div :class="{
        'snackbar': true,
        'show': visible
    }">
        <ui-alert class="alert" stateOutlined :state="state">{{ content }}</ui-alert>
    </div>
</template>

<style scoped>
.snackbar {
    position: fixed;
    width: fit-content;
    bottom: 0px;
    left: 10px;
    z-index: 99;
    opacity: 0;
    transition: 0.1s linear;
    pointer-events: none;
}

.snackbar.show {
    bottom: 10px;
    opacity: 1;
    pointer-events: auto;
}

.snackbar .alert {
    backdrop-filter: blur(20px);
}

@media screen and (max-width: 800px) {
    .snackbar {
        left: 50%;
        transform: translate(-50%);
    }
}
</style>