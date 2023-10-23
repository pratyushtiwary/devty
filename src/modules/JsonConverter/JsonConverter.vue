<script setup lang="ts">

import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { ref, type Ref , watch} from "vue";
import {jsonToYaml, yamlToJson, jsonToCsv, csvToJson} from ".";

type objectOrString = Object | string; 

const inputType = ref('');
const inputText: Ref<string> = ref('');
const outputType = ref('');
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

const options = [
  {
    label: 'JSON',
    value: 'json'
  },
  {
    label: 'YAML',
    value: 'yaml'
  },
  {
    label: 'CSV',
    value: 'csv'
  },
]


function handleConversion(newVal: string){
  inputText.value = newVal;

  if (inputType.value == 'json' && outputType.value == 'yaml') {
    
    outputText.value = jsonToYaml(inputText.value);

  } else if (inputType.value === 'yaml' && outputType.value === 'json') {
    
    outputText.value = yamlToJson(inputText.value);

  } else if (inputType.value === 'json' && outputType.value === 'csv') {
   
    outputText.value = jsonToCsv(inputText.value);

  }  else if (inputType.value === 'csv' && outputType.value === 'json') {
    
    outputText.value = csvToJson(inputText.value);

  } else if (inputType.value === 'yaml' && outputType.value === 'csv') {
    
    outputText.value = 'Cannot convert Yaml to CSV'

  }  else if (inputType.value === 'csv' && outputType.value === 'yaml') {
    
    outputText.value = 'Cannot convert CSV to Yaml'

  }   else if (inputType.value === 'json' && outputType.value === 'json') {
    
    outputText.value = 'Input object is already in JSON'

  }   else if (inputType.value === 'csv' && outputType.value === 'csv') {
    
    outputText.value = 'Input object is already in CSV'

  }   else if (inputType.value === 'yaml' && outputType.value === 'yaml') {
    
    outputText.value = 'Input object is already in Yaml'
    
  }
}

</script>


<template>
    <div class="container">
    <div class="expression">
      <section>
        <ui-select
          id="inputType"
          v-model="inputType"
          :options="options"
        >
          Input Type
        </ui-select>
      </section>

      <InputOptions label="Input Text:" @paste="handlePasteText" @reset="clear" :hideReset="false" :hideCopy="true" />
            <Input input-type="textarea" placeholder="Enter Content..." :value="inputText" class="inputElem" @update:value="useThrottle($event, handleConversion)"/>
    </div>

        
        
      <div class="output">
      <section>
        <ui-select
          id="outputType"
          v-model="outputType"
          :options="options"
        >
          Output Type
        </ui-select>
      </section>
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