<script setup lang="ts">
import { useSnackbar } from '@/stores/snackbar';
import { ref, watchEffect, type Ref } from 'vue';

const bottom: Ref<number> = ref(0);
const props = defineProps(['state', 'visible', 'content']);
const snackbar = useSnackbar();
let dialogElem: null | HTMLElement = null;

watchEffect(() => {
    if (props.visible) {
        dialogElem = document.querySelector('[aria-role="dialog"]');

        if (dialogElem) {
            const { y, height } = dialogElem.getBoundingClientRect();
            // is the dialog at the bottom of the screen?
            if (y + height === window.innerHeight) {
                bottom.value = height;
            }
        }
        setTimeout(() => {
            bottom.value = 0;
            snackbar.hide();
        }, 5000);
    }
});
</script>

<template>
    <div :class="{
        'snackbar': true,
        'show': visible
    }" :style="'bottom: ' + bottom + 'px;'">
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