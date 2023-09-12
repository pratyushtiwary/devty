<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import StyledInput from "@/components/StyledInputComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, watchEffect, type Ref } from "vue";
import jwtActions, { Colorize, supportedAlgos } from '.';

const realVal: Ref<string> = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
const coloredVal: Ref<string> = ref(Colorize(realVal.value, ['red', 'purple', 'blue']))
const decodedHeader = ref(jwtActions.getHeadersS(realVal.value));
const decodedPayload = ref(jwtActions.getPayloadS(realVal.value));
const options = supportedAlgos.map(e => ({
    value: e,
    label: e
}))
const errors: Ref<boolean[]> = ref([]);
const keys: Ref<string[]> = ref([])

const selectedAlgo = ref(supportedAlgos[0]);
const signatureValid: Ref<boolean> = ref(true)


watchEffect(() => {
    coloredVal.value = Colorize(realVal.value, ['red', 'purple', 'blue'])
    try {
        const tempDecoded = jwtActions.getHeaders(realVal.value)
        if (tempDecoded.alg)
            selectedAlgo.value = tempDecoded.alg
        decodedHeader.value = JSON.stringify(tempDecoded, null, 4)
        decodedPayload.value = jwtActions.getPayloadS(realVal.value)
        errors.value[0] = false
    } catch (_) {
        errors.value[0] = true
    }
})

function handleUpdate(newVal: string) {
    realVal.value = newVal;
    validateSignature();
}

function handlePasteText(newVal: string) {
    realVal.value = newVal
}

function handlePasteHeader(newVal: string) {
    handleHeaderUpdate(newVal)
}

function handlePastePayload(newVal: string) {
    handlePayloadUpdate(newVal)
}


// @ts-ignore
async function handleAlgoChange(e) {
    selectedAlgo.value = e.value
    const jwtDetails = await jwtActions.generateToken({
        headers: JSON.parse(decodedHeader.value),
        payload: JSON.parse(decodedPayload.value)
    }, e.value)
    realVal.value = jwtDetails.token
    if (e.value.toLowerCase().startsWith('h'))
        keys.value = ['', jwtDetails.publicKey]
    keys.value = [jwtDetails.privateKey, jwtDetails.publicKey]
    validateSignature();
}

async function handleHeaderUpdate(newVal: string) {
    try {
        JSON.parse(newVal)
        decodedHeader.value = newVal
        const jwtDetails = await jwtActions.generateToken({
            headers: JSON.parse(decodedHeader.value),
            payload: JSON.parse(decodedPayload.value)
        }, selectedAlgo.value)
        realVal.value = jwtDetails.token
        keys.value = [jwtDetails.privateKey, jwtDetails.publicKey]
        validateSignature();
        errors.value[1] = false
    } catch (_) {
        errors.value[1] = true
    }
}

async function handlePayloadUpdate(newVal: string) {
    try {
        JSON.parse(newVal)
        decodedPayload.value = newVal
        const jwtDetails = await jwtActions.generateToken({
            headers: JSON.parse(decodedHeader.value),
            payload: JSON.parse(decodedPayload.value)
        }, selectedAlgo.value)
        realVal.value = jwtDetails.token
        keys.value = [jwtDetails.privateKey, jwtDetails.publicKey]
        validateSignature();
        errors.value[2] = false
    } catch (_) {
        errors.value[2] = true
    }
}

async function validateSignature() {
    signatureValid.value = await jwtActions.verifySignature(realVal.value, selectedAlgo.value, {
        key: keys.value[0],
        publicKey: keys.value[1]
    });
}

async function handleHashChange() {
    if (keys.value[0]) {
        try {
            const jwtDetails = await jwtActions.generateToken({
                headers: JSON.parse(decodedHeader.value),
                payload: JSON.parse(decodedPayload.value)
            }, selectedAlgo.value, {
                key: keys.value[0]
            })
            realVal.value = jwtDetails.token
        } catch (_) { /* empty */ }
    }
}

function clearInput() {
    realVal.value = "";
}

