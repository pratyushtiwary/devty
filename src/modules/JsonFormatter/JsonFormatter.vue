<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import OutputOptions from "@/components/OutputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, type Ref } from "vue";
import FormatJSON from ".";

const value: Ref<string> = ref('{"data": {"msg": "hello world"},"status": 200}');
const output: Ref<string> = ref(FormatJSON(value.value));
const error: Ref<boolean> = ref(false);

function format() {
    try {
        output.value = FormatJSON(value.value);
        error.value = false;
    } catch (e) {
        error.value = true;
    }
}

function handleUpdate(newVal: string) {
    value.value = newVal;
    format()
}


function clearInput() {
    value.value = "";
    output.value = "";
}

</script>

<template>
    <div class="container">
        <div class="inputSection">
            <InputOptions @reset="clearInput" @paste="handleUpdate" :copyContent="value" />
            <Input input-type="textarea" placeholder="Enter content to hash..."
                :class="'no-resize inputText ' + (error && 'error')" label="Input" :value="value"
                @update:value="useThrottle($event, handleUpdate)"></Input>
            <ui-textfield-helper v-show="error" :visible="true" :class="{ errorHelper: error }">Invalid
                JSON</ui-textfield-helper>
        </div>
        <div class="outputSection">
            <OutputOptions :copyContent="output" />
            <highlightjs language='json' :code='output' class="output" />
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

.inputSection .inputText {
    flex-grow: 1;
}

.inputSection,
.outputSection {
    margin-right: 5px;
}

.outputSection .output {
    flex-grow: 1;
    border-radius: 5px;
    overflow: hidden;
}

@media screen and (max-width: 800px) {
    .container {
        display: block;
    }
}
</style>