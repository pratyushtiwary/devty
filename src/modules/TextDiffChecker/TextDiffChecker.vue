<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import InputOptions from "@/components/InputOptionsComponent.vue";
import OutputOptions from "@/components/OutputOptionsComponent.vue";
import Select from "@/components/SelectComponent.vue";
import useThrottle from "@/hooks/useThrottle";
import type SelectEvent from "@/types/select";
import { ref, watchEffect, type Ref } from "vue";
import textDiff, { type diffType } from ".";

const aaaa: Ref<string> = ref(`aaaa\n\nbbbb`);
const bbbb: Ref<string> = ref(`abba\n\n\nbaab`);
const type: Ref<diffType> = ref('lines');
const outputElem = ref<HTMLDivElement>();

watchEffect(() => {
    if (!(outputElem.value instanceof HTMLDivElement)) return;
    outputElem.value.innerHTML = '';
    textDiff(aaaa.value, bbbb.value, type.value).forEach((e) => {
        if (outputElem.value !== undefined) {
            outputElem.value.append(e);
        }
    });
});

function handleAAAAInput(content: string) {
    aaaa.value = content;
}

function clearAAAA() {
    aaaa.value = "";
}

function handleBBBBInput(content: string) {
    bbbb.value = content;
}

function clearBBBB() {
    bbbb.value = "";
}

function changeType(e: SelectEvent) {
    if (e.value === "lines" || e.value === "words" || e.value === "chars")
        type.value = e.value;
}
</script>

<template>
    <div class="main">
        <div class="top">
            <div class="aaaa">
                <InputOptions label="aaaa:" @reset="clearAAAA" @paste="handleAAAAInput" :copyContent="aaaa" />
                <Input input-type="textarea" placeholder="Enter Input..." class="no-resize inputText" :value="aaaa"
                    @update:value="useThrottle($event, handleAAAAInput, 500)"></Input>
            </div>
            <div class="bbbb">
                <InputOptions label="bbbb:" @reset="clearBBBB" @paste="handleBBBBInput" :copyContent="bbbb" />
                <Input input-type="textarea" placeholder="Enter Input..." class="no-resize inputText" :value="bbbb"
                    @update:value="useThrottle($event, handleBBBBInput, 500)"></Input>
            </div>
        </div>
        <div class="bottom">
            <OutputOptions hideCopy>
                <Select :options="[
                    {
                        label: 'Lines',
                        value: 'lines'
                    },
                    {
                        label: 'Words',
                        value: 'words'
                    },
                    {
                        label: 'Chars',
                        value: 'chars'
                    }
                ]" :value="type" @selected="changeType">Diff Mode</Select>
            </OutputOptions>
            <div class="output" ref="outputElem"></div>
        </div>
    </div>
</template>

<style scoped>
.main {
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding: 10px;
    width: 100%;
}

.main .top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    width: 100%;
}

.main .top .aaaa,
.main .top .bbbb {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.main .top .inputText {
    flex-grow: 1;
}

.main .bottom {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
}

.main .bottom .output {
    flex-grow: 1;
    white-space: pre-wrap;
    padding: 5px;
    background-color: #222222;
    margin-top: 5px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 300px;
}

@media screen and (max-width: 800px) {

    .main {
        display: block;
    }

    .main .top {
        display: block;
    }

    .main .bottom {
        height: 500px;

    }

    .main .bottom .output {
        max-height: 300px;
    }
}
</style>