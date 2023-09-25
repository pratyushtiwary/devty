<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import OutputOptions from "@/components/OutputOptionsComponent.vue";
import Select from "@/components/SelectComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import type SelectEvent from "@/types/select";
import { ref, watchEffect } from "vue";
import convert, { SUPPORTED_CONVERTERS, type SUPPORTED_LANGUAGES } from ".";

const input = ref<string>(`curl 'http://fiddle.jshell.net/echo/html/' \\
    -H 'Origin: http://fiddle.jshell.net' \\
    -H 'Accept-Encoding: gzip, deflate' \\
    -H 'Accept-Language: en-US,en;q=0.8' \\
    -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' \\
    -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \\
    -H 'Accept: */*' \\
    -H 'Referer: http://fiddle.jshell.net/_display/' \\
    -H 'X-Requested-With: XMLHttpRequest' \\
    -H 'Connection: keep-alive' \\
    --data 'msg1=wow&msg2=such&msg3=data' --compressed`);
const language = ref<SUPPORTED_LANGUAGES>("javascript");
const output = ref<string>(convert(input.value, language.value));
const error = ref<string | null>(null);

watchEffect(() => {
    try {
        output.value = convert(input.value, language.value);
        error.value = null;
    } catch (e) {
        if (e instanceof Error)
            error.value = e.message.split("\n")[0];
    }
})

function handleUpdate(newVal: string) {
    input.value = newVal;
}

function changeLanguage(e: SelectEvent) {
    if (Object.keys(SUPPORTED_CONVERTERS).includes(e.value))
        language.value = e.value as SUPPORTED_LANGUAGES;
}

function clearInput() {
    input.value = "";
}
</script>

<template>
    <div class="container">
        <div class="input">
            <InputOptions @reset="clearInput" @paste="handleUpdate" :copyContent="input" />
            <Input input-type="textarea" placeholder="Enter cURL command..."
                :class="'no-resize inputText ' + (error !== null && 'error')" label="Input" :value="input"
                @update:value="useThrottle($event, handleUpdate)"></Input>
            <ui-textfield-helper v-show="error !== null" :visible="true" :class="{ errorHelper: error !== null }">{{ error
            }}</ui-textfield-helper>
        </div>
        <div class="output">
            <OutputOptions :copyContent="output">
                <Select :options="Object.keys(SUPPORTED_CONVERTERS).map(lang => ({ label: lang, value: lang }))"
                    :value="language" @selected="changeLanguage">Language</Select>
            </OutputOptions>
            <highlightjs :language='language' :code='output' class="outputText"
                placeholder="Output code will appear here" />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    width: 100%;
    padding: 10px;
}

.container .input,
.container .output {
    display: flex;
    flex-direction: column;
}

.container .input .inputText,
.container .output .outputText {
    flex-grow: 1;
}

.container .output .outputText {
    margin-top: 5px;
    max-height: calc(100vh - 82.5px);
}

@media screen and (max-width: 800px) {
    .container {
        display: block;
    }

    .container .output {
        margin-top: 10px;
    }
}
</style>