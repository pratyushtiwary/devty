<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, type Ref } from "vue";
import generateHash, { type GenerateHashReturn } from ".";

const value: Ref<string> = ref('Hello World');
const output: Ref<GenerateHashReturn> = ref(generateHash(value.value));

function process() {
    output.value = generateHash(value.value);
}

function handleUpdate(newVal: string) {
    value.value = newVal;
    process()
}

function clearInput() {
    value.value = "";
    process()
}
</script>

<template>
    <div class="container">
        <div class="inputSection">
            <InputOptions @reset="clearInput" @paste="handleUpdate" :copyContent="value" />
            <Input input-type="textarea" placeholder="Enter content to hash..." class="no-resize inputText" label="Input"
                :value="value" @update:value="useThrottle($event, handleUpdate)"></Input>
        </div>
        <div class="outputSection">
            <Input input-type="text" disabled :value="output[hash]" :label="hash" v-for="(hash, i) in Object.keys(output)"
                :key="i" :allowCopy="true" class="hash" />
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.inputSection {
    color: var(--color-text);
    display: flex;
    flex-direction: column;
}


.inputSection,
.outputSection {
    margin-right: 5px;
}

.hash {
    width: 100%;
    margin: 7.5px 0;
}

.inputSection .inputText {
    flex-grow: 1;
}

@media screen and (max-width: 800px) {
    .container {
        display: block;
    }
}
</style>