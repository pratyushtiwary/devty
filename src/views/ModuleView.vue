<script setup lang="ts">
import Header from "@/components/HeaderComponent.vue";
import LoadModule from "@/components/LoadModuleComponent.vue";
import { useRoutes } from '@/stores/routes';
import { type Route } from '@/types/route';
import { onMounted, onUpdated, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const routes = useRoutes();
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

onMounted(() => {
    window.scrollTo(0, 0);
})
</script>

<template>
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