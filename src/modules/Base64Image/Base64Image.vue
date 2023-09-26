<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import OutputImageOptions from "@/components/OutputImageOptionsComponent.vue";
import useDownload from "@/hooks/useDownload";
import useThrottle from "@/hooks/useThrottle";
import type BalmUIFile from "@/types/file";
import { ref, watchEffect, type Ref } from "vue";
import Base64Image from ".";

const value: Ref<string> = ref('data:image/png;base64,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');
const output: Ref<string> = ref(value.value);
const showOutputOptions: Ref<boolean> = ref(false);

watchEffect(() => {
    showOutputOptions.value = Boolean(value.value || output.value);
});

function handleUpdate(newVal: string) {
    value.value = newVal;
    output.value = newVal;
}

function clearInput() {
    value.value = "";
}

async function handleFile(files: BalmUIFile[]) {
    const file: File = files[0].sourceFile;
    output.value = await Base64Image(file);
    value.value = output.value;
}

function handleSave() {
    useDownload(value.value);
}

</script>

<template>
    <div class="container">
        <div class="inputSection">
            <InputOptions label="Base64 Image Encoded:" @reset="clearInput" @paste="handleUpdate" :copyContent="value" />
            <Input input-type="textarea" placeholder="Enter base64 of an image..." class="no-resize inputText" label="Input"
                :value="value" @update:value="useThrottle($event, handleUpdate)"></Input>
        </div>
        <div class="outputSection">
            <OutputImageOptions label="Base64 Image Decoded:" :optionsVisible="showOutputOptions" @save="handleSave"
                @load="handleFile">
            </OutputImageOptions>
            <ui-file accept="image/*" title="Click to upload image file" class="uploadInput" @change="handleFile">
                <ui-button icon="file_upload" class="uploadInputBtn" v-if="!output">Upload</ui-button>
                <img :src="output" alt="Base64 Image Decoded Output" v-if="output" class="uploadInputImg" />
            </ui-file>
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

.inputSection .inputText {
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

    .uploadInput {
        min-height: 300px;
    }

    .uploadInput .uploadInputBtn {
        height: 300px !important;
    }
}
</style>