<script setup lang="ts">
import OutputImageOptions from "@/components/OutputImageOptionsComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import Input from "@/components/InputComponent.vue";
import Base64Image from ".";
import useThrottle from "@/hooks/useThrottle";
import useDownload from "@/hooks/useDownload";
import { ref, type Ref, watchEffect } from "vue";

interface BlamUIFile extends File {
    sourceFile: File,
}

const value: Ref<string> = ref('');
const output: Ref<string> = ref('');
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

async function handleFile(files: BlamUIFile[]) {
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