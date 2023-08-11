<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, type Ref } from "vue";
import convertor from ".";

const decoded: Ref<string> = ref(window.location.href)
const encoded: Ref<string> = ref(convertor.encode(decoded.value))


function handleDecodedInput(newVal: string) {
    decoded.value = newVal;
    encoded.value = convertor.encode(decoded.value)
}

function handleDecodedPaste(newVal: string) {
    handleDecodedInput(newVal);
}


function handleEncodedInput(newVal: string) {
    encoded.value = newVal;
    decoded.value = convertor.decode(encoded.value)

}

function handleEncodedPaste(newVal: string) {
    handleEncodedInput(newVal);
}

function clear() {
    decoded.value = ''
    encoded.value = ''
}
</script>

<template>
    <div class="container">
        <div class="decode">
            <InputOptions label="Decoded:" @reset="clear" @paste="handleDecodedPaste" :copyContent="decoded" />
            <Input input-type="textarea" placeholder="Enter Decoded String..." class="no-resize inputText" :value="decoded"
                @update:value="useThrottle($event, handleDecodedInput, 500)"></Input>
        </div>
        <div class="encode">
            <InputOptions label="Encoded:" @reset="clear" @paste="handleEncodedPaste" :copyContent="encoded" />
            <Input input-type="textarea" placeholder="Enter Encoded String..." class="no-resize inputText" :value="encoded"
                @update:value="useThrottle($event, handleEncodedInput, 500)"></Input>
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