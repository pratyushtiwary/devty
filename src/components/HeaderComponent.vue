<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import { RouterLink, useRoute } from "vue-router";
import { useRoutes, type Routes, type Route } from "@/stores/routes";
import useThrottle from "@/hooks/useThrottle";
import { onMounted, onUnmounted, ref, type Ref, watchEffect, onUpdated } from "vue";

const allRoutes: Routes = useRoutes().getRoutes();
const routes: Ref<Routes> = ref(allRoutes);

const route = useRoute();
const currRoute = ref(route.params.slug);
const isMobile = ref(window.outerWidth < 800);
const openDrawer = ref(false);
const searchVal = ref('');

function resize() {
    isMobile.value = window.outerWidth < 800;
}

onMounted(() => {
    window.addEventListener('resize', resize);
});

onUnmounted(() => {
    window.removeEventListener('resize', resize);
});

watchEffect(() => {
    if (searchVal.value) {
        const all = Object.keys(allRoutes);
        const regex = new RegExp(searchVal.value, 'g');
        let validRoutes: Routes = {};

        all.forEach(e => {
            validRoutes[e] = {
                ...allRoutes[e],
                visible: Boolean(allRoutes[e].name.toLowerCase().match(regex))
            }
        })

        routes.value = validRoutes
    } else {
        routes.value = allRoutes;
    }
});

onUpdated(() => {
    currRoute.value = route.params.slug.toString();
});

function handleSearch(searchTerm: string) {
    searchVal.value = searchTerm;
}

function handleRouteChange() {
    openDrawer.value = false;
    setTimeout(() => {
        searchVal.value = '';
    });
}
</script>

<template>
    <ui-top-app-bar v-if="isMobile" content-selector="#app-bar" type="dense" title="Devit" class="appBar">
        <template #nav-icon>
            <ui-icon-button icon="menu" @click="openDrawer = true"></ui-icon-button>
        </template>
    </ui-top-app-bar>
    <ui-drawer :class="{
        'drawer': true,
        'modal': isMobile
    }" v-model="openDrawer" :type="isMobile ? 'modal' : 'permanent'">
        <ui-drawer-header>
            <ui-drawer-title class="colorText title">
                <RouterLink to="/" class="homeLink">
                    <span>Devit</span>
                </RouterLink>
                <ui-icon-button icon="first_page" v-show="isMobile" @click="openDrawer = false"></ui-icon-button>
            </ui-drawer-title>
            <ui-drawer-subtitle class="colorText">Your go to place for dev utilities & tools.</ui-drawer-subtitle>
        </ui-drawer-header>
        <Input placeholder="Search..." class="searchInput" @update:value="useThrottle($event, handleSearch)"
            :value="searchVal" />
        <ui-drawer-content>
            <ui-nav>
                <RouterLink :to="'/' + route" class="link" v-for="(route, index) in Object.keys(routes)" :key="index"
                    v-show="routes[route].visible !== false">
                    <ui-nav-item :active="currRoute === route" class="colorText" @click="handleRouteChange">
                        <ui-icon class="icon" v-if="routes[route].icon">{{ routes[route].icon }}</ui-icon>
                        {{ routes[route].name }}</ui-nav-item>
                </RouterLink>
            </ui-nav>
        </ui-drawer-content>
    </ui-drawer>
</template>

<style scoped>
.drawer {
    position: sticky;
    top: 0;
    height: 100vh;
    background-color: rgba(111, 76, 48, 75%) !important;
    backdrop-filter: blur(25px);
}

.drawer .colorText {
    color: var(--color-text) !important;
}

.drawer .searchInput {
    width: 90%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 10px 0 5px 0;
}

.drawer .icon {
    margin-right: 10px;
}

.drawer .link {
    text-decoration: none;
}

.appBar {
    background-color: var(--vt-c-black-mute);
    color: var(--color-text) !important;
    top: 0;
}

.modal {
    position: fixed;
    width: 100%;
}

.modal .title {
    display: flex;
    margin-top: 20px;
}

.modal .title .homeLink {
    flex-grow: 1;
}

.drawer .homeLink {
    color: var(--color-text);
    text-decoration: none;
}
</style>