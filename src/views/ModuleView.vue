<script setup lang="ts">
import Header from "@/components/HeaderComponent.vue";
import LoadModule from "@/components/LoadModuleComponent.vue";
import { useRoutes } from '@/stores/routes';
import { type Route } from '@/types/route';
import { onMounted, onUpdated, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routes = useRoutes();
const slug: Ref<string> = ref(route.params.slug.toString());
let routeDetails: Ref<Route | undefined> = ref(undefined);

if (typeof slug.value === 'string') {
    const temp = routes.getRoute(slug.value);
    routeDetails.value = temp;
    document.title = temp.name + " - Devty";
}

onUpdated(() => {
    slug.value = route.params.slug.toString();

    if (typeof slug.value === 'string') {
        const temp = routes.getRoute(slug.value);
        routeDetails.value = temp;
        document.title = temp.name + " - Devty"
    }

    window.scrollTo(0, 0);

})

onMounted(() => {
    window.scrollTo(0, 0);
})
</script>

<template>
    <div class="error" v-if="!routeDetails">Error</div>
    <div class="main" v-if="routeDetails">
        <Header></Header>
        <LoadModule :dir="routeDetails.dir"></LoadModule>
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