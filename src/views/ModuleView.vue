<script setup lang="ts">
import CommandPalette from "@/components/CommandPaletteComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import LoadModule from "@/components/LoadModuleComponent.vue";
import { useRoutes } from '@/stores/routes';
import { type Route } from '@/types/route';
import { onMounted, onUnmounted, onUpdated, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const routes = useRoutes();
const showCommandPalette = ref<boolean>(false);
const slug: Ref<string> = ref(route.params.slug.toString());
let routeDetails: Ref<Route | undefined> = ref(undefined);

if (typeof slug.value === 'string') {
    const temp = routes.getRoute(slug.value);
    routeDetails.value = temp;
    if (temp) {
        document.title = temp.name + " - Devty";
    }

    if (!routeDetails.value) {
        router.push({ name: 'home' });
    }
}

onUpdated(() => {
    slug.value = route.params.slug.toString();

    if (typeof slug.value === 'string') {
        const temp = routes.getRoute(slug.value);
        routeDetails.value = temp;
        if (temp?.name) {
            document.title = temp.name + " - Devty"
        }
    }

    if (!routeDetails.value) {
        router.push({ name: 'home' });
    }

    window.scrollTo(0, 0);

})

function handleKeyPress(e: KeyboardEvent) {
    const key = e.key || e.code || e.which || e.keyCode;
    if ((key === 'p' || key === 'P' || key === 'KeyP' || key == 80) && e.ctrlKey) {
        e.preventDefault()
        showCommandPalette.value = true;
    }

    if (key === 'Escape' || key === 27) {
        showCommandPalette.value = false;
    }
}

onMounted(() => {
    window.scrollTo(0, 0);
    window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
    <div class="main" v-if="routeDetails">
        <Header></Header>
        <LoadModule :dir="routeDetails.dir"></LoadModule>
        <CommandPalette :show="showCommandPalette" @hide="showCommandPalette = false" />
    </div>
</template>

<style scoped>
.main {
    display: flex;
}

@media screen and (max-width: 800px) {
    .main {
        margin-top: 50px;
    }
}
</style>