<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import OutputOptions from "@/components/OutputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { useSnackbar } from "@/stores/snackbar";
import type BalmUIFile from "@/types/file";
import { onMounted, ref, type Ref } from "vue";
import convert from ".";

const value: Ref<string> = ref("# Heading")
const output: Ref<string> = ref('')
const snackbar = useSnackbar()

onMounted(async () => {
    await process()
})

async function process() {
    output.value = await convert(value.value)
}

function clearInput() {
    value.value = ''
    output.value = ''
}

async function handlePaste(newVal: string) {
    value.value = newVal
    await process()
}

async function handleInput(newVal: string) {
    value.value = newVal
    await process()
}

function handleFile(files: BalmUIFile[]) {
    const file = files[0].sourceFile
    const fileReader = new FileReader()
    const type = file.name.split('.').pop()

    if (!type) {
        snackbar.show('File type not supported', 'error')
        return
    }
    if (type.toLowerCase() !== "md") {
        snackbar.show('File type not supported', 'error')
        return
    }

    fileReader.onloadend = async () => {
        if (typeof fileReader.result === "string") {
            value.value = fileReader.result
            await process()
        } else {
            snackbar.show('Failed to read file', 'error')
        }
    }

    fileReader.readAsText(file)
}

</script>

<template>
    <div class="container">
        <div class="inputSection">
            <InputOptions label="Input:" @reset="clearInput" @paste="handlePaste" :copyContent="value" />
            <Input input-type="textarea" placeholder="Enter Markdown..." class="no-resize inputText" label="Input"
                :value="value" @update:value="useThrottle($event, handleInput)"></Input>
            <ui-divider>OR</ui-divider>
            <ui-file accept=".md" @change="handleFile">
                <ui-button icon="file_upload" class="upload">Upload File</ui-button>
            </ui-file>
        </div>
        <div class="outputSection">
            <OutputOptions label="Preview:" :copyContent="output" />
            <div class="output" v-html="output" placeholder="Preview will appear here"></div>
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

.upload {
    width: 100%;
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
.outputSection .output {
    flex-grow: 1;
}

.outputSection .output {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 90vh;
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