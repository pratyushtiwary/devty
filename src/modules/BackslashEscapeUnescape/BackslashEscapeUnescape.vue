<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, type Ref } from "vue";
import convertor from ".";

const unescaped: Ref<string> = ref(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nisl sed turpis gravida faucibus eget at lorem. Duis eu elit vitae massa consequat pharetra. Donec hendrerit vestibulum faucibus. Nullam efficitur magna nec magna iaculis hendrerit. Nullam id metus placerat, volutpat purus id, gravida tortor. Duis ultrices non ante gravida laoreet. Sed imperdiet lacus leo, vitae imperdiet orci iaculis vel. Nam blandit est sit amet ante dapibus, eget dapibus sapien pharetra. Donec lorem nisl, pulvinar sed luctus non, tristique vel ligula. Vestibulum urna elit, rhoncus eget convallis at, congue quis diam. Integer a dignissim purus. In luctus imperdiet nisl, sit amet dapibus lectus rhoncus vitae. Vivamus sed iaculis diam. Phasellus vestibulum, tellus a iaculis gravida, magna lacus posuere mauris, eget pretium lectus eros sit amet erat. In imperdiet est quam, a dictum risus vestibulum nec.

Duis luctus blandit mauris, sit amet semper mi dignissim vitae. Donec ut nisi sed ante rhoncus tincidunt a eget nulla. Nulla erat nunc, mattis ornare felis nec, ultrices ornare nisi. Praesent tempus leo neque, rutrum consectetur elit consequat non. Sed sit amet volutpat erat, nec vehicula nisi. In vehicula metus eu elit porta, lobortis bibendum felis mattis. Fusce porttitor erat nec metus rhoncus, eget dapibus nunc convallis. Phasellus eget tortor nec purus semper condimentum. Aliquam erat volutpat. In hac habitasse platea dictumst. Quisque et nibh tortor. Suspendisse eu convallis neque.`)
const escaped: Ref<string> = ref(convertor.escape(unescaped.value));


function handleUnescapedInput(newVal: string) {
    unescaped.value = newVal;
    escaped.value = convertor.escape(unescaped.value)
}

function handleUnescapedPaste(newVal: string) {
    handleUnescapedInput(newVal);
}


function handleEscapedInput(newVal: string) {
    escaped.value = newVal;
    unescaped.value = convertor.unescape(escaped.value)
}

function handleEscapedPaste(newVal: string) {
    handleEscapedInput(newVal);
}

function clear() {
    unescaped.value = ''
    escaped.value = ''
}
</script>

<template>
    <div class="container">
        <div class="decode">
            <InputOptions label="Unescaped:" @reset="clear" @paste="handleUnescapedPaste" :copyContent="unescaped" />
            <Input input-type="textarea" placeholder="Enter Decoded String..." class="no-resize inputText"
                :value="unescaped" @update:value="useThrottle($event, handleUnescapedInput, 500)"></Input>
        </div>
        <div class="encode">
            <InputOptions label="Escaped:" @reset="clear" @paste="handleEscapedPaste" :copyContent="escaped" />
            <Input input-type="textarea" placeholder="Enter Encoded String..." class="no-resize inputText" :value="escaped"
                @update:value="useThrottle($event, handleEscapedInput, 500)"></Input>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.container .encode,
.container .decode {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.container .inputText {
    width: 100%;
    flex-grow: 1;
}
</style>