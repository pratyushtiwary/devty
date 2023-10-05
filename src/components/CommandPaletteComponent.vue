<script setup lang="ts">
import useThrottle from "@/hooks/useThrottle";
import { useRoutes } from "@/stores/routes";
import { type ComponentRef } from '@/types/componentRef';
import { type Routes } from '@/types/route';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import Input from "./InputComponent.vue";
const props = defineProps(['show'])
defineEmits(['hide'])

const input = ref<ComponentRef>()
const resultsRef = ref<HTMLDivElement>()
const searchTerm = ref<string>('')
const results = ref<Routes>({})
const routes = useRoutes();
let currFocus = -1

function search(newVal: string) {
    searchTerm.value = newVal

    if (newVal.replace(/ /g, "") !== "") {
        results.value = routes.search(newVal)
    } else {
        results.value = {}
    }
}

function focusNext(e: KeyboardEvent) {
    const key = e.which || e.key || e.code || e.keyCode

    if ((key === 'ArrowDown' || key === 40) && props.show) {
        e.preventDefault()
        if (resultsRef.value) {
            if (currFocus === -1) {
                (resultsRef.value.children[0] as HTMLElement).focus()
                currFocus += 1
            } else {
                if (currFocus + 1 < resultsRef.value.children.length) {
                    (resultsRef.value.children[currFocus + 1] as HTMLElement).focus()
                    currFocus += 1;
                } else {
                    focusSearch()
                }
            }
        }
    }

    if ((key === 'ArrowUp' || key === 38) && props.show) {
        e.preventDefault()
        if (resultsRef.value) {
            if (currFocus === -1) {
                (resultsRef.value.children[resultsRef.value.children.length - 1] as HTMLElement).focus()
                currFocus = resultsRef.value.children.length - 1
            } else {
                if (currFocus - 1 >= 0) {
                    (resultsRef.value.children[currFocus - 1] as HTMLElement).focus()
                    currFocus -= 1;
                } else {
                    focusSearch()
                }
            }
        }
    }

}

function focusSearch() {
    if (props.show && input?.value?.wrapper?.textfield?.querySelector) {
        input.value.wrapper!.textfield!.querySelector('input')!.focus()
        currFocus = -1;
    }
}

onMounted(() => {
    window.addEventListener('keydown', focusNext);
})

onUnmounted(() => {
    window.removeEventListener('keydown', focusNext);
})

onUpdated(() => {
    focusSearch()
})
</script>
<template>
    <div class="command-palette" v-show="$props.show">
        <div class="palette">
            <Input :autoFocus="true" ref="input" :value="searchTerm" @update:value="useThrottle($event, search, 500)"
                placeholder="Search..." @focus="focusSearch" />
            <div class="results" ref="resultsRef">
                <router-link :to="result" @click="$emit('hide')" class="result"
                    v-for="result, index in Object.keys(results)" :key="index">
                    {{ results[result].name }}
                </router-link>
            </div>
        </div>
        <div class="overlay" @click="$emit('hide')" title='Click to hide command palette'></div>
    </div>
</template>

<style>
.command-palette {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    overflow-y: auto;
}

.command-palette .palette {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 100px;
    width: 95vw;
    max-width: 600px;
    z-index: 2;
    background-color: rgba(var(--color-background-rgb), 0.9);
    border-radius: 2.5px;
    backdrop-filter: blur(5px);
}

.command-palette .palette .input {
    position: sticky;
    top: 0;
    width: 100%;
    font-size: 1.25rem;
    background-color: rgba(var(--color-background-rgb), 0.9);
}

.overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
}

.command-palette .results .result {
    display: block;
    padding: 10px;
    color: var(--color-text);
    text-decoration: none;
    font-size: 1.25rem;
    border: 1px solid var(--color-border);
    margin: 5px 0;
    border-radius: 2.5px;
    outline: 1px solid transparent;
}

.command-palette .results .result:focus {
    border-color: var(--color-outline);
    outline-color: var(--color-outline);
}
</style>