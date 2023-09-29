<script setup lang="ts">
import InputOptions from '@/components/InputOptionsComponent.vue'
import Input from '@/components/InputComponent.vue'
import OutputImageOptions from '@/components/OutputImageOptionsComponent.vue'
import Select from '@/components/SelectComponent.vue'
import useDownload from '@/hooks/useDownload'
import useThrottle from '@/hooks/useThrottle'
import type SelectEvent from '@/types/select'
import type BalmUIFile from '@/types/file'
import { ref, type Ref } from 'vue'
import { SUPPORTED_TEMPLATES, SUPPORTED_TEMPLATES_KEYS, generateQRCode, readQRCode } from '.'

const template: Ref<SUPPORTED_TEMPLATES_KEYS> = ref('vcard')
const value: Ref<string> = ref(SUPPORTED_TEMPLATES.vcard.template)

const output: Ref<string> = ref('')
const showOutputOptions: Ref<boolean> = ref(false)
const error: Ref<{ show: boolean; message: string }> = ref({ show: false, message: '' })
async function changeTemplate(e: SelectEvent) {
  if (Object.keys(SUPPORTED_TEMPLATES).includes(e.value)) {
    template.value = e.value as SUPPORTED_TEMPLATES_KEYS
    value.value = SUPPORTED_TEMPLATES[e.value].template
    output.value = await generateQRCode(value.value)
    showOutputOptions.value = true
  }
  if (error.value.show) error.value.show = false
}

async function handleUpdate(newVal: string) {
  showOutputOptions.value = !!newVal
  value.value = newVal
  output.value = await generateQRCode(newVal)
}

function clearInput() {
  value.value = ''
  output.value = ''
  showOutputOptions.value = false
  error.value.show = false
}

async function handleFile(files: BalmUIFile[]) {
  try {
    const file: File = files[0].sourceFile
    output.value = await readQRCode(file)
    value.value = output.value
    error.value.show = false
  } catch (e) {
    value.value = ''
    output.value = ''
    error.value.show = true
    error.value.message = e
  }
}

function handleSave() {
  useDownload(output.value)
}

const templateOptions = Object.entries(SUPPORTED_TEMPLATES).map(([key, value]) => ({
  label: value.label,
  value: key
}))
</script>

<template>
  <div class="container">
    <div class="inputSection">
      <InputOptions label="Content:" @reset="clearInput" @paste="handleUpdate" :copyContent="value">
        <Select :options="templateOptions" :value="template" @selected="changeTemplate"
          >Template</Select
        >
      </InputOptions>
      <Input
        input-type="textarea"
        placeholder="Enter content to generate qr code..."
        :class="'no-resize inputText ' + (error.show && 'error')"
        label="Input"
        :value="value"
        @update:value="useThrottle($event, handleUpdate)"
      ></Input>
      <ui-textfield-helper
        v-show="error.show"
        :visible="true"
        :class="{ errorHelper: error.show }"
        >{{ error.message }}</ui-textfield-helper
      >
    </div>
    <div class="outputSection">
      <OutputImageOptions
        label="QR Code generated:"
        :optionsVisible="showOutputOptions"
        @save="handleSave"
        @load="handleFile"
      >
      </OutputImageOptions>

      <ui-file
        accept="image/*"
        title="Click to upload image file"
        class="uploadInput"
        @change="handleFile"
      >
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
  display: flex;
  flex-direction: column;
}

.inputSection .inputText {
  margin-top: 5px;
  flex-grow: 1;
}
.mdc-file {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
@media screen and (max-width: 800px) {
  .container {
    display: block;
  }
}
</style>
