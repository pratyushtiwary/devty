<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import StyledInput from "@/components/StyledInputComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, watchEffect, type Ref } from "vue";
import matcher, { highlight } from ".";

const regex: Ref<string> = ref("([A-Z])\\w+")
const text: Ref<string> = ref(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in imperdiet magna. Morbi convallis ligula et dolor ornare, scelerisque fringilla est condimentum. Quisque a augue vitae elit egestas ultrices. Aliquam arcu elit, mattis ac efficitur sed, ornare a nisl. Fusce vel ante quis leo ullamcorper feugiat id vitae mauris. Sed vitae egestas elit. Vestibulum in lectus eu elit posuere faucibus. Vivamus feugiat urna sit amet augue molestie porta. Morbi pulvinar nisl risus, in convallis nisl dignissim nec. Curabitur non luctus sem. Fusce sit amet rhoncus nibh. Donec id lacus leo.\n\nDuis interdum semper sodales. Maecenas ornare egestas aliquam. Cras pretium, nulla nec faucibus lobortis, ipsum ipsum aliquam odio, id tempor mi erat ut dui. Maecenas tempor convallis lacus vel viverra. Aliquam magna dolor, blandit quis nisi ut, volutpat faucibus sem. Nulla placerat libero dui, eu condimentum ipsum semper quis. Sed elit odio, blandit pretium nunc vel, hendrerit porttitor metus. Vestibulum lacinia efficitur lacus vitae semper. Aenean in congue tortor, eget interdum ligula.`);
const outputFmt: Ref<string> = ref('$0\\n');
const output: Ref<string> = ref(matcher(regex.value, text.value, outputFmt.value));
const outputHtml: Ref<string> = ref(highlight(regex.value, text.value))

watchEffect(() => {
    output.value = matcher(regex.value, text.value, outputFmt.value);
    outputHtml.value = highlight(regex.value, text.value)
});


function handleRegexChange(newVal: string) {
    regex.value = newVal;
}

function handleRegexPaste(newVal: string) {
    handleRegexChange(newVal);
}

function handlePasteText(newVal: string) {
    text.value = newVal
}
function handleOutputFmtChange(newVal: string) {
    outputFmt.value = newVal;
}

function handleOutputFmtPaste(newVal: string) {
    handleOutputFmtChange(newVal);
}

function handleUpdate(newVal: string) {
    text.value = newVal;
}

function clear() {
    regex.value = '';
}

function clearOutput() {
    outputFmt.value = '$0\\n';
}
</script>

<template>
    <div class="container">
        <div class="expression">
            <InputOptions label="RegExp:" @reset="clear" @paste="handleRegexPaste" :hideCopy="true" />
            <Input input-type="text" placeholder="Enter Regular Expression..." class="no-resize inputText" :value="regex"
                @update:value="useThrottle($event, handleRegexChange, 500)"></Input>
            <InputOptions label="Text:" @paste="handlePasteText" :hideReset="true" :hideCopy="true" />
            <StyledInput :value="text" :styledValue="outputHtml" @update:value="handleUpdate" class="inputElem" />
        </div>
        <div class="output">
            <InputOptions label="Output Format:" @reset="clearOutput" @paste="handleOutputFmtPaste" :hideCopy="true" />
            <Input input-type="text" placeholder="Enter Output Format..." class="no-resize inputText" :value="outputFmt"
                @update:value="useThrottle($event, handleOutputFmtChange, 500)"></Input>
            <InputOptions label="Output:" :hideClipboard="true" :hideReset="true" :copyContent="output" />
            <Input input-type="textarea" disabled placeholder="Results will appear here" class="no-resize inputText grow"
                :value="output"></Input>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
}

.container .output,
.container .expression {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.container .inputElem {
    flex-grow: 1;
    font-size: 25px;
}

.match {
    color: green;
}

.container .tSel::selection,
.container .tSel::-moz-selection {
    color: transparent !important;
    background-color: blue;
}

.container .grow {
    flex-grow: 1;
}

@media screen and (max-width: 800px) {
    .container {
        display: block;
    }


    .container .inputElem {
        height: 300px;
    }

    .container .inputElem .styledInput {
        width: 100%;
    }
}
</style>
