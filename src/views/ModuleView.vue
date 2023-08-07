<script setup lang="ts">
import { ref, type Ref, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import { useRoutes, type Route } from '@/stores/routes';
import Header from "@/components/HeaderComponent.vue";
import LoadModule from "@/components/LoadModuleComponent.vue";

const route = useRoute();
const routes = useRoutes();
const slug: Ref<string> = ref(route.params.slug.toString());
let routeDetails: Ref<Route | undefined> = ref(undefined);

if (typeof slug.value === 'string')
    routeDetails.value = routes.getRoute(slug.value);

onUpdated(() => {
    slug.value = route.params.slug.toString();

    if (typeof slug.value === 'string')
        routeDetails.value = routes.getRoute(slug.value);

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