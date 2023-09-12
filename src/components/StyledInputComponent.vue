<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRef } from 'vue';
const props = defineProps(['value', 'styledValue', 'error']);
const emit = defineEmits(['update:value']);

const value = computed({
    get() {
        return props.value;
    },
    set(value) {
        emit('update:value', value)
    }
})

const styledValue = toRef(props, 'styledValue');

const styledTextWidth = ref(0);
const inputRef = ref<HTMLTextAreaElement>();
const styledRef = ref<HTMLDivElement>();

onMounted(() => {
    if (inputRef.value) {
        styledTextWidth.value = inputRef.value.clientWidth;
    }

    window.addEventListener('resize', updateWidth);
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});

function updateWidth() {
    if (inputRef.value) {
        styledTextWidth.value = inputRef.value.clientWidth;
    }
}

function handleScroll() {
    if (!inputRef.value) return;
    if (!styledRef.value) return;
    const inputElem = inputRef.value;
    const highlightElem = styledRef.value;

    highlightElem.style.top = inputElem.scrollTop * -1 + 'px';
}

function handleUpdate() {
    if (!inputRef.value) return;
    if (!styledRef.value) return;
    const inputElem = inputRef.value;
    const highlightElem = styledRef.value;

    value.value = inputElem.value

    // is element scrollable?
    if (!inputElem.scrollTop)
        highlightElem.style.top = '100%';
    highlightElem.style.top = inputElem.scrollTop * -1 + 'px';

    updateWidth();
}
</script>

<template>
    <div :class="'styled-input ' + ($props.error && 'error ') + ($attrs.class || '')">
        <textarea v-model="value" ref="inputRef" @scroll="handleScroll" @keyup="handleUpdate"></textarea>
        <div class="styled-text" ref="styledRef" v-html="styledValue" :style="'width: ' + styledTextWidth + 'px'">
        </div>
    </div>
</template>

<style scoped>
.styled-input {
    position: relative;
    width: 100%;
    height: 100%;
    transition: none;
    overflow: hidden;
    background-color: var(--color-background);
}

.styled-input.error {
    background-color: rgb(99, 33, 33) !important;
}

.styled-input textarea {
    position: relative;
    resize: none;
    background-color: transparent;
    color: transparent;
    caret-color: var(--color-text);
    border: 1px solid var(--vt-c-text-dark-2);
    padding: 10px;
    border-radius: 2.5px;
    font-family: inherit;
    outline: none;
    height: 100%;
    width: 100%;
    font-size: 1em;
}

.styled-input textarea::selection,
.styled-input textarea::-moz-selection {
    color: transparent;
}

.styled-input .styled-text {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    width: 100%;
    pointer-events: none;
    height: 100%;
    line-height: normal;
    font-size: 1em;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;
}
</style>