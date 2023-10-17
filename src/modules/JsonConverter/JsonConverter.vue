<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, type Ref , watch} from "vue";
import {jsonToYaml, yamlToJson, jsonToCsv, csvToJson} from ".";

type objectOrString = Object | string; 

const inputType = ref('Select Input Type');
const inputText: Ref<string> = ref('');
const outputType = ref('Select Output Type');
const outputText: Ref<objectOrString> = ref('');

function clear() {
    inputText.value = " ";
}

function handlePasteText(newVal: string) {
    inputText.value = newVal
}

function handleInputChange(newVal: string){
    inputText.value = newVal;
}


watch([inputType, outputType], ([newInputType, newOutputType]) => {
  if (newInputType === 'json' && newOutputType === 'yaml') {
    // Call jsonToYaml and update the outputText
    outputText.value = jsonToYaml(inputText.value);
  } else if (newInputType === 'yaml' && newOutputType === 'json') {
    // Call yamlToJson and update the outputText
    outputText.value = yamlToJson(inputText.value);
  } else if (newInputType === 'json' && newOutputType === 'csv') {
    // Call jsonTocsv and update the outputText
    outputText.value = jsonToCsv(inputText.value);
  }  else if (newInputType === 'csv' && newOutputType === 'json') {
    // Call jsonTocsv and update the outputText
    outputText.value = csvToJson(inputText.value);
  } else if (newInputType === 'yaml' && newOutputType === 'csv') {
    outputText.value = 'Cannot convert Yaml to CSV'
  }  else if (newInputType === 'csv' && newOutputType === 'yaml') {
    outputText.value = 'Cannot convert CSV to Yaml'
  }   else if (newInputType === 'json' && newOutputType === 'json') {
    outputText.value = 'Input object is already in JSON'
  }
});

</script>


<template>
    <div class="container">
    <div class="expression">
      <label for="inputType">Input Type:</label>
      <select id="inputType" v-model="inputType">
        <option value="json">JSON</option>
        <option value="yaml">YAML</option>
        <option value="csv">CSV</option>
      </select>
      <InputOptions label="Input Text:" @paste="handlePasteText" @reset="clear" :hideReset="false" :hideCopy="true" />
            <Input input-type="textarea" placeholder="Enter Content..." :value="inputText" class="inputElem" @update:value="useThrottle($event, handleInputChange)"/>
    </div>

        
        
      <div class="output">
      <label for="outputType">Output Type:</label>
      <select id="outputType" v-model="outputType">
        <option value="json">JSON</option>
        <option value="yaml">YAML</option>
        <option value="csv">CSV</option>
      </select>
      <InputOptions label="Output Text:" :hideClipboard="true" :hideReset="true" :copyContent="outputText" />
            <Input input-type="textarea" disabled placeholder="Results will appear here" class="no-resize inputText grow" :value="outputText"></Input>
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
    color: var(--color-text);
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