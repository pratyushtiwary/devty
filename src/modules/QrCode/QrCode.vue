<script setup lang="ts">
import Input from '@/components/InputComponent.vue'
import InputOptions from '@/components/InputOptionsComponent.vue'
import OutputImageOptions from '@/components/OutputImageOptionsComponent.vue'
import Select from '@/components/SelectComponent.vue'
import useDownload from '@/hooks/useDownload'
import useThrottle from '@/hooks/useThrottle'
import type BalmUIFile from '@/types/file'
import type SelectEvent from '@/types/select'
import Base64Image from "../Base64Image"


import { ref, type Ref } from 'vue'
import { generateQRCode, readQRCode, SUPPORTED_TEMPLATES } from '.'

import type { SUPPORTED_TEMPLATES_KEYS } from '.'

const template: Ref<string> = ref('vcard')
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
    output.value = await Base64Image(file)
    value.value = await readQRCode(file)
    error.value.show = false
  } catch (e) {
    value.value = ''
    output.value = ''
    error.value.show = true
    error.value.message = e as string
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
      <InputOptions label="Content:" @reset="clearInput" @paste="handleUpdate" :copyContent="value" />
      <Select :options="templateOptions" :value="template" @selected="changeTemplate" class="select">Template</Select>
      <Input input-type="textarea" placeholder="Enter content to generate qr code..."
        :class="'no-resize inputText ' + (error.show && 'error')" label="Input" :value="value"
        @update:value="useThrottle($event, handleUpdate)"></Input>
      <ui-textfield-helper v-show="error.show" :visible="true" :class="{ errorHelper: error.show }">{{ error.message
      }}</ui-textfield-helper>
    </div>
    <div class="outputSection">
      <OutputImageOptions label="QR Code generated:" :optionsVisible="showOutputOptions" @save="handleSave"
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

.inputSection {
  color: var(--color-text);
  display: flex;
  flex-direction: column;
}

.inputSection .select {
  margin: 5px 0;
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


.outputSection .uploadInput {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .container {
    display: block;
  }
}
</style>
