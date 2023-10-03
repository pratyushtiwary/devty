<script setup lang="ts">
import SearchInput from "@/components/SearchInputComponent.vue";
import useStorage from "@/hooks/useStorage";
import useThrottle from "@/hooks/useThrottle";
import { useRoutes } from "@/stores/routes";
import { type Routes } from "@/types/route";
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const storage = useStorage();
const routesState = useRoutes();
const allRoutes: Routes = routesState.getRoutes();
const routes: Ref<Routes> = ref(allRoutes);
const starredModules = ref(new Set(storage.load("starredModules") || []));
const searchTerm = ref("")
// @ts-ignore
const IS_ELECTRON = window.IS_ELECTRON;

const route = useRoute();
const currRoute = ref(route.params.slug);
const isMobile = ref(window.outerWidth < 800);
const openDrawer = ref(false);

function resize() {
    isMobile.value = window.outerWidth < 800;
}

onMounted(() => {
    window.addEventListener('resize', resize);
});

onUnmounted(() => {
    window.removeEventListener('resize', resize);
});

function resetSearch() {
    routes.value = allRoutes;

}
onBeforeRouteUpdate((e) => {
    searchTerm.value = ""
    currRoute.value = e.params.slug.toString();
    setTimeout(() => {
        routes.value = allRoutes;
    })
});

function handleSearch(term: string) {
    searchTerm.value = term
    routes.value = routesState.search(searchTerm.value)
}

function handleRouteChange() {
    openDrawer.value = false;
}
</script>

<template>
    <ui-top-app-bar v-if="isMobile" content-selector="#app-bar" type="dense" title="Devty" class="appBar">
        <template #nav-icon>
            <ui-icon-button icon="menu" @click="openDrawer = true"></ui-icon-button>
        </template>
    </ui-top-app-bar>
    <ui-drawer :class="{
        'drawer': true,
        'modal': isMobile
    }" v-model="openDrawer" :type="isMobile ? 'modal' : 'permanent'"
        :style="IS_ELECTRON && 'height: calc(100vh - 48px)'">
        <ui-drawer-header>
            <ui-drawer-title class="colorText title">
                <router-link to="/" class="homeLink">
                    <span>Devty</span>
                </router-link>
                <ui-icon-button icon="first_page" v-show="isMobile" @click="openDrawer = false"></ui-icon-button>
            </ui-drawer-title>
            <ui-drawer-subtitle class="colorText">Your go to place for dev utilities & tools.</ui-drawer-subtitle>
        </ui-drawer-header>
        <SearchInput placeholder="Search..." class="searchInput" @update:value="useThrottle($event, handleSearch)"
            @reset="resetSearch" :value="searchTerm" />
        <ui-drawer-content>
            <ui-nav>
                <router-link :to="'/' + route" class="link" v-for="(route, index) in Object.keys(routes)" :key="index">
                    <ui-nav-item :active="currRoute === route" class="colorText navItem" @click="handleRouteChange" href="">
                        <ui-icon class="icon" v-if="routes[route].icon">{{ routes[route].icon }}</ui-icon>
                        <img v-if="routes[route].image" :src="routes[route].image" :alt="routes[route].name + '\'s icon'"
                            class="image" />

                        <p class="content">{{ routes[route].name }}</p>
                        <ui-icon class="icon" v-if="starredModules.has(route)"
                            title="Starred Module, unstar from homepage">favorite</ui-icon>
                    </ui-nav-item>
                </router-link>
                <div v-if="Object.keys(routes).filter(e => routes[e].visible !== false).length === 0" class="noResults">
                    No Result Found!
                </div>
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
    width: 350px;
}

.drawer .colorText {
    color: var(--color-text) !important;
}

.drawer .navItem {
    display: flex;
}

.drawer .navItem .content {
    flex-grow: 1;
}

.drawer .searchInput {
    width: 90%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 10px 0 5px 0;
}

.drawer .icon,
.drawer .image {
    margin-right: 10px;
}

.drawer .image {
    height: 55%;
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
    width: 100% !important;
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

.noResults {
    color: var(--color-text);
    width: 100%;
    text-align: center;
}
</style>
