<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import OutputOptions from "@/components/OutputOptionsComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import { onMounted, ref, type Ref } from "vue";
import urlActions from ".";

interface URLElement {
    field: string,
    value: string | undefined
}

const input: Ref<string> = ref('https://example.com/test?q=%22hello%20world%22&qs=1');

const data: Ref<URLElement[]> = ref([]);
const queryString: Ref<string> = ref('');
const invalidURL: Ref<boolean> = ref(false);

const head = ['Field', 'Value'];
const body = ['field', 'value'];

onMounted(process)

function process() {
    if (input.value) {
        try {
            const temp = urlActions.parseURL(input.value);
            const final: URLElement[] = [];

            Object.keys(temp).forEach((e: string) => {
                final.push({
                    field: e,
                    value: temp[e]
                });
            });

            data.value = final;
            queryString.value = urlActions.getQueryString(input.value);
            invalidURL.value = false;
        } catch (_) {
            invalidURL.value = true;
        }
    } else {
        data.value = [];
        queryString.value = `{}`;
    }
};

function handleUpdate(newVal: string) {
    input.value = newVal;
    process()
}

function clearInput() {
    input.value = "";
    process()
}
</script>

<template>
    <div class="container">
        <div class="inputSection">
            <InputOptions @reset="clearInput" @paste="handleUpdate" :copyContent="input" />
            <Input input-type="textarea" placeholder="Enter a URL..."
                :class='"no-resize inputText " + (invalidURL && "error")' label="Input" :value="input"
                @update:value="useThrottle($event, handleUpdate)"></Input>
            <ui-textfield-helper v-show="invalidURL" :visible="true" :class="{ errorHelper: invalidURL }">Invalid
                URL</ui-textfield-helper>
        </div>
        <div class="outputSection">
            <ui-table :data="data" class="table" :thead="head" :tbody="body"></ui-table>
            <div class="queryString">
                <OutputOptions label="Query String:" :copyContent="queryString" />
                <highlightjs language='json' :code='queryString' class="output" />
            </div>
        </div>
    </div>
</template>

<style>
.container {
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    padding: 10px;
    width: 100%;
}

.inputSection {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.inputText {
    flex-grow: 1;
    width: 100%;
}

.table {
    width: 100%;
}

.outputSection {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 0.5em;
}

.queryString {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
}

@media screen and (max-width: 800px) {
    .container {
        display: block;
    }

    .inputSection {
        margin-right: 0;
        margin-bottom: 10px;
    }
}
</style>