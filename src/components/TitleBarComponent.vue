<!-- eslint-disable no-console -->
<script setup lang="ts">

// @ts-ignore
const IS_ELECTRON = window.IS_ELECTRON;

function handleClose() {
    if (IS_ELECTRON) {
        // @ts-ignore
        window.titleBarActions.close();
    }
}

function handleMinimize() {
    if (IS_ELECTRON) {
        // @ts-ignore
        window.titleBarActions.minimize();
    }
}


function handleMaximize() {
    if (IS_ELECTRON) {
        // @ts-ignore
        window.titleBarActions.maximize();
    }
}


</script>

<template>
    <div class="titleBar" v-show="IS_ELECTRON">
        <div class="actions">
            <ui-icon-button title="Minimize" @click="handleMinimize">minimize</ui-icon-button>
            <ui-icon-button title="Maximize" @click="handleMaximize">crop_square</ui-icon-button>
            <ui-icon-button title="Close" @click="handleClose">close</ui-icon-button>
        </div>
    </div>
</template>

<style scoped>
.titleBar {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    position: sticky;
    top: 0;
    -webkit-app-region: drag;
    height: 48px;
    background-color: var(--title-background);
    padding: none;
    margin: 0px;
    z-index: 99999;
}

.titleBar button {
    -webkit-app-region: no-drag;
    top: 0px;
    right: 6px;
}
</style>

