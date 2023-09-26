<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import { useSnackbar } from "@/stores/snackbar";
import type BalmUIFile from "@/types/file";
import { onMounted, ref, watchEffect, type Ref } from "vue";
import sanitize from ".";

const value: Ref<string> = ref("<h1>Heading</h1>")
const snackbar = useSnackbar()
const iframe = ref<HTMLIFrameElement>()
let colors: CSSStyleDeclaration | undefined = undefined;

onMounted(() => {
    if (iframe.value) {
        let root = document.querySelector(':root');
        if (root) {
            colors = getComputedStyle(root);
        }

        let body = sanitize(value.value);
        let head = ''
        if (colors) {
            head = `<style>
            body{
                color: ${colors.getPropertyValue('--color-text')};
                background-color: ${colors.getPropertyValue('--color-background')};
            }
        </style>`
        }

        setTimeout(() => {
            // @ts-ignore
            iframe.value.contentWindow.document.querySelector('head').innerHTML = head
            // @ts-ignore
            iframe.value.contentWindow.document.querySelector('body').innerHTML = body
        })
    }
})

watchEffect(() => {
    let body = sanitize(value.value);
    let head = ''
    if (iframe.value) {
        if (colors) {
            head = `<style>
                body{
                    color: ${colors.getPropertyValue('--color-text')};
                    background-color: ${colors.getPropertyValue('--color-background')};
                }
            </style>`
        }
        // @ts-ignore
        iframe.value.contentWindow.document.querySelector('head').innerHTML = head
        // @ts-ignore
        iframe.value.contentWindow.document.querySelector('body').innerHTML = body
    }
})

function clearInput() {
    value.value = ''
}

function handlePaste(newVal: string) {
    value.value = newVal
}

async function handleInput(newVal: string) {
    value.value = newVal
}

function handleFile(files: BalmUIFile[]) {
    const file = files[0].sourceFile
    const fileReader = new FileReader()
    const type = file.name.split('.').pop()
    const supported = ['html', 'htm']

    if (!type) {
        snackbar.show('File type not supported', 'error')
        return
    }
    if (!supported.includes(type.toLowerCase())) {
        snackbar.show('File type not supported', 'error')
        return
    }

    fileReader.onloadend = () => {
        if (typeof fileReader.result === "string") {
            value.value = fileReader.result
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
                :value="value" @update:value="handleInput"></Input>
            <ui-divider>OR</ui-divider>
            <ui-file accept=".html,.htm" @change="handleFile">
                <ui-button icon="file_upload" class="upload">Upload File</ui-button>
            </ui-file>
        </div>
        <div class="outputSection">
            <iframe class="output" ref="iframe" placeholder="Preview will appear here"></iframe>
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
    border: 1px solid color(--color-text);
    border-radius: 5px;
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

    .outputSection .output {
        height: 400px;
    }
}
</style>