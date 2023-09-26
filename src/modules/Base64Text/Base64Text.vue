<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, type Ref } from "vue";
import Base64Text from ".";

const value: Ref<string> = ref('Hello World');
const output: Ref<string> = ref(Base64Text(value.value));

function handleEncode(val: string) {
    value.value = val;
    output.value = Base64Text(val);
}

function handleDecode(val: string) {
    output.value = val;
    value.value = Base64Text(val, true);
}

function clearInput() {
    value.value = "";
    output.value = "";
}
</script>

<template>
    <div class="container">
        <div class="inputSection">
            <InputOptions label="Base64 Decoded:" @reset="clearInput" @paste="handleEncode" :copyContent="value" />
            <Input input-type="textarea" placeholder="Enter base64 text to encode..." class="no-resize inputText"
                label="Input" :value="value" @update:value="useThrottle($event, handleEncode)"></Input>
        </div>
        <div class="outputSection">
            <InputOptions label="Base64 Encoded:" @reset="clearInput" @paste="handleDecode" :copyContent="output" />
            <Input input-type="textarea" placeholder="Enter base64 text to decode..." class="no-resize outputText"
                label="Output" :value="output" @update:value="useThrottle($event, handleDecode)"></Input>
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

.inputSection,
.outputSection {
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

.inputSection .inputText,
.outputSection .outputText {
    flex-grow: 1;
}

.outputSection .uploadInput {
    flex-grow: 1;
}

.outputSection .uploadInput .uploadInputBtn,
.outputSection .uploadInput .uploadInputImg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
}

@media screen and (max-width: 800px) {
    .container {
        display: block;
    }

    .inputSection,
    .outputSection {
        margin-right: 0;
    }

    .outputSection {
        margin-top: 5px;
    }
}
</style>