function clearHeaderInput() {
    handleHeaderUpdate(`{\n\n}`)
}

function clearPayloadInput() {
    handlePayloadUpdate(`{\n\n}`)
}

</script>
<template>
    <div class="container">
        <div class="inputSection">
            <InputOptions label="Encoded: " @reset="clearInput" @paste="handlePasteText" :copyContent="realVal" />
            <StyledInput placeholder="Paste JWT Token..." :value="realVal" :styledValue="coloredVal"
                @update:value="handleUpdate" class="inputParent" :error="errors[0] === true" />
            <ui-select v-model="selectedAlgo" @selected="handleAlgoChange" outlined :options="options" class="algoSelect">
                Algorithm
            </ui-select>
            <ui-alert class="signatureStatus" stateOutlined :state="signatureValid ? 'success' : 'error'">{{ signatureValid
                ?
                "Valid" : "Invalid" }} Signature</ui-alert>
        </div>
        <div class="outputSection">
            <div class="outputArea">
                <InputOptions label="Header: " @reset="clearHeaderInput" @paste="handlePasteHeader"
                    :copyContent="decodedHeader" />
                <Input input-type="textarea" placeholder="Enter header..." :class="{
                    'no-resize output red': true,
                    'inputError': errors[1] === true
                }" :value="decodedHeader" @update:value="handleHeaderUpdate"></Input>
            </div>
            <div class="outputArea">
                <InputOptions label="Payload: " @reset="clearPayloadInput" @paste="handlePastePayload"
                    :copyContent="decodedPayload" />
                <Input input-type="textarea" placeholder="Enter payload..." :class="{
                    'no-resize output purple': true,
                    'inputError': errors[2] === true
                }" :value="decodedPayload" @update:value="handlePayloadUpdate"></Input>
            </div>
            <div class="outputArea signature blue">
                {{ selectedAlgo + `(\n\tbase64UrlEncode(header) + "." +\n\tbase64UrlEncode(payload),` }}
                <input type="text" placeholder="Signature" class="signInput" v-model="keys[0]"
                    v-if="selectedAlgo.toLowerCase().startsWith('h')" @keyup="useThrottle('', handleHashChange)" />
                <textarea type="text" spellcheck="false" placeholder="Private Key" v-model="keys[1]" class="signInput key"
                    v-if="!selectedAlgo.toLowerCase().startsWith('h')"
                    @keyup="useThrottle('', validateSignature)"></textarea>
                <textarea type="text" spellcheck="false" placeholder="Public Key" v-model="keys[0]" class="signInput key"
                    @keyup="useThrottle('', validateSignature)"
                    v-if="!selectedAlgo.toLowerCase().startsWith('h')"></textarea>
                {{ `)` }}
            </div>
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

.inputSection .inputParent {
    flex-grow: 1;
    font-size: 25px;
}

.signatureStatus {
    margin-top: 5px;
}

.inputSection .inputText.inputError,
.outputSection .output.outputError textarea {
    background-color: rgb(99, 33, 33) !important;
}

.outputSection .outputArea {
    display: flex;
    flex-direction: column;
}

.outputSection .outputArea,
.outputSection .output {
    flex-grow: 1;
    border-radius: 5px;
    overflow: hidden;
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

.outputSection {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
}

.algoSelect {
    margin-top: 10px;
}

.outputArea.signature {
    white-space: break-spaces;
    font-size: 1.25rem;
    margin-top: 5px;
}

.outputArea.signature .signInput {
    background-color: transparent;
    color: var(--color-text);
    border: 1px solid var(--vt-c-text-dark-2);
    outline-color: var(--vt-c-text-dark-2);
    padding: 5px;
    border-radius: 5px;
    font-family: sans-serif;
    margin-left: 6ch;
    width: 70%;
    resize: none;
    margin-bottom: 5px;
}

.outputArea.signature .signInput.key {
    height: 100px;

}

@media screen and (max-width: 800px) {
    .container {
        display: block;
    }


    .inputSection .inputParent {
        height: 300px;
    }
}
</style>